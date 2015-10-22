(function () {
    var indexesRe = /(.+?)(>|\+|\^|$)/g;
    var escapeRe = /("|')([^\1]*?)\1/g;
    var innerTextRe = /\{([^}]*?)}/g;
    var excludes = "([^\\.#\\(\\{]+)";
    var attrsRe = /\(([^\)]*)\)/g;
    var tagRe = new RegExp("^" + excludes);
    var idRe = new RegExp("#" + excludes, "g");
    var classesRe = new RegExp("\\." + excludes, "g");

    var escaped = [];
    var innerTexts = [];

    function unescape(text) {
        return text.replace(/""/g, function () {
            return "\"" + escaped.shift() + "\"";
        });
    }

    function element(textParam) {
        var text = textParam || "";

        var tag = text.match(tagRe);
        var id = text.match(idRe);
        var classes = text.match(classesRe);
        var attrs = text.match(attrsRe);
        var innerText = text.match(innerTextRe);

        var el = document.createElement(tag ? tag[0] : "div");

        if (id) el.id = id.pop().replace(idRe, "$1");
        if (classes) {
            el.className = classes.map(function (className) {
                return className.slice(1);
            }).join(" ");
        }
        if (innerText) {
            el.innerHTML += innerText.map(function () {
                return unescape(innerTexts.shift());
            }).join(" ");
        }

        if (attrs) {
            attrs.map(function (chunkParam) {
                var chunk = chunkParam.replace(attrsRe, "$1").split(",");
                chunk.map(function (attrParam) {
                    var attr = attrParam.split("=");
                    var key = attr.shift();
                    var value = JSON.parse(unescape(attr.join("=")));

                    el.setAttribute(key, value);
                });
            });
        }

        return el;
    }

    function emmet(text, htmlOnly, args) {
        var tree = element();
        var current = tree;
        var lastElement = tree;
        var usedText = text || "";
        var returnValue;

        if (text === void 0) throw new Error("There should be a string to parse.");

        escaped = [];
        innerTexts = [];

        if (args) usedText = emmet.templatedString(text, args);

        usedText
            .replace(escapeRe, function (full, quotes, escape) {
                escaped.push(escape);
                return "\"\"";
            })
            .replace(innerTextRe, function (full, innerText) {
                innerTexts.push(innerText);
                return "{}";
            })
            .replace(/\s+/g, "")
            .replace(indexesRe, function (full, elementText, splitter) {
                current.appendChild(lastElement = element(elementText));
                if (splitter === ">") current = lastElement;
                else if (splitter === "^") current = current.parentNode;
            });

        returnValue = tree.children.length > 1 ? tree.children : tree.children[0];
        return htmlOnly ? tree.innerHTML : returnValue;
    }

    emmet.templatedString = function (text, args) {
        return args.reduce(function (str, el, i) {
            return str.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                return el;
            });
        }, text);
    };

    emmet.template = function (text, htmlOnly, args) {
        if (text === void 0) throw new Error("There should be a template string to parse.");
        return function () {
            return emmet(text, htmlOnly, [].concat.apply(args || [], arguments));
        };
    };

    window.Emmet = emmet;

    if (window.jQuery) {
        window.jQuery.emmet = function (text, htmlOnly, args) {
            var el = emmet(text, htmlOnly, args);
            return htmlOnly ? el : window.jQuery(el);
        };
        window.jQuery.emmet.template = function (text, htmlOnly, args) {
            var template = emmet.template(text, htmlOnly, args);
            return function () {
                var el = template.apply(null, arguments);
                return htmlOnly ? el : window.jQuery(el);
            };
        };
    }
})();

(function () {
    var indexesRe = /(.+?)(\*\d+)?(>|\+|\^|$)/g;
    var escapeRe = /("|')([^\1]*?)\1/g;
    var groupingRe = /\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g;
    var innerTextRe = /\{([^}]*?)}/g;
    var attrsRe = /\(([^\)]*)\)/g;
    var excludes = "([^\\.#\\(\\{\\*]+)";
    var tagRe = new RegExp("^" + excludes);
    var idRe = new RegExp("#" + excludes, "g");
    var classesRe = new RegExp("\\." + excludes, "g");
    var variable = /,{\w+}/g;

    var escaped = [];
    var innerTexts = [];
    var current = null;
    function unescape(text) {
        return text.replace(/""/g, function () {
            return "\"" + escaped.shift() + "\"";
        });
    }

    function element(textParam, parent) {
        var text = textParam || "";

        var tag = text.match(tagRe);
        var id = text.match(idRe);
        var classes = text.match(classesRe);
        var attrs = text.match(attrsRe);
        var innerText = text.match(innerTextRe);
        var defElm = {
            UL:'li', OL:'li', TABLE:'tr',
            TBODY:'tr', THEAD:'tr', TFOOT:'tr',
            TR:'td',
            SELECT:'option', OPTGROUP:'option'
        };
        var el = document.createElement(tag ? tag[0] : defElm[parent && parent.tagName] || "div");

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
    function emmet(text, htmlOnly, args){
        current = null;
        var fragment = emmetParser(text, args);
        // var returnValue = fragment.children.length > 1 ? fragment : fragment.children[0];
        return htmlOnly ? fragment.innerHTML : fragment;
    }
    function emmetParser(text, args) {
        var tree =  document.createDocumentFragment();
        var lastElement = null;
        var current = tree;
        var usedText = text || "";
        var groups = [];
        if (text === void 0) throw new Error("There should be a string to parse.");

        if (args) usedText = emmet.templatedString(text, args);

        usedText
            .replace(groupingRe, function (full, group) {
                groups.push(group);
                return '()'
            })
            .replace(escapeRe, function (full, quotes, escape) {
                escaped.push(escape);
                return '""';
            })
            .replace(innerTextRe, function (full, innerText) {
                innerTexts.push(innerText);
                return "{}";
            })
            .replace(variable,function (full, innerText) {
                innerText.push(innerText);
                return ''
            })
            .replace(/\s+/g, "")
            .replace(indexesRe, function (full, elText, multi, splitter ) {
                lastElement =
                    (elText =='()')? emmetParser(groups.shift()): element(elText,current);

                multi = multi? multi.slice(1)*1 : 1;
                while(multi--)
                    current.appendChild(lastElement = lastElement.cloneNode(true));

                if (splitter === ">") current = lastElement;
                else if (splitter === "^") current = current.parentNode;
            });

        return tree;
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

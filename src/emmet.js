(function () {
    const NO_DICTIONARY = false, WITH_DICTIONARY = true;

    var indexesRe = /(.*?)(\*\d+)?(>|\+|\^|$)/g;
    var escapeRe = /("|')([^\1]*?)\1/g;
    var groupingRe = /\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g;
    var innerTextRe = /\{([^}]*?)}/g;
    var attrsRe = /\[([^\]]*)\]/g;
    var excludes = "([^\\.#\\[\\{\\*]+)";
    var tagRe = new RegExp("^" + excludes);
    var idRe = new RegExp("#" + excludes, "g");
    var classesRe = new RegExp("\\." + excludes, "g");
    var valuesRe = /,(?:([^,]*):)?([^,]*)/g;
    var variablesRx =/@(?:(\d+)|(\w+)|(#))(?::([\w-]+))?/g;
    /*state*/
    var dictionaryActive = NO_DICTIONARY;

    var groups = [];
    var values = [];
    var namedValues = {};
    var innerTexts = [];
    var escaped = [];

    var defElm = {
        UL:'li', OL:'li', TABLE:'tr',
        TBODY:'tr', THEAD:'tr', TFOOT:'tr',
        TR:'td',
        SELECT:'option', OPTGROUP:'option'
    };
    function unescape(text) {
        return text.replace(/""/g, function () {
            return "\"" + escaped.shift() + "\"";
        });
    }

    function emmet(text, htmlOnly, args, options){
        var relVariablRe = /@@(?::([\w-]+))?/g;

        if (args) text = emmet.templatedString(text, args);
        text = text.replace(valuesRe,function (full, key , value) {
                if(key)
                    return namedValues[key] = value,'';
                return values.push(value), '';
            })
            .replace(variablesRx,function (full, index, named, total,defaultValue ) {
                if(index) return values[index] || defaultValue;
                if(named) return namedValues[named] || defaultValue;
                if(total) return values.length || defaultValue;
                return full;
            })

        dictionaryActive = WITH_DICTIONARY;
        var fragment = emmetParser(text);
        if(text.match(relVariablRe)|| htmlOnly){
            var helperDiv = document.createElement('div');
            helperDiv.appendChild(fragment)
            var innerHTML = helperDiv.innerHTML
                    .replace(relVariablRe, (full,defaultValue)=>values.shift() || defaultValue)


            if(htmlOnly) return innerHTML

            helperDiv.innerHTML = innerHTML;
            var len = helperDiv.children.length;
            while(len--){
                fragment.appendChild( helperDiv.firstChild );
            }
        }

        /*clean after*/
        escaped = [];
        innerTexts = [];
        groups = [];
        values = [];
        namedValues = {};
        return fragment;


    }
    var colletions = []


    function emmetParser(text, parent ,withDictionary) {
        var root =  document.createDocumentFragment();
        var lastElement = null;
        var current = root;
        var lastParents = [root];
        var usedText = text || "";
        var operations = [], op ;

        stack();

        if(parent){
            /*todo: handle parent default*/
        }

        if (text === void 0) throw new Error("There should be a string to parse.");



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
            .replace(/\s+/g, "")
            .replace(indexesRe, function (full, elText, multi, splitter ) {
                if( elText ){
                    var number = multi ? multi.slice(1) : 1;
                    lastElement = multiplication(elText,current, number);

                    /*todo after that prependTo can be appendTo think about ^ operator*/
                    operations.unshift({
                        parents: current,
                        childes: lastElement,
                        sibling: root == current
                    });
                }

                if (splitter === ">") {
                    lastParents.push( current ) ;
                    current = lastElement;
                }else if (splitter === "^")
                    current = lastParents.pop() || root;
            });

        var pOp = operations.shift();
        while ( op = operations.shift(), pOp ){
            if( op && (pOp.parents == op.parents))
                op.childes.appendChild(pOp.childes)
            else
                prependTo(pOp.parents, pOp.childes, pOp.sibling);
            pOp = op ;
        }

        unstack();
        return root;
    }
    function stack() {
        colletions.push({ escaped, innerTexts });
        escaped     = []
        innerTexts  = []
    }

    function unstack(){
        var colletion = colletions.pop();
        escaped = colletion.escaped
        innerTexts = colletion.innerTexts
    }

    function element(textParam, parent) {

        if(textParam == '()')
        /*todo: do somthing with the `args` param*/
            return  emmetParser(groups.shift(), parent)

        var text = textParam || "";
        var tag = text.match(tagRe);
        var id = text.match(idRe);
        var classes = text.match(classesRe);
        var attrs = text.match(attrsRe);
        var innerText = text.match(innerTextRe);

        var dictionary = window.Emmet.dictionary, entry;
        var el = (()=>{
                if(dictionaryActive == WITH_DICTIONARY && tag && (entry = dictionary[ tag[0] ])){
            dictionaryActive = NO_DICTIONARY;
            var fragment  = emmetParser(entry, parent);
            dictionaryActive = WITH_DICTIONARY
            return fragment.firstChild;
        }
        return document.createElement(
            tag ? tag[0] : defElm[parent && parent.tagName] || "div" )
    })()

        if (id) el.id = id.pop().replace(idRe, "$1");
        if (classes) {
            el.classList.add.apply(el,classes.map( className => className.slice(1)).join(" "));
        }
        if (innerText) {
            /*todo: try add text to a right place without run over exist content*/
            el.innerHTML +=
                innerText.map( ()=> unescape( innerTexts.shift() ) ).join(" ");
        }
        if (attrs) {
            attrs.map(function (chunkParam) {
                var chunk = chunkParam.replace(attrsRe, "$1").split(",");
                chunk.map(function (attrParam) {
                    var attr = attrParam.split("=");
                    var key = attr.shift();
                    var value = unescape(attr.join("="));

                    el.setAttribute(key, value);
                });
            });
        }
        /*warp with fragment*/
        return el;
    }

    function prependTo(parents,children, sibling){
        /*todo: can be handled defult child for multiple parent*/
        // console.log(parents, children);
        if(sibling || parents.childNodes.length == 0) {
            parents.insertBefore(children, parents.firstChild );
        }else{
            var pNodes = parents.childNodes;
            var len = pNodes.length;
            /*add the clones elements in the end*/
            if(len > 1)  while(--len){
                insert(pNodes[len], children.cloneNode(true))
            }
            /*add the original elements in the start*/
            insert(pNodes[0],children)
        }

        function insert(p, child){
            p.insertBefore( child,p.firstChild);
            if(p.lastChild.nodeType == 3)
                p.insertBefore(p.lastChild,p.firstChild)
        }

    }

    function multiplication( text, parents, number){
        var ret = document.createDocumentFragment();
        var elements =  element(text, parents);
        if(number > 1)
            while(--number)
                ret.appendChild( elements.cloneNode(true) );
        /*add the original elements in the end*/
        ret.insertBefore(elements,ret.firstChild);

        return ret;
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
    window.Emmet.dictionary = {};

    if (window.jQuery) {
        window.jQuery.emmet = function (text, htmlOnly, args) {
            var el = emmet(text, htmlOnly, args);
            return htmlOnly ? el : window.jQuery(el.children);
        };
        window.jQuery.emmet.template = function (text, htmlOnly, args) {
            var template = emmet.template(text, htmlOnly, args);
            return function () {
                var el = template.apply(null, arguments);
                return htmlOnly ? el : window.jQuery(el.children);
            };
        };
    }
})();

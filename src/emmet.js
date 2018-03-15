(function () {
	const indexesRe = /(.+?)(>|\+|\^+|$)/g;
	const escapeRe = /("|')([^\1]*?)\1/g;
	const innerTextRe = /\{([^}]*?)}/g;
	const excludes = '([^\\.#\\(\\{]+)';
	const attrsRe = /\(([^)]*)\)/g;
	const tagRe = new RegExp(`^${excludes}`);
	const idRe = new RegExp(`#${excludes}`, 'g');
	const classesRe = new RegExp(`\\.${excludes}`, 'g');

	let escaped = [];
	let innerTexts = [];

	function unescape(text) {
		return text.replace(/""/g, function () {
			return `"${escaped.shift()}"`;
		});
	}

	function element(textParam) {
		const text = textParam || '';

		const tag = text.match(tagRe);
		const id = text.match(idRe);
		const classes = text.match(classesRe);
		const attrs = text.match(attrsRe);
		const innerText = text.match(innerTextRe);

		const el = document.createElement(tag ? tag[0] : 'div');

		if (id) {
			el.id = id.pop().replace(idRe, '$1');
		}

		if (classes) {
			el.className = classes.map(function (className) {
				return className.slice(1);
			}).join(' ');
		}

		if (innerText) {
			el.innerHTML += innerText.map(function () {
				return unescape(innerTexts.shift());
			}).join(' ');
		}

		if (attrs) {
			attrs.map(function (chunkParam) {
				const chunk = chunkParam.replace(attrsRe, '$1').split(',');
				chunk.map(function (attrParam) {
					const attr = attrParam.split('=');
					const key = attr.shift();
					const value = JSON.parse(unescape(attr.join('=')));

					el.setAttribute(key, value);
				});
			});
		}

		return el;
	}

	function emmet(text, htmlOnly, args) {
		const tree = element();
		let current = tree;
		let lastElement = tree;
		let usedText = text || '';

		if (!text) {
			throw new Error('There should be a string to parse.');
		}

		escaped = [];
		innerTexts = [];

		if (args) {
			usedText = emmet.templatedString(text, args);
		}

		usedText.replace(escapeRe, function (full, quotes, escape) {
			escaped.push(escape);
			return '""';
		}).replace(innerTextRe, function (full, innerText) {
			innerTexts.push(innerText);
			return '{}';
		}).replace(/\s+/g, '')
			.replace(indexesRe, function (full, elementText, splitter) {
				current.appendChild(lastElement = element(elementText));

				if (splitter === '>') {
					current = lastElement;
				} else {
					let spl = splitter;

					while (/\^+/.test(spl)) {
						spl = spl.slice(1);

						if (current.parentNode) {
							current = current.parentNode;
						} else {
							throw new Error('Attempted to climb to a non-existent parent (too many \'^\' operators used)');
						}
					}
				}
			});

		const returnValue = tree.children.length > 1 ? tree.children : tree.children[0];
		return htmlOnly ? tree.innerHTML : returnValue;
	}

	emmet.templatedString = function (text, args) {
		return args.reduce(function (str, el, i) {
			return str.replace(new RegExp(`\\{${i}\\}`, 'g'), function () {
				return el;
			});
		}, text);
	};

	emmet.template = function (text, htmlOnly, args) {
		if (!text) {
			throw new Error('There should be a template string to parse.');
		}

		return function () {
			return emmet(text, htmlOnly, [].concat.apply(args || [], arguments));
		};
	};

	window.Emmet = emmet;

	if (window.jQuery) {
		window.jQuery.emmet = function (text, htmlOnly, args) {
			const el = emmet(text, htmlOnly, args);
			return htmlOnly ? el : window.jQuery(el);
		};
		window.jQuery.emmet.template = function (text, htmlOnly, args) {
			const template = emmet.template(text, htmlOnly, args);
			return function () {
				const el = template.apply(null, arguments);
				return htmlOnly ? el : window.jQuery(el);
			};
		};
	}
})();

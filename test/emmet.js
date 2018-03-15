/* global describe require window process it*/

const jsdom = require('mocha-jsdom');
const expect = require('chai').expect;
let emmet = null;

describe('Emmet', function() {
	jsdom({skipWindowCheck: true});

	if (typeof window === 'undefined') {
		window = {};
	}

	require(`../${process.env.FILENAME}`);
	emmet = window.Emmet;

	describe('direct call', function() {
		it('should throw error with no params', function() {
			expect(emmet).to.throw(Error);
		});

		it('should throw error with malformed syntax', function() {
			const fn = emmet.bind(emmet, 'asd > > 123');
			expect(fn).to.throw(Error);
		});

		it('should return undefined with empty string', function() {
			const element = emmet('');
			expect(element).to.be.undefined;
		});

		it('should return custom tag', function() {
			const element = emmet('custom');
			expect(element.tagName).to.equal('CUSTOM');
		});

		it('should return single class', function() {
			const element = emmet('.custom');
			expect(element.tagName).to.equal('DIV');
			expect(element.className).to.equal('custom');
		});

		it('should return multiple classes', function() {
			const element = emmet('.custom.custom2');
			expect(element.tagName).to.equal('DIV');
			expect(element.className).to.equal('custom custom2');
		});

		it('should return id', function() {
			const element = emmet('#custom');
			expect(element.tagName).to.equal('DIV');
			expect(element.id).to.equal('custom');
		});

		it('should return the last of multiple id\'s', function() {
			const element = emmet('#custom#custom2');
			expect(element.tagName).to.equal('DIV');
			expect(element.id).to.equal('custom2');
		});

		it('should return custom tag with classes', function() {
			const element = emmet('custom.custom.custom2');
			expect(element.tagName).to.equal('CUSTOM');
			expect(element.className).to.equal('custom custom2');
		});

		it('should return custom tag with id', function() {
			const element = emmet('custom#custom');
			expect(element.tagName).to.equal('CUSTOM');
			expect(element.id).to.equal('custom');
		});

		it('should return custom tag with id and classes', function() {
			const element = emmet('custom#custom.custom.custom2');
			expect(element.tagName).to.equal('CUSTOM');
			expect(element.id).to.equal('custom');
			expect(element.className).to.equal('custom custom2');
		});

		it('should return inner text', function() {
			const element1 = emmet('custom{custom}');
			const element2 = emmet('.custom{custom}');
			const element3 = emmet('#custom{custom}');

			expect(element1.innerHTML).to.equal('custom');
			expect(element2.innerHTML).to.equal('custom');
			expect(element3.innerHTML).to.equal('custom');
		});

		it('should return attributes', function() {
			const element1 = emmet('custom(custom1=1,custom2=\'2\')');
			const element2 = emmet('.custom(custom1=1,custom2=\'2\')');
			const element3 = emmet('#custom(custom1=1,custom2=\'2\')');

			expect(element1.getAttribute('custom1')).to.equal('1');
			expect(element1.getAttribute('custom2')).to.equal('2');

			expect(element2.getAttribute('custom1')).to.equal('1');
			expect(element2.getAttribute('custom2')).to.equal('2');

			expect(element3.getAttribute('custom1')).to.equal('1');
			expect(element3.getAttribute('custom2')).to.equal('2');
		});

		it('should return attributes with inner text', function() {
			const element1 = emmet('custom(custom=1){custom}');
			const element2 = emmet('.custom(custom=1){custom}');
			const element3 = emmet('#custom(custom=1){custom}');

			expect(element1.getAttribute('custom')).to.equal('1');
			expect(element1.innerHTML).to.equal('custom');

			expect(element2.getAttribute('custom')).to.equal('1');
			expect(element2.innerHTML).to.equal('custom');

			expect(element3.getAttribute('custom')).to.equal('1');
			expect(element3.innerHTML).to.equal('custom');
		});

		it('should return siblings', function() {
			const sibling1 = emmet('custom + custom2');
			const sibling2 = emmet('.custom + .custom2');
			const sibling3 = emmet('#custom + #custom2');
			const sibling4 = emmet('custom(custom=1) + custom2');
			const sibling5 = emmet('custom{custom} + custom2');

			expect(sibling1).to.have.length(2);
			expect(sibling1[0].tagName).to.equal('CUSTOM');
			expect(sibling1[1].tagName).to.equal('CUSTOM2');

			expect(sibling2).to.have.length(2);
			expect(sibling2[0].className).to.equal('custom');
			expect(sibling2[1].className).to.equal('custom2');

			expect(sibling3).to.have.length(2);
			expect(sibling3[0].id).to.equal('custom');
			expect(sibling3[1].id).to.equal('custom2');

			expect(sibling4).to.have.length(2);
			expect(sibling4[0].tagName).to.equal('CUSTOM');
			expect(sibling4[0].getAttribute('custom')).to.equal('1');
			expect(sibling4[1].tagName).to.equal('CUSTOM2');

			expect(sibling5).to.have.length(2);
			expect(sibling5[0].tagName).to.equal('CUSTOM');
			expect(sibling5[0].innerHTML).to.equal('custom');
			expect(sibling5[1].tagName).to.equal('CUSTOM2');
		});

		it('should return children', function() {
			const sibling1 = emmet('custom > custom2');
			const sibling2 = emmet('.custom > .custom2');
			const sibling3 = emmet('#custom > #custom2');
			const sibling4 = emmet('custom(custom=1) > custom2');
			const sibling5 = emmet('custom{custom} > custom2');
			const sibling6 = emmet('custom > custom2 + custom3');

			expect(sibling1.tagName).to.equal('CUSTOM');
			expect(sibling1.children).to.have.length(1);
			expect(sibling1.children[0].tagName).to.equal('CUSTOM2');

			expect(sibling2.className).to.equal('custom');
			expect(sibling2.children).to.have.length(1);
			expect(sibling2.children[0].className).to.equal('custom2');

			expect(sibling3.id).to.equal('custom');
			expect(sibling3.children).to.have.length(1);
			expect(sibling3.children[0].id).to.equal('custom2');

			expect(sibling4.tagName).to.equal('CUSTOM');
			expect(sibling4.getAttribute('custom')).to.equal('1');
			expect(sibling4.children).to.have.length(1);
			expect(sibling4.children[0].tagName).to.equal('CUSTOM2');

			expect(sibling5.tagName).to.equal('CUSTOM');
			expect(sibling5.innerHTML).to.equal('custom<custom2></custom2>');
			expect(sibling5.children).to.have.length(1);
			expect(sibling5.children[0].tagName).to.equal('CUSTOM2');

			expect(sibling6.tagName).to.equal('CUSTOM');
			expect(sibling6.children).to.have.length(2);
			expect(sibling6.children[0].tagName).to.equal('CUSTOM2');
			expect(sibling6.children[1].tagName).to.equal('CUSTOM3');
		});

		it('should return parent', function() {
			const sibling1 = emmet('custom > custom2 ^ custom3');
			const sibling2 = emmet('custom > .custom2 ^ .custom3');
			const sibling3 = emmet('custom > #custom2 ^ #custom3');
			const sibling4 = emmet('custom > custom2(custom=1) ^ custom3');
			const sibling5 = emmet('custom > custom2{custom} ^ custom3');
			const sibling6 = emmet('custom > custom2 + custom3 ^ custom4 + custom5');

			expect(sibling1).to.have.length(2);
			expect(sibling1[0].tagName).to.equal('CUSTOM');
			expect(sibling1[0].children).to.have.length(1);
			expect(sibling1[0].children[0].tagName).to.equal('CUSTOM2');
			expect(sibling1[1].tagName).to.equal('CUSTOM3');

			expect(sibling2).to.have.length(2);
			expect(sibling2[0].children).to.have.length(1);
			expect(sibling2[0].children[0].className).to.equal('custom2');
			expect(sibling2[1].className).to.equal('custom3');

			expect(sibling3).to.have.length(2);
			expect(sibling3[0].children).to.have.length(1);
			expect(sibling3[0].children[0].id).to.equal('custom2');
			expect(sibling3[1].id).to.equal('custom3');

			expect(sibling4).to.have.length(2);
			expect(sibling4[0].children).to.have.length(1);
			expect(sibling4[0].children[0].getAttribute('custom')).to.equal('1');
			expect(sibling4[1].tagName).to.equal('CUSTOM3');

			expect(sibling5).to.have.length(2);
			expect(sibling5[0].children).to.have.length(1);
			expect(sibling5[0].children[0].innerHTML).to.equal('custom');
			expect(sibling5[1].tagName).to.equal('CUSTOM3');

			expect(sibling6).to.have.length(3);
			expect(sibling6[0].children).to.have.length(2);
			expect(sibling6[0].children[0].tagName).to.equal('CUSTOM2');
			expect(sibling6[0].children[1].tagName).to.equal('CUSTOM3');
			expect(sibling6[1].tagName).to.equal('CUSTOM4');
			expect(sibling6[2].tagName).to.equal('CUSTOM5');
		});

		it('should climb several parents', function() {
			// const sibling1 = emmet('custom > custom2 > custom3');
			const sibling1 = emmet('custom > custom2 > custom3 ^^ custom4');
			// const sibling2 = emmet('custom > .custom2 ^ .custom3');
			// const sibling3 = emmet('custom > #custom2 ^ #custom3');
			// const sibling4 = emmet('custom > custom2(custom=1) ^ custom3');
			// const sibling5 = emmet('custom > custom2{custom} ^ custom3');
			// const sibling6 = emmet('custom > custom2 + custom3 ^ custom4 + custom5');

			expect(sibling1).to.have.length(2);
		});

		it('should escape quotes', function() {
			const element = emmet('custom(data-custom=\'1 + 2 is escaped > custom\'){1 + 2 is escaped > custom}');

			expect(element.tagName).to.equal('CUSTOM');
			expect(element.getAttribute('data-custom')).to.equal('1 + 2 is escaped > custom');
			expect(element.innerHTML).to.equal('1 + 2 is escaped &gt; custom');
		});

		it('should evaluate template strings', function() {
			const element1 = emmet('custom{{0}}', false, ['custom']);
			const element2 = emmet('custom.{0}(data-{1}=\'{2}\'){{3}}', false, ['custom1', 'custom2', 'custom3', 'custom4']);

			expect(element1.innerHTML).to.equal('custom');

			expect(element2.className).to.equal('custom1');
			expect(element2.getAttribute('data-custom2')).to.equal('custom3');
			expect(element2.innerHTML).to.equal('custom4');
		});

		it('should return the correct HTML format with HTML mode', function() {
			const templateString = 'c1#c2.c3.c4(c5=\'c6\'){c7} + c8.c9 > c10 + c11 ^ c12 + c{0}';
			const element = emmet(templateString, false, [13]);
			const html = emmet(templateString, true, [13]);
			const elementString = [].slice.call(element).map(function (el) {
				return el.outerHTML;
			}).join('');

			expect(html).to.equal(elementString);
		});
	});

	describe('template', function() {
		it('should throw error when initiated with no params', function() {
			expect(emmet.template).to.throw(Error);
		});

		it('should throw error when called with malformed syntax', function() {
			const template = emmet.template('asd > > 123');
			expect(template).to.throw(Error);
		});

		it('should return template function when initiated', function() {
			const template = emmet.template('');
			expect(template).to.be.a.function;
		});

		it('should handle template arguments', function() {
			const template = emmet.template('tag.{0}.{1}');
			const element1 = template('custom1', 'custom2');
			const element2 = template('custom3', 'custom4');

			expect(element1.className).to.equal('custom1 custom2');
			expect(element2.className).to.equal('custom3 custom4');
		});

		it('should handle template primary and secondary arguments', function() {
			const template = emmet.template('tag.{0}.{1}', false, ['custom1']);
			const element1 = template('custom2');
			const element2 = template('custom3');

			expect(element1.className).to.equal('custom1 custom2');
			expect(element2.className).to.equal('custom1 custom3');
		});

		it('should handle template with HTML returns with arguments', function() {
			const templateString = 'tag.{0}.{1}';
			const template1 = emmet.template(templateString, false);
			const template2 = emmet.template(templateString, true);
			const element1 = template1('custom1', 'custom2');
			const element2 = template2('custom1', 'custom2');

			expect(element2).to.equal(element1.outerHTML);
		});
	});
});

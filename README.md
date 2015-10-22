# Emmet.js
Emmet syntax for creating DOM elements in vanilla &amp; JQuery.

The module is strictly ESLinted, and covered by 25 test cases, and currently in v1.0.2.

## Fetch
To have *Emmet* in your library, you should either:

- Download it from GitHub
- Use *bower* to install `bower install emmetjs`
- Use *npm* to install `npm install emmetjs`
- ~~Use CDN link `<script type="text/javascript" src="/path/to/emmet.js"></script>`~~ *

Then you need to pull Emmet above the scripts you want to use it in like this:
```
<script type="text/javascript" src="/path/to/emmet.js"></script>
```

*CDN link will come later.*

## Basic use
Use Emmet's **syntax** as<br>
*tag#id.classes(attributes=""){inner text} > .nested ^ .backed.up.one + .sibling*

The 'Emmet' function's **arguments** are<br>
*Emmet(syntax : string, returnOnlyHTML : boolean, templateArguments : array || null);*

```
Emmet(".item");
// Element <div class="item"></div>

Emmet('.item', true);
// String "<div class='item'></div>"

Emmet("tag#id.classes.separated.by.dots.and(attributes="sepearated by",commas=""){Plus inner texts all included} > .nested + .sibling ^ .parent');
//  Element:
//
//  <tag id="id" class="classes separated by dots and" attributes="separated by" commas>
//      Plus inner texts all included
//      <div class="nested"></div>
//      <div class="sibling"></div>
//  </tag>
//  <div class="parent"></div>

```

## Templating
You can use the templates two ways:

1. Use the templateArguments in Emmet()
2. Use Emmet.template()
3. Use both

#### 1. Template arguments:
This can be used everywhere in the syntax, as *{number}* where number represents the index of the arguments array.

**Important note:** Be aware of having only numbers as inner texts, since template engine might replace them with presented arguments.
Use spaces in these cases.
 
```
Emmet("#{0}", false, ["hello"]);
// Element <div id="hello"></div>

Emmet("div{ {0} }", false, ["inner text"]);
// Element <div>inner text</div>

// Inserting 0 in <div>

Emmet("div{0}", false, ["hello"]);
// Element <divhello></divhello>
// Use spaces
Emmet("div{ 0 }", false, ["hello"]);
// Element <div>0</div>

```

#### 2. Emmet Templates
Using Emmet.template is another way to prepare statements.

Function Emmet.template(syntax, returnOnlyHTML, primaryArguments) returns a callable which you can call as<br>
*callable(argument1, argument2, ...)*

**The same principle** applies to Emmet.template as for the *template arguments*. Use with care.

```
var myTemplate = Emmet.template(".item#item-{0} > img(src="/path/to/item-{0}.jpg",alt="{1}") + .details{{1}}");
// Function

myTemplate(123, 'My favourite item');
//  Element:
//
//  <div id="item-123" class="item">
//      <img src="/path/to/item-123.jpg" alt="My favourite item" />
//      <div class="details">
//          My favourite item
//      </div>
//  </div>

var myHTMLTemplate = Emmet.template(".item{{0}}", true);
// Function

myHTMLTemplate('Hello');
// String "<div class='item'>Hello</div>"

```

#### 3. Both Emmet templates and template arguments
You have the chance to use Emmet.template with primary ("hard coded") arguments.

The function is the same as in "2. Emmet Templates", but this time some primary arguments being set.

```
var myTemplateWithPrimary = Emmet.template(".item{{0}}(data-nth={1})", false, ["Hello"]);
// Function

// Calling with one secondary argument, because primary argument "Hello" has been bounded to {0}
myTemplate(1);

//  Element:
//
//  <div id="item" data-nth="1">Hello</div>

var myHTMLTemplate = Emmet.template(".item{{0}}(data-nth={1})", true, ["I'm hard coded."]);
// Function

myHTMLTemplate(2);
// String "<div class='item' data-nth='2'>I'm hard coded</div>"

```

## JQuery
It's nothing different, only two things worth mentioning:

#### 1. Calling Emmet
For JQuery you should call Emmet by `$.emmet(a, b, c)` and `$.emmet.template(a, b, c)`

*You still have the option to call `Emmet(a, b, c)` and `Emmet.template(a, b, c)`*

#### 2. Returns
`$.emmet(a, b, c)` returns a JQuery object if you not set the *returnOnlyHTML* to *true*.

`$.emmet.template(a, b, c)` returns a callable which then returns a JQuery object if you not set the *returnOnlyHTML* to *true*.

*If you call `Emmet(a, b, c)` or `Emmet.template(a, b, c)` you will get the usual Emmet returns, not the JQuery ones.*

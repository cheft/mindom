// test
console.log(h('h1'))
console.log(h('div', {}, 1))
console.log(h('div', {}, h('h1', null, 'hello')))
console.log(h('div', {}, h('h1', null, 'hello'), h('h2', null, 'world')))

var node = h('div', {class: 'demo'}, h('h1', {style: 'color: red;'}, 'hello'), h('h2', {style: 'color: green;'}, 'world'))
var element = render(document.body, null, null, node)

var newNode = h('div', {class: 'test'}, h('h1', {style: 'color: yellow;'}, 'hello'), h('h2', {style: 'color: pink;'}, 'world'))
render(document.body, element, node, newNode)

var newNode2 = h('section', {class: 'test'}, h('h1', {class: 'test', title: 'hhhh', onclick: function a () {alert('hhhh')} }, 'hhhh'))
render(document.body, element, newNode, newNode2)

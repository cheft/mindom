/**
 * a micro vitual dom framewok
 * 通过 hyperscript 把 <div><h1>hello</h1></div> 转化成 h('div', {}, h('h1', null, 'hello'))
 * 再自行转化成 { tagName: 'div', attrs: {}, children: []} 虚拟 dom 树，然后递归进行处理
 * @author: Cheft
 */

/**
 * @param {*} tagName 标签名称或标签函数 
 * @param {*} attrs 标签属性 
 * @param {*} ...children 子标签数组
 */
function h(tagName, attrs = {}, ...children) {
  return typeof tagName === 'function' ? h() :
    {
      tagName: tagName,
      attrs: attrs,
      children: children
    }
}

/**
 * 渲染
 * @param {*} el       渲染容器 - dom 父节点 
 * @param {*} element  渲染对象 - dom 节点
 * @param {*} oldNode  旧的虚拟节点
 * @param {*} node     新的虚拟节点
 */
function render(el, element, oldNode, node) {
  // 如果旧节点没有，直接将虚拟节点换成
  if (!oldNode) {
    element = el.insertBefore(createElement(node), element)
  } else if (node.tagName && node.tagName === oldNode.tagName) {
    mergeAttrs(element, oldNode.attrs, node.attrs)
    for (var i = 0; i < node.children.length; i++) {
      mergeAttrs(element.children[i], oldNode.children[i].attrs, node.children[i].attrs)
    }
  }
  // :TODO
  return element
}

/**
 * 合并新旧节点属性，新的覆盖旧的
 * @param {*} element  dom 节点
 * @param {*} oldAttrs 旧属性
 * @param {*} newAttrs 新属性
 */
function mergeAttrs(element, oldAttrs, newAttrs) {
  var attrs = {}

  if (typeof newAttrs !== 'object' || Array.isArray(newAttrs)) {
    return newAttrs
  }

  for (var attr in oldAttrs) {
    attrs[attr] = oldAttrs[attr]
  }

  for (var attr in newAttrs) {
    attrs[attr] = newAttrs[attr]
  }

  setAttrs(element, attrs)
}

/**
 * 
 * @param {*} element dom 节点
 * @param {*} attrs   节点属性
 */
function setAttrs(element, attrs) {
  for (var attr in attrs) {
    var value = attrs[attr]
    if (value) {
      element.setAttribute(attr, value)
    } else {
      element.removeAttribute(attr)
    }
  }
}

/**
 * 创建 dom 节点
 * @param {*} node 虚拟节点
 */
function createElement(node) {
  var element
  if (typeof node === 'object') {
    element = document.createElement(node.tagName)
    setAttrs(element, node.attrs)
    for (var i = 0; i < node.children.length; i++) {
      element.appendChild(createElement(node.children[i]))
    }
  } else {
    element = document.createTextNode(node)
  }
  return element
}

// test
console.log(h('h1'))
console.log(h('div', {}, 1))
console.log(h('div', {}, h('h1', null, 'hello')))
console.log(h('div', {}, h('h1', null, 'hello'), h('h2', null, 'world')))


var node = h('div', {class: 'demo'}, h('h1', {style: 'color: red;'}, 'hello'), h('h2', {style: 'color: green;'}, 'world'))
var element = render(document.body, null, null, node)

var newNode = h('div', {class: 'test'}, h('h1', {style: 'color: yellow;'}, 'hello'), h('h2', {style: 'color: pink;'}, 'world'))
render(document.body, element, node, newNode)

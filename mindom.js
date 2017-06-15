/**
 * a micro vitual dom framewok
 * 通过 hyperscript 把 <div><h1>hello</h1></div> 转化成 tag('div', {}, tag('h1', null, 'hello'))
 * 再自行转化成 { name: name, props: props || {}, children: [children] } 虚拟 dom 树，然后递归进行处理
 * by Cheft
 */

/**
 * @param {*} name 标签名称或标签函数 
 * @param {*} props 标签属性 
 * @param {*} ...children 子标签数组
 */
function tag(name, props, ...children) {
  return typeof name === 'function' ? tag() :
    {
      name: name,
      props: props || {},
      children: children
    }
}

/**
 * 渲染
 * @param {*} renderEl 渲染容器 - dom 父节点 
 * @param {*} elem     渲染对象 - dom 节点
 * @param {*} node     新的虚拟节点
 * @param {*} oldNode  旧的虚拟节点
 */
function render(renderEl, elem, node, oldNode) {
  // 如果旧节点没有，直接将虚拟节点换成
  if (!oldNode) {
    elem = renderEl.insertBefore(element(node), elem)
  }
  // :TODO
  return elem
}

/**
 * 创建 dom 节点
 * @param {*} node 虚拟节点
 */
function element(node) {
  var elem
  if (typeof node === 'object') {
    elem = document.createElement(node.name)
    for (var p in node.props) {
      var value = node.props[p]
      if (value) {
        elem.setAttribute(p, value)
      } else {
        elem.removeAttribute(p)
      }
    }
    for (var i = 0; i < node.children.length; i++) {
      elem.appendChild(element(node.children[i]))
    }
  } else {
    elem = document.createTextNode(node)
  }
  return elem
}

// test
console.log(tag('h1'))
console.log(tag('div', {}, 1))
console.log(tag('div', {}, tag('h1', null, 'hello')))
console.log(tag('div', {}, tag('h1', null, 'hello'), tag('h2', null, 'world')))

render(document.body, null, tag('div', {class: 'demo', style: 'color: red;'}, tag('h1', null, 'hello'), tag('h2', null, 'world')))

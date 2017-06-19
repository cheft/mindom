/**
 * a micro vitual dom framework
 * 通过 hyperscript 把 <div><h1>hello</h1></div> 转化成 h('div', {}, h('h1', null, 'hello'))
 * 再自行转化成 { tagName: 'div', attrs: {}, children: []} 虚拟 dom 树，然后递归进行处理
 * @author: Cheft
 */

/**
 * @param {*} tagName 标签名称或标签函数 
 * @param {*} attrs 标签属性 
 * @param {*} ...children 子标签数组
 */
function h(tagName, attrs, ...children) {
  return typeof tagName === 'function' ? h() :
    {
      tagName: tagName,
      attrs: attrs || {},
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
  if (!oldNode) { // 如果旧节点没有，直接将虚拟节点换成
    element = el.insertBefore(createElement(node), element)
  } else if (!node) { // 如果新节点没有，删除 dom
    el.removeChild(element)
  } else if (node.tagName && node.tagName === oldNode.tagName) {
    mergeAttrs(element, oldNode.attrs, node.attrs)
    for (var i = 0; i < node.children.length; i++) {
      // :TODO 当子节点为字符串时
      render(element, element.children[i], oldNode.children[i], node.children[i])
    }
  } else if (node.tagName !== oldNode.tagName) { // 如果节点类型不同，替换
    var i = element
    el.replaceChild((element = createElement(node)), i)
  }
  return element
}

/**
 * 合并新旧节点属性，新的覆盖旧的
 * @param {*} element  dom 节点
 * @param {*} oldAttrs 旧属性
 * @param {*} newAttrs 新属性
 */
function mergeAttrs(element, oldAttrs, newAttrs) {
  if (typeof newAttrs !== 'object' || Array.isArray(newAttrs)) {
    return setAttrs(element, attrs)
  }

  var attrs = {}

  for (var attr in oldAttrs) {
    attrs[attr] = false
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

function Dom(opts) {
  this.opts = opts
  this.state = Object.assign(opts.state)
}

Dom.prototype = {
  setState: function(state) {
    this.state = state
    this.mount()
  },

  mount: function(el) {
    if (el) this.el = el
    var node = this.opts.render.apply(this, [this.state])
    this.element = render(this.el, this.element, this.oldNode, node)
    this.oldNode = node
  }
}

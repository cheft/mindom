const state = {
  count: 0,
  add: () => state.count += 1,
  sub: () => state.count -= 1
}

const component = {
  oncreate: () => {},
  onmount: () => {},
  onupdate: () => {},
  onupdated: () => {},
  onunmount: () => {},
  ondestroy: () => {},
  
  render: () => (
    <main>
      <h1>{state.count}</h1>
      <button onclick={state.add}>+</button>
      <button onclick={state.sub}>-</button>
    </main>
  )
}

dom.mount(document.body, component)

var d = new Dom({
  state: {style: 'color: red;'},

  render(state) {
    return <h1 style={state.style}>hello world</h1>
  }
})

d.mount(document.body)

setTimeout(function() {
  d.setState({ style: 'color: green;' });
}, 3000);
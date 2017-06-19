'use strict';

var state = {
  count: 0,
  add: function add() {
    return state.count += 1;
  },
  sub: function sub() {
    return state.count -= 1;
  }
};

var component = {
  oncreate: function oncreate() {},
  onmount: function onmount() {},
  onupdate: function onupdate() {},
  onupdated: function onupdated() {},
  onunmount: function onunmount() {},
  ondestroy: function ondestroy() {},

  render: function render() {
    return h(
      'main',
      null,
      h(
        'h1',
        null,
        state.count
      ),
      h(
        'button',
        { onclick: state.add },
        '+'
      ),
      h(
        'button',
        { onclick: state.sub },
        '-'
      )
    );
  }
};

dom.mount(document.body, component);

var d = new Dom({
  state: {
    style: 'color: red;',

    test: function () {
      console.log('hello world');
    }
  },

  render: function (state) {
    return h(
      'h1',
      { style: state.style, onClick: state.test },
      'hello world'
    );
  }
});

d.mount(document.body);

setTimeout(function () {
  d.setState({ style: 'color: green;' });
}, 3000);

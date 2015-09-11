app.cmp.Start = {
  controller: function(args) {
    var ctrl = {
      query: m.prop(''),
      type: m.prop('subreddit'),
      search: function(e) {
        e.preventDefault();
        if(!ctrl.query()) return;
        m.route('/' + (ctrl.type().toLowerCase() === 'subreddit' ? 'r' : 'search') + '/' + ctrl.query());
      },
      switchType: function(e) {
        ctrl.type(e.target.textContent);
      },
      handleInput: function(e) {
        var t = e.target;
        ctrl.query(t.value);
        if(t.value.length === 1) {
          Velocity(util.q('.go'), {
            opacity: 1,
            fontSize: ['150%', '50%']
          }, {
            display: 'block'
          });
        } else if(t.value.length === 0) {
          Velocity(util.q('.go'), 'reverse');
        }
      }
    };
    return ctrl;
  },
  view: function(ctrl, args) {
    var isSearch = ctrl.type().toLowerCase() === 'search';
    return m('div.search', [
      m('h1', 'Reddit Search'),
      m('div.options', [
        m('div.option', [
          m('button.pure-button', {
            class: isSearch ? '' : 'pure-button-active',
            onclick: ctrl.switchType
          }, 'Subreddit'),
          m('button.pure-button', {
            class: isSearch ? 'pure-button-active' : '',
            onclick: ctrl.switchType
          }, 'Search')
        ]),
//         m('div.option', [
//           m('button.pure-button', 'NSFW')
//         ])
      ]),
      m('form.pure-form', {
        onsubmit: ctrl.search
      }, [
        m('input.search-box', {
          config: mutil.c.autofocus,
          oninput: ctrl.handleInput,
          placeholder: isSearch ? 'Search Query' : 'Subreddit Name(s)'
        }),
        m('button[type=submit].go.pure-button', 'Go')
      ])
    ]);
  }
};

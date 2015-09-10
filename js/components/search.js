app.cmp.search = {
  controller: function(args) {
    var ctrl = {
      query: m.prop(''),
      search: function(e) {
        e.preventDefault();
        if(!ctrl.query()) return;
        m.route('/search/' + ctrl.query());
      }
    };
    return ctrl;
  },
  view: function(ctrl, args) {
    return m('div.search', [
      m('h1', 'Reddit Search'),
      m('form.pure-form', {
        onsubmit: ctrl.search
      }, [
        m('input.search-box[placeholder=Subreddit or Search]', {
          config: mutil.c.autofocus,
          oninput: function(e) {
            var t = e.target;
            ctrl.query(t.value);
            if(t.value.length === 1) {
              Velocity(util.q('.go'), {
                opacity: 1
              }, {
                display: 'block'
              });
            } else if(t.value.length === 0) {
              Velocity(util.q('.go'), 'reverse');
            }
          }
        }),
        m('button[type=submit].go.pure-button', 'Go')
      ])
    ]);
  }
};

app.cmp.Results = {
  controller: function(args) {
    var ctrl = {
      loading: m.prop(true),
      posts: m.prop([]),
      backToSearch: function() {
        m.route('/search');
      }
    };
    app.model.Reddit[args.type](m.route.param('query'))
      .then(ctrl.posts)
      .then(ctrl.loading.bind(null, false))
      .then(m.redraw);
    return ctrl;
  },
  view: function(ctrl, args) {
    return m('div.results', [
      m('span.back-to-search', {
        onclick: ctrl.backToSearch
      }, [
        m('i.fa.fa-arrow-left'),
        ' Search'
      ]),
      m('div', ctrl.posts().map(function(post) {
        var content;
        if(/\.(jpg|png|gif)$/i.test(post.url)) {
          content = m('img', {src: post.url});
        } else if(/\.(jpg|png|gif)$/i.test(post.thumbnail)) {
          content = m('img', {src: post.thumbnail});
        } else {
          content = m('span', post.url);
        }
        return m('div.post', content);
      })),
      m('img.loading', {
        src: app.IMAGES.loading,
        hidden: !ctrl.loading()
      }),
    ]);
  }
};

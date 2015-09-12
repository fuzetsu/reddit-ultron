app.cmp.Results = {
  controller: function(args) {
    var ctrl = {
      loading: m.prop(true),
      posts: m.prop([]),
      query: m.route.param('query'),
      backToSearch: function() {
        m.route('/search');
      },
      genPostTitle: function(post) {
        return m('div.post-info', [
          m('div.title', post.title),
          m('div.details', [
            m('span.score', post.score),
            ' upvotes and ',
            m('a[target=_blank]', {
              href: app.CONST.reddit + post.permalink
            }, post.num_comments + ' comments'),
            ' posted by ',
            m('a[target=_blank]', {
              href: app.CONST.reddit + '/user/' + post.author
            }, '/u/' + post.author),
            ctrl.isMultiReddit ? ([
              ' to ',
              m('a[target=_blank]', {
                config: m.route,
                href: '/r/' + post.subreddit
              }, '/r/' + post.subreddit)
            ]) : '',
          ])
        ]);
      },
      genPostContent: function(post) {
        var content = [];
        if(/\.(jpg|png|gif)$/i.test(post.url)) {
          content = m('img', {onclick: mutil.toggleExpand, src: post.url});
        } else if(/imgur\.com\/[a-z0-9]+$/i.test(post.url)) {
          content = m('img', {onclick: mutil.toggleExpand, src: post.url + '.jpg'});
        } else {
          if(/\.(jpg|png|gif)$/i.test(post.thumbnail)) {
            content.push(m('img', {src: post.thumbnail}));
          }
          content.push(m('a[target=_blank]', {href:post.url}, post.url));
        }
        return m('div.post-content', content);
      },
      showError: function() {
        ctrl.loading(false);
        Velocity(util.q('.error'), {
          opacity: 1,
          fontSize: ['125%', '50%']
        }, {
          display: 'block'
        });
        m.redraw();
      }
    };
    // determine is this is a multireddit
    ctrl.isMultiReddit = (args.type === 'search' || ctrl.query.indexOf('+') !== -1);
    // request the results
    app.model.Reddit[args.type](m.route.param('query'))
      .then(ctrl.posts)
      .then(ctrl.loading.bind(null, false))
      .then(m.redraw, ctrl.showError);
    return ctrl;
  },
  view: function(ctrl, args) {
    return m('div.results', [
      m('span.back-to-search', {
        onclick: ctrl.backToSearch
      }, [
        mutil.icon('arrow-left'),
        ' Search'
      ]),
      m('div', ctrl.posts().map(function(post) {
        return m('div.post', [
          ctrl.genPostTitle(post),
          ctrl.genPostContent(post)
        ]);
      })),
      m('img.loading', {
        src: app.IMAGES.loading,
        hidden: !ctrl.loading()
      }),
      m('div.error', [
        m('p', 'Unable to find "' + ctrl.query + '"'),
        m('button.error-button.pure-button', {
          onclick: ctrl.backToSearch
        }, 'Back to Search?')
      ])
    ]);
  }
};

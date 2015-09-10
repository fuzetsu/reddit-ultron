app.model.Reddit = {
  request: function(url, params) {
    var API_URL = 'https://www.reddit.com/';
    return m.request({
      method: 'GET',
      url: API_URL + url + '.json?' + m.route.buildQueryString(params),
      background: true
    }).then(function(posts) {
      return posts.data.children.map(function(post) {
        return post.data;
      });
    });
  },
  search: function(query, params) {
    params = params || {};
    params.q = query;
    return this.request('search', params);
  },
  subreddit: function(query, params) {
    return this.request('r/' + query, params);
  }
};

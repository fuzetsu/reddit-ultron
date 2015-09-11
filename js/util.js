/**
 ** Generic Utilities
 **/
var util = {
  q: function(q, c) {
    return (c || document).querySelector(q);
  },
  qq: function(q, c) {
    return [].slice.call((c || document).querySelectorAll(q));
  },
  extend: function(obj, newProps) {
    for (var prop in newProps) {
      if (newProps.hasOwnProperty(prop)) {
        obj[prop] = newProps[prop];
      }
    }
    return obj;
  },
};

/**
 ** Mithril Specific Utilities
 **/
var mutil = {
  formGroup: function(children, attrs) {
    return m('div.pure-control-group', attrs, children);
  },
  formControls: function(children, attrs) {
    return m('div.pure-controls', attrs, children);
  },
  icon: function(name, children) {
    return m('i.fa.fa-' + name, children);
  },
};

// reusable config attrs
mutil.c = {
  autofocus: function(elem, isInit) {
    elem.focus();
  },
  fadeIn: function(elem, isInit) {
    if (!isInit) {
      Velocity(elem, 'fadeIn');
    }
  },
  animate: function(command, always) {
    return function(elem, isInit) {
      if (always || !isInit) {
        Velocity(elem, command);
      }
    };
  },
  slideIn: function(elem, isInit) {
    if (!isInit) {
      Velocity(elem, {left: 0});
    }
  }
};

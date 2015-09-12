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
  titleCase: function(str) {
    return str.replace(/([a-z]+)/gi, function(match) {
      return match.charAt(0).toUpperCase() + match.slice(1);
    });
  },
  htmlDecode: function(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
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
  toggleExpand: function(e) {
    var t = e.target;
    if(!t.style.width) {
      t.style.width = t.clientWidth + 'px';
      t.style.maxWidth = 'none';
      Velocity(t, {
        width: (t.clientWidth * 1.7 > window.innerWidth ? '100%' : '*=1.7')
      });
    } else {
      Velocity(t, 'reverse');
    }
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
  },
};

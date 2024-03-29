/**
 * Include only Ratchet.js parts that are compatible with WP-AppKit.
 * 
 * Incompatibilities are due to the fact that Ratchet's Javascript implementation :
 * - uses href anchors to target its elements which is not compatible with WP-AppKit (Backbone) routing.
 * - does not use separated modules for each component : once the Ratchet's JS is included, 
 *   all Ratchet's components are on binding their touch events to the whole DOM,
 *   which lead to bugs with the "single page app" logic.
 */

/* ========================================================================
 * Ratchet: popovers.js v2.0.2
 * http://goratchet.com/components#popovers
 * ========================================================================
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!(function () {
  'use strict';

  var popover;

  var findPopovers = function (target) {
    var i;
    var popovers = document.querySelectorAll('a');

    for (; target && target !== document; target = target.parentNode) {
      for (i = popovers.length; i--;) {
        if (popovers[i] === target) {
          return target;
        }
      }
    }
  };

  var onPopoverHidden = function () {
    popover.style.display = 'none';
    popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
  };

  var backdrop = (function () {
    var element = document.createElement('div');

    element.classList.add('backdrop');

    element.addEventListener('touchend', function () {
      popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
      popover.classList.remove('visible');
      popover.parentNode.removeChild(backdrop);
    });

    return element;
  }());

  var getPopover = function (e) {
    var anchor = findPopovers(e.target);

    if (!anchor || !anchor.hash || (anchor.hash.indexOf('/') > 0)) {
      return;
    }

    try {
      popover = document.querySelector(anchor.hash);
    }
    catch (error) {
      popover = null;
    }

    if (popover === null) {
      return;
    }

    if (!popover || !popover.classList.contains('popover')) {
      return;
    }

    return popover;
  };

  var showHidePopover = function (e) {
    var popover = getPopover(e);

    if (!popover) {
      return;
    }
	
    popover.style.display = 'block';
    popover.offsetHeight;
    popover.classList.add('visible');

    popover.parentNode.appendChild(backdrop);
  };

  window.addEventListener('touchend', showHidePopover);

}());
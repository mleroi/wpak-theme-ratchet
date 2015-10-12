<!--
Theme Name: Ratchet Demo Theme
Description: WP-AppKit demo theme using the Ratchet Front End Framework
Version: 0.2
Theme URI: https://github.com/uncatcrea/wpak-bootstrap-themes
Author: UncatCrea			
Author URI: http://uncategorized-creations.com		
-->

# WP-AppKit Ratchet Demo Theme

This WP-AppKit theme is based on the <a href="http://goratchet.com/">Ratchet</a> mobile apps Front End Framework.

Note that Ratchet's Javascript components are not fully compatible with WP-AppKit themes because Ratchet's Javascript implementation :
- uses href anchors to target its elements which is not compatible with WP-AppKit (Backbone) routing.
- does not use separated modules for each component : once the Ratchet's JS is included,
all Ratchet's components are on, binding their touch events to the whole DOM,
which lead to bugs with the "single page app" logic.

In this theme we only use the "popover" Ratchet component http://goratchet.com/components/#popovers so
we extracted this one module only from the Ratchet's javascript lib (see js/ratchet-wpak.js).

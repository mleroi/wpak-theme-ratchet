define( [ 'jquery', 'core/theme-app', 'core/modules/storage', 'theme/js/ratchet-wpak' ], function ( $, App, Storage ) {

	/**
	 * Launch app contents refresh when clicking the refresh button :
	 */
	$( '#refresh-button' ).click( function( e ) {
		e.preventDefault();
		App.refresh();
	} );

	/**
	 * Automatically shows and hide Back button according to current screen.
	 * In this implementation, the refresh button is hidden when the back button
	 * is showed:
	 */
	App.setAutoBackButton( $( '#back-button' ), function ( back_button_showed ) {
		if ( back_button_showed ) {
			$( '#refresh-button' ).hide();
		} else {
			$( '#refresh-button' ).show();
		}
	} );
	
	/**
	 * Animate refresh button when the app starts refreshing
	 */
	App.on( 'refresh:start', function() {
		$( '#refresh-button' ).addClass( 'refreshing' );
	} );
	
	/**
	 * Stop refresh button animation when the app ends refreshing
	 */
	App.on( 'refresh:end', function( result ) {
		$( '#refresh-button' ).removeClass( 'refreshing' );
	} );
	
	/**
	 * "Get more" button in post lists
	 */
	$( '#app-layout' ).on( 'click', '.get-more', function( e ) {
		e.preventDefault();
		$( this ).attr( 'disabled', 'disabled' ).text( 'Loading...' );
		
		//Memorize scroll pos to go back to it :
		memorizeScrollPos( 'get-more' );
		
		App.getMoreComponentItems( function() {
			//If something is needed once items are retrieved, do it here.
			//Note : if the "get more" link is included in the archive.html template (which is recommended),
			//it will be automatically refreshed.
			$( this ).removeAttr( 'disabled' );
			
			scrollToMemorizedPos( 'get-more' );
		} );
	} );
	
	/**
	 * Ratchet uses anchors to trigger its popover (that we use for the menu)
	 * so we have to disable the default action when clicking the menu link :
	 */
	$( '#menu-button' ).on( 'click', function(e) {
		e.preventDefault();
	} );
	
	/**
	 * Close Ratchet popover when clicking an item in the menu.
	 * (Ratchet has no public method for that...)
	 */
	$( '#app-layout' ).on( 'click', '#menu a', function(e) {
		$('.popover').removeClass('visible');
		$('.popover').hide();
		$('.backdrop').remove();
	} );
	
	
	/**
	 * When we're leaving a post list, we memorize the current scroll position, to
	 * get back to it when coming back to this list.
	 */
	App.on( 'screen:leave', function( current_screen, queried_screen, view ) {
		//current_screen.screen_type can be 'list','single','page','comments'
		if ( current_screen.screen_type == 'list' ) {
			memorizeScrollPos( current_screen.fragment );
		}
	} );
	
	/**
	 * When a post list is displayed, we resore the scroll position
	 */
	App.on( 'screen:showed', function( current_screen, view ) {
		//current_screen.screen_type can be 'list','single','page','comments'
		if ( current_screen.screen_type == 'list' ) {
			scrollToMemorizedPos( current_screen.fragment );
		} else {
			scrollTop();
		}
	} );

	/**
	 * Get back to the top of the screen
	 */
	function scrollTop() {
		window.scrollTo( 0, 0 );
	}
	
	/**
	 * Memorize current scroll position
	 */
	function memorizeScrollPos ( storage_id ) {
		Storage.set( 'scroll-pos', storage_id, $( '.content' ).eq(0).scrollTop() );
	}
	
	/**
	 * Scroll to the memorized position 
	 */
	function scrollToMemorizedPos( storage_id ) {
		var pos = Storage.get( 'scroll-pos', storage_id );
		if ( pos !== null ) {
			$( '.content' ).eq(0).scrollTop( pos );
		} else {
			scrollTop();
		}
	}
	
} );
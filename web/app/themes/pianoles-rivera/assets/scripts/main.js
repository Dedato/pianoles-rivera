/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        /*
         * NAVIGATION
         */
        // jQuery to collapse the navbar on scroll
        $(window).scroll(function() {
          if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
          } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
          }
        });
        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $(function() {
          $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
          });
        });
        // Toggle fullscreen mobile menu with button
        $('.navbar-toggle').click(function(){
          $(this).toggleClass('close');
          if($('body').hasClass('show-nav')){
            $('body').removeClass('show-nav').addClass('hide-nav');
            setTimeout(function(){
              $('body').removeClass('hide-nav');
            }, 500);
          } else {
            $('body').removeClass('hide-nav').addClass('show-nav');
          }
          return false;
        });
        // Hide fullscreen mobile menu with escape
        $(document).keyup(function(e){
          if(e.keyCode === 27){
            if($('.navbar-toggle').hasClass('close')){
              $('.navbar-toggle').removeClass('close');
            }
            // Main Nav
            if($('body').hasClass('show-nav')){
              $('body').removeClass('show-nav').addClass('hide-nav');
              setTimeout(function(){
                $('body').removeClass('hide-nav');
              }, 500);
            }
          }
        });
        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul.main-nav li a').click(function() {
          $('.navbar-toggle:visible').click();
        });
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

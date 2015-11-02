(function ($) {

  // Get header height
  var headerHeight = $('.header').outerHeight(), // Get outter height
    heroTopPadding = parseInt($('.hero').css('padding-top')); // Check current hero padding

  console.log(headerHeight);
  console.log(heroTopPadding);

  // Add header height to hero top padding
  $('.hero').css({
    'padding-top': heroTopPadding + headerHeight
  });
})(jQuery);
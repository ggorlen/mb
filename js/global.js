$(document).ready(function () {

  // Highlight code with HLJS
  $('code').each(function (i, block) {
    hljs.highlightBlock(block);
  });

  // Animated scrolling effects
  $(document).on("click", "a", function (event) {
    let destination = $.attr(this, "href");
  
    if (destination.startsWith("#")) {
      event.preventDefault();
  
      $("html, body").animate({
        scrollTop: $(destination).offset().top
      }, 300);
    }
  });

  $("a[href='#top']").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    return false;
  });

});

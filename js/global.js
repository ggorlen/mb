"use strict";


$(document).ready(function () {

  // Make the page visible
  document.body.style.opacity = 1;

  // Style nav buttons
  const navBtns = document.getElementsByTagName("nav")[0].children;

  for (let i = 0; i < navBtns.length; i++) {
    if (navBtns[i].tagName === "A") {
      navBtns[i].style.background = "hsl(" + (360 - (i + 42) * 20) + ", 30%, " + ((i + 3) * 12) + "%)";
    }
  }

  // Sticky nav
  const nav = $("nav");
  const navInitOffset = nav.offset().top;
  const stickyNav = function () {
    if ($(window).scrollTop() >= navInitOffset) { nav.addClass("sticky"); } 
    else { nav.removeClass("sticky"); }
  };
  
  stickyNav();
  $(window).scroll(stickyNav);

  // Highlight code with HLJS
  $("code").each(function (i, block) { 
    hljs.highlightBlock(block); 
  });

  // Animated scrolling effects
  $(document).on("click", "a", function (e) {
    let destination = $.attr(this, "href");
  
    if (destination.startsWith("#")) {
      e.preventDefault();
  
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

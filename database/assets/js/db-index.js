// Javascript for index page

// Scroll to top button
$(document).ready(function(){
  $('#back-top').hide();
  $(window).scroll(function(){
    if(($(this).scrollTop() > 900) && ((window.innerHeight + window.scrollY) < document.body.scrollHeight)){
      $('#back-top').fadeIn(300);
    }
    else{
      $('#back-top').fadeOut(300);
    }
  });

  $('#back-top').click(function(){
    $('body,html').animate({
      scrollTop:0
    }, 400);
  });
});
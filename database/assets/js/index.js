// Javascript for index page

// Testimonials management
// TESTIMONIALS HERE
var TESTIMONIALS = [
    ["I can see the database being tremendously useful for research hopefuls.","James (Student)"],
    ["I like it! Been looking for something like this.","Brent (Student)"],
    ["The website seems very friendly and easy to use.","Student"],
    ["Great to have this all in one place!","Student"],
    ["Great program, well designed, aesthetically pleasing.","Student"],
    ["[A] great place to start one's search for a faculty research advisor.","Prof. Carl Hashimoto"],
    ["This is a great resource for both students and faculty. I especially appreciate the ability to do key word searches.","Prof. Steven M. Girvin"]
];

var testimonialNum = TESTIMONIALS.length;
var thisone = Math.floor(Math.random()*testimonialNum);
$('#testimonials-item footer>p').text('"'+TESTIMONIALS[thisone][0]+'"');
$('#testimonials-item footer>cite').text("- "+TESTIMONIALS[thisone][1]);
function changeTestimonial(){
    thisone = (thisone + 1 ) % testimonialNum;
    $('#testimonials-item footer>p, #testimonials-item footer>cite').fadeOut(500,function() {
        $('#testimonials-item footer>p').text('"'+TESTIMONIALS[thisone][0]+'"').fadeIn(500);
        $('#testimonials-item footer>cite').text("- "+TESTIMONIALS[thisone][1]).fadeIn(500);
    });
}

// All main scripts
$(document).ready(function(){

    // Learn more button
    $('#learnmore').localScroll({duration:800});

    // Scroll to top button
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

    // Testimonials
    setInterval(changeTestimonial,3000);
});
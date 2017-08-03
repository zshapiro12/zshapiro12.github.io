/*
This script file contains a bunch of functions to help you learn/review jquery. Turn the functions on and off by temporarily deleting the comments before and after each function

The Document Ready Function is perhaps the most important of all jquery functions.  Unless you use it, none of your other functions will work.  Any other function you write will be "wrapped" in this function.

Let's take it point by point.
--The $() says "hey, we're about to do some jquery"
--Document refers to the html document or, put another way, your html page.
--Ready is an action.  It listens for whatever is within the $(), in this case the html page, is "ready" or loaded.
--Once that happens, it executes the function, or specific instructions we'll give it to do something fun, which we'll put in between the {} later on.
 */


$(document).ready(function(){
  $("button").click (function() {
    $(".legendbox").toggle();
    $("#hide, #show").toggle();
    $("button").toggleClass("btn-danger");
  });

});

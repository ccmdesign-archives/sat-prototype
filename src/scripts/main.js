'use strict';

$(document).ready(function () {
    // $('.report-button').click(function() {
    //   // var questions = $('.report');
    //   // var a = 0;
    //   // $.each(questions, function(){
    //   //   $(this).attr('id', a);
    //   //   console.log(a);
    //   //   $('#' + a).addClass('report--' + answers[a])
    //   //   a++;
    //   // });

    //   $('.modal').addClass('js-active');
    //   $('#overlay').addClass('js-active');
    // });

    // $('#overlay').click(function() {
    //   $('.modal').removeClass('js-active');
    //   $('#overlay').removeClass('js-active');
    // });

  // Event listeners
  // ---------------

  $('#js-questions-list').on('click', '.js-yes', function() {
    var target = $(this).closest('.question');
    target.addClass('question--yes').removeClass('question--no');
    answerQuestion(target.data('id'), 'yes');
    return false;
  });

  $('#js-questions-list').on('click', '.js-no', function() {
    var target = $(this).closest('.question');
    target.addClass('question--no').removeClass('question--yes');
    answerQuestion(target.data('id'), 'no');
    return false;
  });

  $('#js-sign-in-button').click(function() {
    signInUser();
  });

  $('#js-sign-out-button').click(function() {
    signOutUser();
  });

  firebase.auth().onAuthStateChanged(function(user) {
    // Ignore token refresh events
    if (user && currentUserId === user.uid) {
      return;
    }
    cleanupUI();

    if (user) {  // User logged in
      currentUserId = user.uid;
      $('#js-splash').hide();
      upsertUser(user.uid, user.displayName, user.email, user.photoURL);
    } else {  // User logged out
      currentUserId = null;
      $('#js-splash').show();
    }
  });
});


// Auxiliar functions
// ------------------

var cleanupUI = function() {
  // TODO: Cleanup firebase refs
  $('.question-list').html('');
}
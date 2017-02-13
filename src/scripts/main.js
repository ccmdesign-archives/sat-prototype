'use strict';

$(document).ready(function () {

  // Event listeners
  // ---------------

  $('#js-questions-list').on('click', '.js-yes', function() {
    var target = $(this).closest('.question-item');
    var sectionId = target.data('section-id');
    var questionId = target.data('question-id');
    target.addClass('question-yes').removeClass('question-no');
    $('#js-map-dot-' + sectionId + '-' + questionId).removeClass('answered-no');
    $('#js-map-dot-' + sectionId + '-' + questionId).addClass('answered-yes');
    answerQuestion(sectionId, questionId, 'yes');
    return false;
  });

  $('#js-questions-list').on('click', '.js-no', function() {
    var target = $(this).closest('.question-item');
    var sectionId = target.data('section-id');
    var questionId = target.data('question-id');
    target.addClass('question-no').removeClass('question-yes');
    $('#js-map-dot-' + sectionId + '-' + questionId).removeClass('answered-yes');
    $('#js-map-dot-' + sectionId + '-' + questionId).addClass('answered-no');
    answerQuestion(sectionId, questionId, 'no');
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
  // $('.question-list').html('');
}
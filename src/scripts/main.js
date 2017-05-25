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

  $('#js-questions-list').on('change', '.js-rap-section-input', function() {
    var target = $(this).closest('.question-item');
    var sectionId = target.data('section-id');
    var questionId = target.data('question-id');
    setSectionNumber(sectionId, questionId, $(this).val());
    return false;
  });

  $('#js-questions-list').on('change', '.js-rap-page-input', function() {
    var target = $(this).closest('.question-item');
    var sectionId = target.data('section-id');
    var questionId = target.data('question-id');
    setPageNumber(sectionId, questionId, $(this).val());
    return false;
  });

  $('#js-questions-list').on('change', '.js-additional-info', function() {
    var target = $(this).closest('.section');
    var sectionId = target.data('section-id');
    setAdditionalInfo(sectionId, $(this).val());
    return false;
  });

  $(document).on('change', '.js-not-relevant', function() {
    var sectionId = $(this).data('section-id');
    var value = $(this).is(':checked');

    if (value) {
      $(this).closest('.section-header').find('.js-justification').hide();
      $(this).closest('.section-header').find('.js-justification').val('');
      setJustification(sectionId, '');
    } else {
      $(this).closest('.section-header').find('.js-justification').show();
    }

    setRelevance(sectionId, value);
  });

  $('#js-questions-list').on('change', '.js-justification', function() {
    var target = $(this).closest('.section');
    var sectionId = target.data('section-id');
    setJustification(sectionId, $(this).val());
    return false;
  });

  $('#js-reset-button').click(function() {
    resetForm();
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
      return false;
    }

    if (user) {  // User logged in
      currentUserId = user.uid;
      $('#js-report-link').attr('href', './report.html?id=' + user.uid);
      $('#js-loading').show();
      $('#js-splash').hide();
      upsertUser(user.uid, user.displayName, user.email, user.photoURL);
    } else {  // User logged out
      cleanupUI();
      currentUserId = null;
      $('#js-splash').show();
      $('#js-loading').hide();
    }
  });
});


// Auxiliar functions
// ------------------

var cleanupUI = function() {
  // TODO: Cleanup firebase refs
  $('#js-report').html('');
  $('#js-questions-map').html('');
  $('#js-questions-list').html('');
  $('#js-questions-list').removeClass('slick-slider');
  $('#js-questions-list').removeClass('slick-initialized');
}

function getUrlVars() {
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  var params = []
  var hash;
  for(var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    params.push(hash[0]);
    params[hash[0]] = hash[1];
  }
  return params;
}


// Handlebar helpers
// -----------------

Handlebars.registerHelper("counter", function(index) {
  return index + 1;
});

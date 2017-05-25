'use strict';

// Initial setup
// -------------

// Initialize Firebase
//
// * TODO(DEVELOPER): Set the field values by navigating to:
// https://console.firebase.google.com
// and choosing a project you've created.  Then click the red HTML logo at the
// top right of the page with the caption "Add Firebase to your web app".
var config = {
  apiKey: "AIzaSyClIbQSMy44IIP6dlgfr1en5Wa-mTeX-JU",
  authDomain: "sat-prototype-d6fbe.firebaseapp.com",
  databaseURL: "https://sat-prototype-d6fbe.firebaseio.com",
  storageBucket: "sat-prototype-d6fbe.appspot.com",
  messagingSenderId: "1081117779504"
};
firebase.initializeApp(config);

// Checks that the Firebase SDK has been correctly setup and configured
if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
  window.alert('You have not configured and imported the Firebase SDK. Make sure you go through the codelab setup ' +
    'instructions.');
} else if (config.storageBucket === '') {
  window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is actually a Firebase bug' +
    'that occurs rarely. Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) and' +
    'make sure the storageBucket attribute is not empty. You may also need to visit the Storage tab and paste the' +
    'name of your bucket which is displayed there.');
}

var currentUserId;
var answers;
var db = firebase.database();

// Firebase operations
// -------------------

var signInUser = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

var signOutUser = function() {
  firebase.auth().signOut();
}

var insertUser = function(id, name, email, photoUrl) {
  $.get('../data/questions.json', function(data) {
    var user = {
      name: name,
      email: email,
      profile_picture: photoUrl,
      questions: data
    }
    db.ref('users/' + id).set(user);
    loadQuestions(id);
  })
}

var updateUser = function(id, name, email, photoUrl) {
  db.ref('users/' + id).update({
    name: name,
    email: email,
    profile_picture: photoUrl
  });
  if ($('#js-questions-map').length) {
    loadQuestions(id);
  } else if ($('#js-report').length) {
    loadReport();
  }
}

function upsertUser(id, name, email, photoUrl) {
  db.ref('users/' + id).once('value', function(snapshot) {
    var exists = snapshot.val() !== null;
    if (exists) {
      updateUser(id, name, email, photoUrl);
    } else {
      insertUser(id, name, email, photoUrl);
    }
  });
}

var loadQuestions = function(userId) {
  db.ref('users/' + userId + '/questions').once('value', function(snapshot) {
    var source = $('#js-map-template').html();
    var template = Handlebars.compile(source);
    var context = {'questions': snapshot.val()}
    var renderedHtml = template(context);
    $('#js-questions-map').html(renderedHtml);

    source = $('#js-list-template').html();
    template = Handlebars.compile(source);
    context = {sections: snapshot.val(), totalSections: snapshot.val().length}
    renderedHtml = template(context);
    $('#js-questions-list').html(renderedHtml);

    $('#js-questions-list').slick({
      arrows: true,
      autoplay: false,
      adaptiveHeight: true,
      infinite: false,
      prevArrow: '<div class="arrow arrow-prev"><i class="material-icons">keyboard_arrow_left</i></div>',
      nextArrow: '<div class="arrow arrow-next"><i class="material-icons">keyboard_arrow_right</i></div>'
    });

    $('#js-questions-list').on('afterChange', function(slick, currentSlide) {
      $('.current').removeClass('current');
      $('#js-map-col-' + currentSlide.currentSlide).addClass('current');
    });

    $('#js-loading').hide();
  });
};

var loadReport = function() {
  var userIdReport = getUrlVars().id;
  db.ref('users/' + userIdReport).once('value', function(snapshot) {
    var data = snapshot.val();
    var source = $('#js-report-template').html();
    var template = Handlebars.compile(source);
    var totalQuestions = 0;
    var score = 0;

    data.questions.forEach(function(section) {
      section.questions.forEach(function(question) {
        totalQuestions += 1;

        if (section.not_relevant || question.answer == 'yes') {
          score += 1;
        }
      });
    });

    var context = {
      questions: data.questions,
      username: data.name,
      totalQuestions: totalQuestions,
      score: score,
      completed: score == totalQuestions
    }
    var renderedHtml = template(context);
    $('#js-report').html(renderedHtml);
    $('#js-loading').hide();
  });
}

var answerQuestion = function(sectionId, questionId, answer) {
  db.ref('users/' + currentUserId + '/questions/' + sectionId + '/questions/' + questionId).update({
    answer: answer
  });
};

var setSectionNumber = function(sectionId, questionId, number) {
  db.ref('users/' + currentUserId + '/questions/' + sectionId + '/questions/' + questionId).update({
    rap_section: number
  });
};

var setPageNumber = function(sectionId, questionId, number) {
  db.ref('users/' + currentUserId + '/questions/' + sectionId + '/questions/' + questionId).update({
    rap_page: number
  });
};

var setRelevance = function(sectionId, value) {
  db.ref('users/' + currentUserId + '/questions/' + sectionId).update({
    not_relevant: value
  });
};

var setAdditionalInfo = function(sectionId, value) {
  db.ref('users/' + currentUserId + '/questions/' + sectionId).update({
    additional_info: value
  });
};

var setJustification = function(sectionId, value) {
  db.ref('users/' + currentUserId + '/questions/' + sectionId).update({
    justification: value
  });
};

var resetForm = function() {
  $.get('../data/questions.json', function(data) {
    db.ref('users/' + currentUserId).update({questions: data});
    location.reload();
  })
};

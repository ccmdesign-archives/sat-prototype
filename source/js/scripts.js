$(document).ready(function () {
    var questions = $('.question');
    var answers = []
    var n = 0;
    $.each(questions, function(){
      $(this).attr('id', n);
      answers.push(false);
      n++
    });

    $('.js-yes').click(function() {
      var target = $(this).parent().parent().parent();
      var target_id = target.attr('id');
      target.addClass('question--yes').removeClass('question--no')
      answers[target_id] = true;

      console.log(answers);
    });

    $('.js-no').click(function() {
      var target = $(this).parent().parent().parent();
      var target_id = target.attr('id');
      target.addClass('question--no').removeClass('question--yes');

      answers[target_id] = false;

      console.log(answers);
    });

    console.log(answers);

    $('.report-button').click(function() {
      // var questions = $('.report');
      // var a = 0;
      // $.each(questions, function(){
      //   $(this).attr('id', a);
      //   console.log(a);
      //   $('#' + a).addClass('report--' + answers[a])
      //   a++;
      // });      



      $('.modal').addClass('js-active');
      $('#overlay').addClass('js-active');
    });

    $('#overlay').click(function() {
      $('.modal').removeClass('js-active');
      $('#overlay').removeClass('js-active');
    });

}); // doc.ready

$(document).ready(function () {
  $('.sections').slick({
    speed: 300,
    slidesToShow: 1,
    variableWidth: true,
    centerMode: true,
    adaptiveHeight: true,
    infitine: false,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><i class="material-icons">keyboard_arrow_left</i></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"><i class="material-icons">keyboard_arrow_right</i></button>'
  });


    // var questions = $('.question');
    // var answers = []
    // var n = 0;
    // $.each(questions, function(){
    //   $(this).attr('id', n);
    //   answers.push(false);
    //   n++
    // });

    // $('.js-yes').click(function() {
    //   $(this).addClass('js-active').siblings('.js-no.js-active').removeClass('js-active');
    //   var target = $(this).parent().parent().parent();
    //   var target_id = target.attr('id');
    //   target.addClass('question--yes').removeClass('question--no')
    //   answers[target_id] = true;

    //   console.log(answers);
    // });

    // $('.js-no').click(function() {
    //   $(this).addClass('js-active').siblings('.js-yes.js-active').removeClass('js-active');
    //   var target = $(this).parent().parent().parent();
    //   var target_id = target.attr('id');
    //   target.addClass('question--no').removeClass('question--yes');

    //   answers[target_id] = false;

    //   console.log(answers);
    // });

    // console.log(answers);

    // $('.report-button').click(function() {
    //   var questions = $('.report');
    //   var a = 0;
    //   $.each(questions, function(){
    //     $(this).addClass('report--' + answers[a])
    //     a++;
    //   });      

    //   $('.modal').addClass('js-active');
    //   $('#overlay').addClass('js-active');
    //   $('body').addClass('js-modal-active');
    // });

    // $('#overlay').click(function() {
    //   $('.modal').removeClass('js-active');
    //   $('#overlay').removeClass('js-active');
    //   $('body').removeClass('js-modal-active');
    // });

}); // doc.ready

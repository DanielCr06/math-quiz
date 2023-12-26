$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    // questions options and answers data
    questions: {
      q1: 'Kthe numrin 2.478 ne perqindje!',
      q2: 'Vlera e shprehjes y(y+3) - 2y(y+1) eshte e njevlershme me:',
      q3: 'Elementi me i vogel i bashkesise [3;4]^[-3;4] eshte:',
      q4: 'Formula per te gjetur vellimin e konit eshte:',
      q5: "Gjeni pergjigjen e 2√3 - 7√3:",
      q6: 'Si shkruhet ndryshe √28?',
      q7: "Cili nga numrat nuk eshte natyror?",
      q8: "Sa eshte rrenja e numrit √-4?",
      q9: "Si eshte trajta standarte e ekuacionit te nje drejteze?",
      q10: "Sa faqe ka ne tetraeder?",
      q11: "Nese sip. e rrethit dhe vellimi i rrethit jane numerikisht te barabarte, rrezja e rrethit eshte:",
      q12: "Sa zgjidhje ka nje ekuacion i fuqise se dyte me dallor negativ?",
      q13: "Ne ekuacionin e fuqise se 3, nese 'a' eshte negative, ne cilet kuandrant kalon grafiku?",
      q14: "Formula e teoremes se pitagores eshte:?",
      q15: "Formula kuadratike eshte :",
    },
    options: {
      q1: ['247.8%', '24.78%', '2478%', '0.02478%'],
      q2: ['0', 'y2 + y', '3y', '-y2 + y'],
      q3: ['-3', '0', '4', '3'],
      q4: ['4/3 Π r h', '1/3 Π r h', '1/3 Π h r2', '1/3 Π h r3'],
      q5: ['-5√3','5√3','5√0','-5√0'],
      q6: ['3√2','2√7','4√7','7√2'],
      q7: ['12', '9', '0','100'],
      q8: ['2', '4', '-2','Nuk ekziston'],
      q9: ['y=mx+c', 'ax+bx+c=0', 'y=x','y=mx'],
      q10: ['10', '5', '3','4'],
      q11: ['3', '5', '2','4'],
      q12: ['0', '1', '2','Shume'],
      q13: ['1,3', '2,4', '1,4','2,3'],
      q14: ['a2 + b2 = c2', 'a2 + b2 = c', 'a + b = c','2a + 2b = 2c'],
      q15: ['ax3+bx2+cx+d=y', 'ax2+bx+c=y', 'mx+c=y','x'],
    },
    answers: {
      q1: '247.8%',
      q2: '-y2 + y',
      q3: '3',
      q4: '1/3 Π h r2',
      q5: '-5√3',
      q6: '2√7',
      q7: '0',
      q8: 'Nuk ekziston',
      q9: 'y=mx+c',
      q10: '4',
      q11: '3',
      q12: '0',
      q13: '2,4',
      q14: 'a2 + b2 = c2',
      q15: 'ax2+bx+c=y',
    },
    // trivia methods
    // method to initialize game
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // show game section
      $('#game').show();
      
      //  empty last results
      $('#results').html('');
      
      // show timer
      $('#timer').text(trivia.timer);
      
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question
      trivia.nextQuestion();
      
    },
    // method to loop through and display questions and options 
    nextQuestion : function(){
      
      // set timer to 20 seconds each question
      trivia.timer = 20;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // to prevent timer speed up
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // the time has run out and increment unanswered, run result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Koha mbaroi! Pergjigja ishte '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Faleminderit qe luajtet!</h3>'+
          '<p>Sakte: '+ trivia.correct +'</p>'+
          '<p>Gabim: '+ trivia.incorrect +'</p>'+
          '<p>Pa pergjigje: '+ trivia.unanswered +'</p>'+
          '<p>Provo Perseri!</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Pergjigje e sakte!</h3>');
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Fito heren tjeter! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivia.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  }



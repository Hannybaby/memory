

//Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// create an array with all cards
let array = 
		['fa-diamond','fa-diamond', 
		'fa-paper-plane', 'fa-paper-plane', 
		'fa-anchor', 'fa-anchor',
		'fa-bolt', 'fa-bolt',
		'fa-cube', 'fa-cube', 
		'fa-leaf', 'fa-leaf',
		'fa-bicycle', 'fa-bicycle', 
		'fa-bomb', 'fa-bomb'],

//variables

	opened = [], 
	match, moves, executed = false, 
	board = $('.deck'), 
	scorePanel = $('.score-panel'),
	moveNo = scorePanel.find('.moves'),
	stars = scorePanel.find 
	('i'), 
	restart = scorePanel.find('.restart');

	
//start game function

function startGame(){
	board.empty();
  	match = 0;
 	stars.removeClass('fa-star-o').addClass('fa fa-star');
 	moves = 0;
 	moveNo.html(moves + ' Moves');
	let arrayShuffle = shuffle(array);
	for (let i = 0; i < arrayShuffle.length; i++) {
		board.append('<li class="card"><i class="' + arrayShuffle[i] + ' fa"></i></li>');
	}
	clearTimer();
}

//start timer on click

board.on('click', '.card', function(){
	if (executed===true){
		return; 
	};
	timer();
	executed = true;
});

//open card on click

board.on('click', '.card:not(".match, .open")', function() {
	if($('.show').length > 1) {
		return;
	}
	var	item = $(this),
		card = item.children('i').attr('class');
	opened.push(card);
 	item.addClass('open show');

 	//match cards yes / no 
	if (opened.length > 1) {
        if (card === opened[0]) {
	    	board.find('.open').addClass('match');
		    setTimeout(function() {
		    	board.find('.match').removeClass('open show');
		    }, 800);
	      match++;
	      opened = [];
	      
	    } else {
	    	board.find('.open').addClass('nomatch');
			setTimeout(function() {
				board.find('.open').removeClass('open show nomatch');
			}, 530);
		  	opened = [];
		}
		moves++;
		rating(moves);
		moveNo.html(moves + ' Moves');
	}


	if (match === 1) {
		rating(moves);
		let score = rating(moves).noOfStars;
		clearTimeout(t);
		setTimeout(function() {
			endGame();
		}, 500);
	}
})




//	Rating
	thirdStar=document.querySelector('.star-one');
	secondStar=document.querySelector('.star-two');
	firstStar=document.querySelector('.star-three');

function rating(moves) {
	let noOfStars = 3;
	if (moves > 18 && moves <= 26) {
		thirdStar.className="star-three fa fa-star-o";
		noOfStars = 2;
	} else if (moves > 26 && moves <= 35) {
		secondStar.className="star-two fa fa-star-o";
		noOfStars = 1;
	} else if (moves > 35) {
		firstStar.className="star-one fa fa-star-o";
		noOfStars = 0;
	}	
	return {noOfStars};
};

	//	Open Window when all cards are matched

function endGame() {
	 $("#myModal").modal("show");
};






restart.on('click', function() {
       const refresh = confirm ('Would you like to restart?');
       	if (refresh == true) {
       		startGame();
       	}
    });






//	Timer function from: https://jsfiddle.net/Daniel_Hug/pvk6p/

let time = document.getElementsByTagName('time')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    time.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();

}

function timer() {
    t = setTimeout(add, 1000);
    return ('time.textContent');
}


function clearTimer() {
	clearTimeout(t);
    time.textContent = "00:00";
    seconds = 0; minutes = 0; hours = 0;
    executed = false;
}



startGame();



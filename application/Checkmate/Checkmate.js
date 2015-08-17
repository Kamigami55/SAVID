///////////////////////////////
// checkmate.js
///////////////////////////////
//
// Control the chess
//	
//////////////////////////




/////////////////////
// Global variable
/////////////////////



var cmOpened = false;




/////////////////////
// DOM Events
/////////////////////



$("#openCheckmate").click(function(){toggleCheckmate();});
$("#closeCheckmate").click(function(){toggleCheckmate();});
$("#checkmate").draggable();



/////////////////////
// Function
/////////////////////



function toggleCheckmate() {
	
	if ( !cmOpened ) { // if wordpad hasn't been opened, open it
		cmOpened = true;
		$("#checkmate").slideDown();
		
		activeRender = false;
		activeControl = false;
		activeLook = false;
		
		//setup
		
	} else { // close it
		cmOpened = false;
		$("#checkmate").slideUp();
		
		activeRender = true;
		activeControl = true;
		activeLook = false;

		//close
	}
	
}



function checkmateRequest( request ) {
	
	switch ( request.getElementByTagName("event")[0].chileNote[0].nodeValue ) {
		case "move":
			//do something
			break;
	}
	
}







var interval;
var draggable = false;

$("#white").click(function(){
	board.start();
	game = new Chess();
	updateStatus();
	board.orientation("white");
	
	draggable = true;
	clearInterval(interval);
});

$("#black").click(function(){
	board.start();
	game = new Chess();
	updateStatus();
	board.orientation("black");
	
	draggable = false; //todotodotodotodo:  done move,  set to unmoveable
	clearInterval(interval);
	interval = setInterval(function(){
		
		$.get("php/Checkmate/getMove.php", function(movement){
			
			if ( movement ) { // get move!
				var move = movement.split("-");
				
				game.move({
				  from: move[0],
				  to: move[1],
				  promotion: 'q' // NOTE: always promote to a queen for example simplicity
				});
				board.move(move[0]+'-'+move[1]);
					  
				draggable = true;
				clearInterval(interval);
				
				updateStatus();
			}
			
		});
		
	}, 1500);
});



/////////////////////
// Script
/////////////////////



var board,
  game = new Chess(),
  statusEl = $('#status'),
  fenEl = $('#fen'),
  pgnEl = $('#pgn');



var removeGreySquares = function() {
  $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
  var squareEl = $('#board .square-' + square);
  
  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#696969';
  }

  squareEl.css('background', background);
};



////////////////////////////////////////////////////////////////////////////////



var onDragStart = function(source, piece) {
  // do not pick up pieces if the game is over
  // or if it's not that side's turn
  if ( !draggable ) {
	  return false;
  }
  
  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }

};


var onDrop = function(source, target) {
  removeGreySquares();

  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) {
	  return 'snapback';
  } else {
	  $.post("php/Checkmate/putMove.php",
	  {
		  source: source,
		  target: target
	  },
	  function() {
		  
		  draggable = false; //todotodotodotodo:  done move,  set to unmoveable
		  
		  setTimeout(function(){
			  interval = setInterval(function(){
			  
				  $.get("php/Checkmate/getMove.php", function(movement){
					  
					  if ( movement ) { // get move!
						  var move = movement.split("-");
						  
						  game.move({
							from: move[0],
							to: move[1],
							promotion: 'q' // NOTE: always promote to a queen for example simplicity
						  });
						  board.move(move[0]+'-'+move[1]);
						  
						  draggable = true;
						  clearInterval(interval);
						  updateStatus();
					  }
					  
				  });
				  
			  }, 1500);
		  }, 3000);
	  });
  }
  
  updateStatus();
};




////////////////////////////////////////////////////////////////////////////////


var onMouseoverSquare = function(square, piece) {
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  greySquare(square);

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

var onMouseoutSquare = function(square, piece) {
  removeGreySquares();
};



var onSnapEnd = function() {
  board.position(game.fen());
};



var updateStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  statusEl.html(status);
  fenEl.html(game.fen());
  pgnEl.html(game.pgn());
};



var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
};

board = new ChessBoard('board', cfg);


updateStatus();
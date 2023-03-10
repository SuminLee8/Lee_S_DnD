// select your elements first - what is the user going to interact with?
// there are the targets => these are what the "user" uses
// this is a 1 to 1 connection to an element in the DOM
// let navButton = document.querySelector("#navButton");

// this is a 1 to many connection to elements in the DOM
// the variable name is the "basket"
let navButtons = document.querySelectorAll('#buttonHolder img'),
	theHeadline = document.querySelector('#headLine h1'),
	// collect ALL of the draggable pieces in the drag zone
	puzzlePieces = document.querySelectorAll('.puzzle-pieces img'),
	// collect ALL of the drop zone elements
	dropZones = document.querySelectorAll('.drop-zone'),
	puzzleBoard = document.querySelector('.puzzle-board'),
	tempLink = document.querySelector('a'),
	// set up a global variable to store a reference to the dragged piece
	// i need to know this later when i drop it on a zone
	draggedPiece;

// functions go in the middle
// these are the "actions" that should happen
function changeBGImage() {	
	// change the background image in the drop zone
	// the `${}` is called a JavaScript Template String - whatever is inside the curly
	// braces is evaluated at runtime and interpolated (replaces the bracket notation)
	let newBGPath = "images/backGround" + this.id + ".jpg";
	// you can use variables, functions, etc inline in your code this way
	puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`;
}

function handleStartDrag() { 
	console. log('started draggin a piece!',this);
	// store the element I am currently dragging in that global draggedPiece variable
	draggedPiece = this;
}

function handleDragOver(e) { 
	e.preventDefault(); 
	console.log('dropped over me!');
}

function handleDrop(e) {
	// block the default behaviour 
	e.preventDefault();
	// and then do whatever you want.
	console.log('dropped on me!');
	// e.target.appendChild(draggedPiece);

	//bug fix #1 here
	//should only be one piece into drop zone
	if(this.children.length>0) return;
	this.appendChild(draggedPiece);
}


//bug fix #2 here 
//should be removed back to the drag zone as well, so that the player has a fresh board to drop onto
function newPuzzle() {
	// Remove all children from the drop zones and move them back to the puzzle piece section
	dropZones.forEach(zone => {
	while (zone.children.length > 0) {
	puzzleBoard.appendChild(zone.children[0]);
	}
	});


// function changeBGImage() { 
// 	resetBoard();
// 	puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`;
// }

	const selectedButton = document.querySelector('.selected');
	if (selectedButton) {
	puzzleBoard.style.backgroundImage = `url(images/backGround${this})`;
	}

	const puzzlePieceContainer = document.querySelector('.puzzle-pieces');
	puzzlePieceContainer.innerHTML = '';
	puzzlePieces.forEach(piece => {
	puzzlePieceContainer.appendChild(piece);
	});

	shufflePieces();

}
// event handling at the bottom -> how things react when you use the targets
// how is the user going to interact with the elements / controls you provide?

// 1 to 1 event handling (1 variable, one element):
// navButton.addEventListener('click', changeBGImage);

// 1 to many event handling (1 variable, many elements):
// process a collection of elements and add an event handler to each
navButtons.forEach(button => button.addEventListener('click', changeBGImage));
// add the drag start handler to all of the puzzle pieces
puzzlePieces.forEach(piece => piece.addEventListener('dragstart', handleStartDrag));
// add the dragover handling to the drop zones
dropZones.forEach(zone => zone.addEventListener('dragover', handleDragOver));
dropZones.forEach(zone => zone.addEventListener('drop', handleDrop));

function blockDefaultBehaviour(e) { // e is shorthand for event -> in this case the nav event
	// don't let the default behaviour of certain elements happen - block it
	e.preventDefault();
}

// temp handling
tempLink.addEventListener('click', blockDefaultBehaviour);

const buttonHolder = document.querySelector('#buttonHolder');
buttonHolder.addEventListener('click', newPuzzle);
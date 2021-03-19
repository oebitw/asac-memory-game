' use strict ';

//////////////////////////////////////////////////////////
///// CREATE SPLASH SCREEN (Start Game and User Name) ///
////////////////////////////////////////////////////////

document.querySelector( '.control-buttons span' ).onclick=function(){
  let userName = prompt( 'What is Your Name?' );
  if ( userName===null || userName==='' ){
    document.querySelector( '.name span' ).textContent='USER';
  } else {
    document.querySelector( '.name span' ).textContent= userName;
  }

  document.querySelector( '.control-buttons' ).remove();
};

////////////////////////////////////
///// CREATE The Main Variables ///
//////////////////////////////////

// the cards will flip back after this duration
let duration = 1000;

// getting the parent div that contains all the cards
let blocksContainer = document.querySelector( '.memory-game-blocks' );

// create an array contains all the cards inside the parent div
let blocks = Array.from( blocksContainer.children );


///////////////////////////
///// Card Shuffling /////
/////////////////////////

//***Create array contains the index number for each card or block ***//

let orderRange = Array.from( Array( blocks.length ).keys() );
shuffle( orderRange );



//***** Add ORDER CSS PROPERTY to the blocks or cards the ORDER CSS PROPERTY VALUE will equal orderRange *****//


blocks.forEach( ( block, index )=>{


  block.style.order=orderRange[index];

  // Add click event on the blocks , ( when the user click on the block or card it will flip)

  block.addEventListener( 'click', function(){
    flipBlock( block );
  } );
} );

// ***** CREATE the shuffle function to shuffle the orderRange which is the value of ORDER CSS PROPERTY ****//

function shuffle( array ){

  // Setting Variables

  let current = array.length; // this array equals the orangeRange.length
  let temp;
  let random;

  while( current>0 ){

    // Get Random Number

    random= Math.floor( Math.random() * current );


    // Decrease current array by one

    current --;

    // [1] Save current Element in Stash

    temp = array[current];


    // [2] The current Element (orderRange) = random

    array[current]=array[random];


    // [3] The random element = element from stash (temp in step 1)

    array[random]= temp;
  }

  return array;

}

//////////////////////////////////
///// Flip Block  Function  /////
////////////////////////////////

function flipBlock( selectedBlock ){


  // Add is-flipped class to the selected block

  selectedBlock.classList.add( 'is-flipped' );

  // Collect the flipped blocks so we can match them if they are identical

  let allFlippedBlocks = blocks.filter( flippedBlock => flippedBlock.classList.contains( 'is-flipped' ) );

  // Prevent user to flip more than 2 blocks using pointer event and check if the flipped blocks are identical

  if( allFlippedBlocks.length === 2 ){

    // Stop Clicking Function

    stopClicking();


    // Check matched blocks function

    checkMatchedBlocks( allFlippedBlocks[0], allFlippedBlocks[1] );

  }

}

//////////////////////////////////
///// Stop Clicking  Function  //
////////////////////////////////

function stopClicking(){

  // Add no clicking class on the main container (memory-game-blocks === blocksContainer)

  blocksContainer.classList.add( 'no-clicking' );


  // Remove no clicking class after 1 second
  setTimeout( () => {

    blocksContainer.classList.remove( 'no-clicking' );

  }, duration );

}

///////////////////////////////////////
///// Check Matched blocks Function //
/////////////////////////////////////

function checkMatchedBlocks( firstBlock, secondBlock ){

  let attemptsElement = document.querySelector( '.tries span' );

  if ( firstBlock.dataset.technology === secondBlock.dataset.technology ){

    firstBlock.classList.remove( 'is-flipped' );
    secondBlock.classList.remove( 'is-flipped' );

    firstBlock.classList.add( 'matched' );
    secondBlock.classList.add( 'matched' );

    document.getElementById( 'success' ).play();


  } else{
    attemptsElement.innerHTML = parseInt( attemptsElement.innerHTML )+1;

    setTimeout( ()=>{
      firstBlock.classList.remove( 'is-flipped' );
      secondBlock.classList.remove( 'is-flipped' );
    }, duration );
    document.getElementById( 'fail' ).play();
  }
}

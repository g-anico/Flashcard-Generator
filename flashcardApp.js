var SimpleCard = require("./BasicCard");
var Cloze = require ("./ClozeCard");
var inquirer = require ("inquirer");
var fs = require ("fs");
var cardArray = [];

// ==========================================

function flashcards (){
  inquirer.prompt([
  {
    type: 'list',
    name: 'userType',
    message: 'What would you like to do?',
    choices: ['create-basic', 'create-cloze', 'quit']
  }
])
.then(function(choice){
  if(choice.userType === 'create-basic') {

      // Hard to know what `basicPrompt` is here. See my notes below
     createCards(basicPrompt,'log.txt');

  } else if (choice.userType === 'create-cloze') {

    // Same with `clozePrompt` here. See my notes below
    createCards(clozePrompt, 'cloze-log.txt');

  } else if (choice.userType === 'quit') {

    console.log('Bye! Thanks for playing!');
  }
});
}

function createCards(promptType, logFile){
  inquirer.prompt(promptType).then(function(answers) {
    cardArray.push(answers);

    // hard to know what `makeCard` here is w/out prior knowledge of the prompts
    if (answers.makeCard) {
      createCards(promptType, logFile);
    } else {
      writeToLog(logFile, JSON.stringify(cardArray));
      flashcards();
    }
  });
};

function writeToLog(logFile, info){

  // FFR, you can save JSON directory to a `*.json` file instead of a `*.txt` file
  fs.writeFile(logFile, info, function(err){
    if(err){
      console.error(err);
    }
  });
};

// I would move these off to a seperate module and import them at the top of the file so 
// other developers know what they're dealing with in the `flashcards` function above.
// Cuts down on individual file size and make each file easier to understand.
var basicPrompt = [
{
  name: 'front',
  message: 'Enter front of card: '
},
{
  name: 'back',
  message: 'Enter back of card: '
},
{
  type: 'confirm',
  name: 'makeCard',
  message: 'Do you want to create another card (hit enter for YES)?',
  default: true
}]

// I would move these off to a seperate module and import them at the top of the file so 
// other developers know what they're dealing with in the `flashcards` function above
var clozePrompt = [{
  name: 'text',
  message: "Enter a full sentence: "
},
{
  name: 'cloze',
  message: "Enter cloze word or key words: "
},
{
  type: 'confirm',
  name: 'makeCard',
  message: "Do you want to create another card (enter for YES)?",
  default: true
}]

var makeCard = {
  type: 'confirm',
  name: 'makeCard',
  message: "Do you want to create another card (hit enter for YES)?",
  default: true
}
flashcards();

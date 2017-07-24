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

     createCards(basicPrompt,'log.txt');

  } else if (choice.userType === 'create-cloze') {

    createCards(clozePrompt, 'cloze-log.txt');

  } else if (choice.userType === 'quit') {

    console.log('Bye! Thanks for playing!');
  }
});
}

function createCards(promptType, logFile){
  inquirer.prompt(promptType).then(function(answers) {
    cardArray.push(answers);

    if (answers.makeCard) {
      createCards(promptType, logFile);
    } else {
      writeToLog(logFile, JSON.stringify(cardArray));
      flashcards();
    }
  });
};

function writeToLog(logFile, info){

  fs.writeFile(logFile, info, function(err){
    if(err){
      console.error(err);
    }
  });
};

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

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
    readCards('log.txt');
    createCards(basicPrompt,'log.txt');
  } else if (choice.userType === 'create-cloze') {
    readCards('cloze-log.txt');
    createCards(clozePrompt, 'cloze-log.txt');
  } else if (choice.userType === 'quit') {
    console.log('Bye! Thanks for playing!');
  }
});
}
// ===========================================
function readCards(logFile){
  cardArray = [];

  //grab created cards and saves them to an array
  fs.readFile(logFile, 'utf8', function(err, data){

    var data = JSON.parse(data);
    for (var i = 0; i < data.length; i++) {
      cardArray.push(data[i]);
    }
  });
};

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
// ====checked up to this point

function writeToLog(logFile, info){

  fs.writeFile(logFile, info, function(err){
    if(err){
      console.error(err);
    }
  });
};
// =========checked up to this point======================

// function createBasic(){
//   inquirer.prompt([
//     {
//       name: 'front',
//       message: "Enter front of card: "
//     },
//     {
//       name: 'back',
//       message: "Enter back of card: "
//     }
//   ])
//   .then(function(answers){
//     var card = new SimpleCard(answers.front, answers.back);
//     appendToLog(answers.front);
//     appendToLog(answers.back + "\n");
//     createAnotherCard();
//   });
// };
//
// function createCloze(){
//   inquirer.prompt([
//     {
//       name: 'front',
//       message:
//     }
//   ])
// }
//
// function appendToLog(info) {
//   var logTxt = 'log.txt';
//     fs.appendFile(logTxt, info, function(err){
//       if(err){
//         console.error(err);
//       }
//     });
// }

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
  message: "Enter a sentence and put the word you want to hide in parentheses, like so: 'Haters gonna (hate)'",
  validate: function(value) {
    var parentheses = /\(\w.+\)/;
    if (value.search(parentheses) > -1) {
      return true;
  }
    return "Please put a word in parentheses in your sentence"
}
}, {
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
// =================================

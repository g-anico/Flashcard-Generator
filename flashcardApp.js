var SimpleCard = require("./BasicCard");
var Cloze = require ("./Cloze");
var inquirer = require ("inquirer");
var fs = require ("fs");

var cardArray = [];

// ===============main process=============

function flashcards (){
  inquirer.prompt([{
    type: 'list',
    name: 'userType',
    message: 'What would you like to do?',
    choices ['create-basic', 'create-cloze', ]
  }

])
.then(function(choice){
  if(choice.userType === 'create-basic') {
    readCards('log.txt');
    createCards()
  }
})
}
var basicPrompt = [{
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
  message: 'Create another hard (hit enter for YES)?',
  default: true
}]

var clozePrompt = [{
  name: 'text',
  message: "Enter a sentence, and put the word you want to hide in parentheses, like so: 'Haters gonna (hate)'",
  validate: function(value){
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
// =================functions=================

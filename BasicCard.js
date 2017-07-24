//constructor function for the basic flashcard takes in two arguments
var Simple = function (front, back) {
  this.front = front;
  this.back = back;
}

Simple.prototype.showCard = function(){
  console.log('Front: ' + this.front + ', ' + 'Back: ' + this.back);

};
//prints question
Simple.prototype.showFront = function(){
  console.log(this.front);
}

Simple.prototype.showBack = function(){
  console.log(this.back);
}
// var card = new Simple ('What is the color of polar bear skin underneath its fur?', 'black');
// var card2 = new Simple('The breed of dog featured in the movie, Beethoven is', 'Saint Bernard');
module.exports = Simple;

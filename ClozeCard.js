//the constructor accepts two arguments: text and cloze
var Cloze = function (text, cloze) {
  this.partial = partial;
  this.cloze = cloze;

  // I would still keep these on the prototype
  this.printCloze = function(){
    console.log(this.cloze);
  }

  // I would still keep these on the prototype  
  this.printPartial = function(){
    console.log(this.partial);
  }

}

Cloze.prototype.printFull = function(){
    console.log(this.partial.replace('[cloze]', this.cloze));
}

// var animal = new Cloze ("The most poisonous animal in the world is the [cloze]", "dart frog");
// var flashcloze2 = new Cloze ("My favorite kind of sneakers are [cloze]", "Saucony");
module.exports = Cloze;

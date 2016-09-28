var counter = 0;

var requestComplete = function() {  //writing our callback function
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  var country = countries[Math.floor(Math.random() * countries.length)];
  var country2 = countries[Math.floor(Math.random() * countries.length)];
  var country3 = countries[Math.floor(Math.random() * countries.length)];
  var savedScore = localStorage.getItem("score");
  createUI(country);
  createButton('#button1', country, country);
  createButton('#button2', country2, country);
  createButton('#button3', country3, country);
  shuffleButtons();
  var savedScore = JSON.parse(localStorage.getItem("score", counter))
  if (savedScore) {
    counter = savedScore;
  }
  createScore(counter);
  createNextButton();
}

var createUI = function(country) {
    var text = document.querySelector('#country-name');
    text.innerText = country.name;
    return text;
}

var createButton = function(id, countryButton, countryAnswer) {
  var button = document.querySelector(id);
      button.innerText = countryButton.capital;
      button.onclick = function() {
        var answer = document.querySelector('#answer');
        if(this.innerText === countryAnswer.capital) {
        answer.innerText = "CORRECT!! The answer is... " + countryAnswer.capital;
        answer.style.visibility = "visible";
        counter++;
        createScore(counter);
        localStorage.setItem("score", counter);
      }else {
        answer.innerText = "OOPS! The answer is actually... " + countryAnswer.capital;
        answer.style.visiblity = "visible";
      }
    }
}

var shuffleButtons = function() {
 var parent = document.getElementById("shuffle");
 var buttons = parent.children;
 var frag = document.createDocumentFragment();
 while (buttons.length) {
     frag.appendChild(buttons[Math.floor(Math.random() * buttons.length)]);
 }
 parent.appendChild(frag);
}

var createNextButton = function() {
  var button = document.querySelector('#next-button');
  button.onclick = function() {
    window.location.reload();
  }
}

var createScore = function(counter) {
  var score = document.querySelector('#score');
  score.innerText = "You current score is " + counter;
  localStorage.setItem("score", counter);
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();  
  request.open("GET", url); //set what kind of request we want to get
  request.onload = callback; //set callback we want once request is completed
  request.send(); //send it
}


var app = function(){
  var url = "http://localhost:5000";
  makeRequest(url, requestComplete); //passing url to our function
}

window.onload = app;
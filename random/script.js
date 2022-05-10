"use strict";

var random_button = document.querySelector(".random");
var img = document.querySelector(".rickPic");
var nom = document.querySelector(".nom");
var alive = document.querySelector(".status");
var origin = document.querySelector(".origin");

random_button.addEventListener("click", function () {
  var id = Math.floor(Math.random() * 825);
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.json())
    .then((data) => (img.src = data.image));

  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.json())
    .then((data) => (nom.textContent = data.name));

  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.json())
    .then((data) =>
      data.status == "Alive"
        ? (alive.textContent = `${data.status}✔ - ${data.species} - ${data.type}`)
        : (alive.textContent = `${data.status}❌ - ${data.species} - ${data.type}`)
    );

  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.json())
    .then((data) => (origin.textContent = data.origin.name));
});
// fetch();

"use strict";

const input = document.querySelector(".input");
const card_container = document.querySelector(".card-container");
const button = document.querySelector(".btn");

function get_characters(e) {
  e.preventDefault();
  const wanted = input.value;
  card_container.innerHTML = "";
  input.textContent = "";
  fetch("https://rickandmortyapi.com/api/character/?name=" + wanted)
    .then((res) => res.json())
    .then((data) => show_characters(data.results));
}

function show_characters(data) {
  data.forEach((card) => {
    const { name, status, origin, species, image, gender } = card;
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerHTML = `
    <div style="width: 18rem">
        <img
          src="${image}"
          class="card-img-top"
          alt="${name}"
        />
        <div class="card-body">
          <h3>${name}</h3>
          <p class="card-text">${species} - ${origin.name}</p>
          <p class="card-text newcard">${status}💣</p>
          
          <p class="card-text">${gender}</p>
        </div>
    </div>
    `;

    card_container.appendChild(cardEl);
  });
}

button.addEventListener("click", get_characters);

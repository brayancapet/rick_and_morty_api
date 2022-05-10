"use strict";

const input = document.querySelector(".input");
const card_container = document.querySelector(".card-container");
const button = document.querySelector(".btn");
const button_container = document.querySelector(".button-container");
let page = 1;

function get_characters(e) {
  e.preventDefault();
  const wanted = input.value;
  card_container.innerHTML = "";
  input.textContent = "";
  fetch("https://rickandmortyapi.com/api/character/" + "?name=" + wanted)
    .then((res) => res.json())
    .then((data) => show_characters(data.results, data.info));
}

function show_characters(results, info) {
  card_container.innerHTML = "";
  results.forEach((card) => {
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
          <p class="card-text">${species} - (${origin.name})</p>
          <p class="card-text newcard">Status : ${status}💣</p>
          
          <p class="card-text">${gender}</p>
        </div>
    </div>
    `;
    card_container.appendChild(cardEl);
  });

  let btn_prev = document.createElement("button");
  btn_prev.type = "button";
  btn_prev.classList.add("btn", "btn-success");
  btn_prev.textContent = "PREVIOUS";
  btn_prev.addEventListener("click", function () {
    fetch(info.prev)
      .then((res) => res.json())
      .then((data) => show_characters(data.results, data.info));
  });

  button_container.innerHTML = "";
  let btn_next = document.createElement("button");
  btn_next.type = "button";
  btn_next.classList.add("btn", "btn-success");
  btn_next.textContent = "NEXT";
  button_container.appendChild(btn_prev);
  button_container.appendChild(btn_next);

  btn_next.addEventListener("click", function () {
    fetch(info.next)
      .then((res) => res.json())
      .then((data) => show_characters(data.results, data.info));
  });

  if (info.prev == null) {
    btn_prev.remove();
  } else if (info.next == null) {
    btn_next.remove();
  } else if (info.prev == null && info.next == null) {
    btn_prev.remove();
    btn_next.remove();
  }
}
button.addEventListener("click", get_characters);

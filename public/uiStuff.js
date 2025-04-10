let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
const canvas = document.querySelector("#the-canvas");

const context = canvas.getContext("2d");

canvas.height = wHeight;
canvas.width = wWidth;

window.player = {};
window.orbs = [];
window.globalPlayers = [];

const loginModal = new bootstrap.Modal(document.querySelector("#loginModal"));
const spawnModal = new bootstrap.Modal(document.querySelector("#spawnModal"));

window.addEventListener("load", () => {
  loginModal.show();
});

document.querySelector(".name-form").addEventListener("submit", (e) => {
  e.preventDefault();
  player.name = document.querySelector("#name-input").value;
  document.querySelector(".player-name").innerHTML = player.name;
  loginModal.hide();
  spawnModal.show();
});

document.querySelector(".start-game").addEventListener("click", (e) => {
  spawnModal.hide();
  const elArray = Array.from(document.querySelectorAll(".hiddenOnStart"));
  elArray.forEach((el) => el.removeAttribute("hidden"));
  loginModal.hide();
  init();
});

document.querySelector(".btn-github").addEventListener("click", (e) => {
  window.location.href = `http://localhost:9000/auth/github`;
});

const params = new URLSearchParams(window.location.search);
const username = params.get("username");
if (username) {
  player.name = username;
  loginModal.hide();
  spawnModal.show();
}

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

const params = new URLSearchParams(window.location.search);
const username = params.get("username");

window.addEventListener("load", () => {
  if (!username) loginModal.show();
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
  window.location.href = "https://socketio-game-7agv.onrender.com/auth/github";
  loginModal.hide();
});

if (username) {
  player.name = username;
  document.querySelector(".player-name").innerHTML = username;
  loginModal.hide();
  spawnModal.show();
}

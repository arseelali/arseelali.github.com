const tac = document.querySelector("#tac");
const app = document.querySelector("#app");
const deny = document.querySelector("#deny");
const remember = document.querySelector("#remember");
const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const download = document.querySelector("#download");
const downloading = document.querySelector("#downloading");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("remember") === "true") {
    tac.classList.add("hidden");
    app.classList.remove("hidden");
  }
});

yes.addEventListener("click", () => {
  if (remember.checked) {
    localStorage.setItem("remember", "true");
  }
  tac.classList.add("hidden");
  app.classList.remove("hidden");
});

no.addEventListener("click", () => {
  tac.classList.add("hidden");
  deny.classList.remove("hidden");
});

download.addEventListener("click", () => {
  downloading.classList.remove("hidden");
  window.location.href =
    "./src/public/downloads/applications/software/ultrasurf/executeable/readonly/redist/UltraSurf.zip";
});

const tac = document.querySelector("#tac");
const app = document.querySelector("#app");
const deny = document.querySelector("#deny");
const remember = document.querySelector("#remember");
const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const downloadComment = document.querySelector("#downloadComment");
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
  let attempts = JSON.parse(localStorage.getItem("attempts")) || [];

  if (attempts.length >= 5) {
    alert("Maximum password attempts reached. Contact site owner to unlock.");
    return;
  }

  const b64ep = "OTAyMTA=";
  const b64eDownloadLink = "Li91LmV4ZQ==";

  var password = prompt(
    "Enter the password to download the file (Contact the site owner for the password)"
  );

  if (btoa(password) === b64ep) {
    window.location.href = atob(b64eDownloadLink);
    cl();
    downloadComment.classList.add("hidden");
    download.classList.add("hidden");
    downloading.classList.remove("hidden");
    setTimeout(() => {
      downloading.innerHTML = `If the download has not started yet, click <button class="buttonLink" onclick="window.location.href = atob('Li91LmV4ZQ==');">here</button>.`;
    }, 3000);
  } else if (password == null || password == "") {
    alert("No password entered. Try again.");
  } else {
    attempts.push(password);
    localStorage.setItem("attempts", JSON.stringify(attempts));
    alert(
      `Incorrect password. ${
        5 - attempts.length
      } attempt(s) left. Contact the site owner for the password.`
    );
  }
});

function getAttempts() {
  return JSON.parse(localStorage.getItem("attempts"));
}

function cl() {
  localStorage.clear();
  return "cleared";
}

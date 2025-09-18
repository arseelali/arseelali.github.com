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
  let attempts = JSON.parse(localStorage.getItem("attempts")) || [];

  if (attempts.length >= 5) {
    alert("Maximum password attempts reached. Contact site owner to unlock.");
    return;
  }

  const b64ep = "bW9vbmtuaWdodA==";
  const downloadLink = "./u.exe"

  var password = prompt(
    "Enter the password to download the file (Contact the site owner for the password)"
  );

  if (btoa(password) === b64ep) {
    window.location.href = downloadLink;
    cl();
    downloading.classList.remove("hidden");
    instructions.classList.remove("hidden");
  } else if (password == null || password == "") {
    alert("No password entered. Try again.");
  } else {
    attempts.push(password);
    localStorage.setItem("attempts", JSON.stringify(attempts));
    alert(`Incorrect password. ${5 - attempts.length} attempt(s) left. Contact the site owner for the password.`);
  }
});

function getAttempts() {
  return JSON.parse(localStorage.getItem("attempts"));
}

function cl() {
  localStorage.clear();
  return "cleared";
}



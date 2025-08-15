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
  let RAWv0x01 = localStorage.getItem("v0x01");
  let attempts = JSON.parse(localStorage.getItem("attempts")) || [];

  if (RAWv0x01 === null) {
    localStorage.setItem("v0x01", "0");
    RAWv0x01 = "0";
  }

  let v0x01 = parseInt(RAWv0x01);

  if (v0x01 > 4) {
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
    downloading.classList.remove("hidden");
    instructions.classList.remove("hidden");
  } else {
    v0x01 += 1;
    localStorage.setItem("v0x01", v0x01.toString());

    attempts.push(password);
    localStorage.setItem("attempts", JSON.stringify(attempts));
    alert("Incorrect password. Contact the site owner for the password.");
  }
});

function getAttempts() {
  return JSON.parse(localStorage.getItem("attempts"));
}

function cl() {
  localStorage.clear();
  return "Clear";
}



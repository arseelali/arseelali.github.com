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
  const b64ep = "bW9vbmtuaWdodA==";
  var password = prompt(
    "Enter the password to download the file (Contact the site owner for the password)"
  );
  if (btoa(password) === b64ep) {
    window.location.href =
      "./src/public/downloads/applications/software/ultrasurf/executeable/readonly/redist/extract-me.zip";
    downloading.classList.remove("hidden");
    instructions.classList.remove("hidden");
  } else {
    alert("Incorrect password. Contact the site owner for the password.");
  }
});

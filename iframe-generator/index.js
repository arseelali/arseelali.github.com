const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const form = document.querySelector("#genForm");
const result = document.querySelector("#result");
const link = document.querySelector("#link");
const resultContainer = document.querySelector("#resultContainer");
const copy = document.querySelector("#copy");

const db = supabase.createClient(
  "https://lybcuakcinaeepnpbard.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5YmN1YWtjaW5hZWVwbnBiYXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTc0MzYsImV4cCI6MjA0OTE3MzQzNn0.Qqumx1jo5zHsXfDjyV6fDvIcdiZ0CawcClxWh1q9x1o"
);

const prefix =
  '<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://www.youtube.com/embed/';
const suffix =
  '?rel=0" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"></iframe></div>';

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const videoId = link.value.split("v=")[1]?.slice(0, 11) || link.value.slice(-11);
  const embedCode = prefix + videoId + suffix;
  result.innerText = embedCode; 
  resultContainer.classList.remove("hidden");
});

copy.addEventListener("click", () => {
  const result = document.querySelector("#result");
  result.select();
  navigator.clipboard.writeText(result.value);
  copy.innerText = "Copied!";
})

if (localStorage.getItem("name") === null) {
  let name = prompt("Enter Your Name: ");
  while (name == "" || name == null) {
    name = prompt("Invalid Response. Enter Your Name: ");
  }

  localStorage.setItem("name", name);
  document.querySelector("#name").innerHTML = name;
  addName(name);
} else if (localStorage.getItem("name") !== null) {
  document.querySelector("#name").innerHTML = localStorage.getItem("name");
}

if (localStorage.getItem("remember") === "true") {
  document.querySelector("#tac").classList.add("hidden");
  document.querySelector("#app").classList.remove("hidden");
  document.querySelector("#welcome").classList.remove("hidden");
}

yes.addEventListener("click", function (event) {
  if (document.querySelector("#remember").checked) {
    document.querySelector("#tac").classList.add("hidden");
    document.querySelector("#app").classList.remove("hidden");
    document.querySelector("#welcome").classList.remove("hidden");
    localStorage.setItem("remember", "true");
  } else if (!document.querySelector("#remember").checked) {
    document.querySelector("#tac").classList.add("hidden");
    document.querySelector("#app").classList.remove("hidden");
    document.querySelector("#welcome").classList.remove("hidden");
  }
});

no.addEventListener("click", function (event) {
  document.querySelector("#tac").classList.add("hidden");
  document.querySelector("#denytac").classList.remove("hidden");
});

function changeName() {
  let name = prompt("Enter Your Name: ");
  localStorage.setItem("name", name);
  document.querySelector("#name").innerHTML = localStorage.getItem("name");
  addName(name);
}

function clearLocalStorage() {
  localStorage.clear();
  console.log("Reset complete");
}

async function addName(name) {
  const { data, error } = await db.from("names").insert([{ name }]);
  if (error) {
    console.error("Error adding name:", error);
  } else {
    console.log("Name added:", name, data);
  }
}

async function fetchNames(password) {
  if (password === encoderKey) {
    const { data, error } = await db.from("names").select("*");
    if (error) {
      console.error("Error fetching names:", error);
    } else {
      console.log("Fetched names:", data);
    }
  } else {
    console.log("Incorrect password passed into function. Try again.");
  }
}

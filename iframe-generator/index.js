const yes = document.querySelector("#yes");
const no = document.querySelector("#no");

const db = supabase.createClient(
  "https://lybcuakcinaeepnpbard.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5YmN1YWtjaW5hZWVwbnBiYXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTc0MzYsImV4cCI6MjA0OTE3MzQzNn0.Qqumx1jo5zHsXfDjyV6fDvIcdiZ0CawcClxWh1q9x1o"
);

console.log("Supabase ready:", supabase);

const prefix =
  '<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://www.youtube.com/embed/';
const suffix =
  '?rel=0" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"></iframe></div>';

if (localStorage.getItem("name") === null) {
  let name = prompt("Enter Your Name: ");
  while (name == "" || name == null) {
    name = prompt("Invalid Response. Enter Your Name: ");
  }

  localStorage.setItem("name", name);
  document.querySelector("#name").innerHTML = name;

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
}

async function addName(name) {
  const { data, error } = await db.from("names").insert([{ name }]);
  if (error) {
    console.error("Error adding name:", error);
  } else {
    console.log("Name added:", data);
  }
}

async function fetchNames() {
  const { data, error } = await db.from("names").select("*");
  if (error) {
    console.error("Error fetching names:", error);
  } else {
    console.log("Fetched names:", data);
  }
}
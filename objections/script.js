const toggleButton = document.getElementById("toggle-all");
const detailsElements = document.querySelectorAll("details");

let allOpen = false; 

toggleButton.addEventListener("click", () => {
  allOpen = !allOpen; 
  detailsElements.forEach((details) => (details.open = allOpen));
  toggleButton.textContent = allOpen ? "Close All" : "Open All";
});
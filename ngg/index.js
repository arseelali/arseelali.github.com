document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("fullName");
  const agreeBtn = document.getElementById("agreeBtn");
  const declineBtn = document.getElementById("declineBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const msg = document.getElementById("msg");

  function showMessage(text, type = "ok") {
    msg.textContent = text;
    msg.className = "message " + (type === "err" ? "err" : "ok");
    msg.style.display = "block";
  }

  function clearMessage() {
    msg.style.display = "none";
  }

  agreeBtn.addEventListener("click", () => {
    clearMessage();
    const name = nameEl.value.trim();
    if (!name || name.length < 2) {
      showMessage("Please type your full name as your e-signature.", "err");
      nameEl.focus();
      return;
    }

    // Submit to Google Form
    document.getElementById("consentForm").submit();

    agreeBtn.disabled = true;
    agreeBtn.textContent = "Recorded ✓";
    showMessage("Signature recorded successfully!", "ok");

    // Show download button
    downloadBtn.style.display = "inline-block";
    downloadBtn.onclick = () => {
      window.location.href = "./downloads/NoGoGuardian.py";
    };
  });

  declineBtn.addEventListener("click", () => {
    clearMessage();
    nameEl.value = "";
    downloadBtn.style.display = "none";
    showMessage("You declined the Terms. Do not download the App.", "err");
  });
});


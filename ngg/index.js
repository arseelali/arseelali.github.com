document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("fullName");
  const agreeBtn = document.getElementById("agreeBtn");
  const declineBtn = document.getElementById("declineBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const msg = document.getElementById("msg");

  const SERVER_URL = "https://aliarseel1.pythonanywhere.com/web-auth";
  const PASSWORD = "123";

  function showMessage(text, type = "ok") {
    msg.textContent = text;
    msg.className = "message " + (type === "err" ? "err" : "ok");
    msg.style.display = "block";
  }

  function clearMessage() {
    msg.style.display = "none";
  }

  async function getDownloadUrl() {
    try {
        const response = await fetch(`${SERVER_URL}?password=${PASSWORD}`);
        const data = await response.json();

        if (response.ok && data.url) {
            const decodedUrl = atob(data.url);
            return decodedUrl;
        } else {
            showMessage("Authentication failed", "err");
            return null;
        }
    } catch (error) {
        showMessage("Error connecting to server:" + error.message, "err");
        return null;
    }
  }

  agreeBtn.addEventListener("click", async () => {
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
    downloadBtn.onclick = async () => {
      showMessage("Authenticating...", "ok");
      const url = await getDownloadUrl();
      if (url) {
        showMessage("Download authorized! Redirecting...", "ok");
        setTimeout(() => {
          window.location.href = url;
        }, 500);
      }
    };
  });

  declineBtn.addEventListener("click", () => {
    clearMessage();
    nameEl.value = "";
    downloadBtn.style.display = "none";
    showMessage("You declined the Terms. Do not download the App.", "err");
  });
});



const API_URL = "https://tc-identity-api.onrender.com/verify";  // backend URL

const btnOffline = document.getElementById("btnOffline");
const btnOnline = document.getElementById("btnOnline");
const onlineFields = document.getElementById("onlineFields");
const resultBox = document.getElementById("resultBox");

btnOffline.onclick = () => {
  btnOffline.classList.add("active");
  btnOnline.classList.remove("active");
  onlineFields.style.display = "none";
};

btnOnline.onclick = () => {
  btnOnline.classList.add("active");
  btnOffline.classList.remove("active");
  onlineFields.style.display = "block";
};

document.getElementById("btnVerify").onclick = async () => {
  const tckn = document.getElementById("tckn").value.trim();
  const mode = btnOnline.classList.contains("active") ? "online" : "offline";

  const payload = { tckn, mode };

  if (mode === "online") {
    payload.firstName = document.getElementById("firstName").value.trim();
    payload.lastName = document.getElementById("lastName").value.trim();
    payload.birthYear = document.getElementById("birthYear").value.trim();
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    resultBox.style.display = "block";

    if (!data.success) {
      resultBox.className = "result error";
      resultBox.textContent = data.message || "Error occurred.";
      return;
    }

    resultBox.className = "result success";
    resultBox.textContent = data.message;

  } catch (err) {
    console.error(err);
    resultBox.style.display = "block";
    resultBox.className = "result error";
    resultBox.textContent = "Cannot reach server.";
  }
};

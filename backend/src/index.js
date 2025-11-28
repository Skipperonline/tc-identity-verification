require("dotenv").config();
const express = require("express");
const { isValidTCKN } = require("./offline");
const { verifyWithMernis } = require("./mernis");

const app = express();
app.use(express.json());

// Basic CORS to allow GitHub Pages frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.post("/verify", async (req, res) => {
  try {
    const { tckn, firstName, lastName, birthYear, mode } = req.body;

    const offlineValid = isValidTCKN(tckn);
    if (!offlineValid) {
      return res.json({
        success: true,
        mode: mode || "offline",
        offlineValid: false,
        onlineValid: null,
        message: "Invalid T.C. identity number (algorithm failure)."
      });
    }

    if (!mode || mode === "offline") {
      return res.json({
        success: true,
        mode: "offline",
        offlineValid: true,
        onlineValid: null,
        message: "Identity number is algorithmically valid."
      });
    }

    if (mode === "online") {
      if (!firstName || !lastName || !/^[0-9]{4}$/.test(String(birthYear))) {
        return res.status(400).json({
          success: false,
          message: "Online mode requires firstName, lastName, and 4-digit birthYear."
        });
      }

      const onlineValid = await verifyWithMernis({
        tckn,
        firstName,
        lastName,
        birthYear
      });

      return res.json({
        success: true,
        mode: "online",
        offlineValid: true,
        onlineValid,
        message: onlineValid
          ? "Online verification successful."
          : "Online verification failed or not implemented."
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid mode. Use 'offline' or 'online'."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error."
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

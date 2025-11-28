# T.C. Identity Number Verification System

This repository contains a complete verification system for T.C. (Turkish Republic) Identity Numbers.  
It provides both:

- **Offline algorithm-based validation** (Luhn-style checksum checks)
- **A backend structure for optional online verification** (e.g., official service integrations)

The project includes a frontend built with HTML/JS (GitHub Pages friendly) and a backend built with Node.js (Express).

---

## 📁 Project Structure

```
tc-identity-verification/
├── backend/ → Node.js API (Express)
└── frontend/ → HTML/JS interface (GitHub Pages)
```

---

## 🚀 Features

- ✔ Offline T.C. Identity Number validation using checksum rules  
- ✔ Clean and responsive web interface  
- ✔ `/verify` backend API for offline & online modes  
- ✔ Ready structure for integrating official verification services  
- ✔ Full open-source and developer-friendly  
- ✔ GitHub Pages support  

---

## 🔧 Backend API (Node.js / Express)

### Endpoint  
`POST /verify`

### Request Body
```json
{
  "tckn": "12345678901",
  "firstName": "John",
  "lastName": "Doe",
  "birthYear": "1990",
  "mode": "offline"
}
```

## Response Example

```json
{
  "success": true,
  "mode": "offline",
  "offlineValid": true,
  "onlineValid": null,
  "message": "Identity number is algorithmically valid."
}
```

## Running the backend

```bash
cd backend
npm install
npm start
```

## 🌐 Frontend (GitHub Pages)
The frontend is located in:
```bash
/frontend/index.html
```
You can deploy it using GitHub Pages:

- Go to repository → Settings
- Pages
- Set the source to `/frontend` folder
- Done

The frontend communicates with the backend using the `API_URL` defined in `script.js`.

## 📄 License
This project is licensed under the MIT License, allowing commercial and personal use.

## 🤝 Contributing
Pull requests and feature requests are welcome.
Please open an issue before making major changes.

## ⭐ Support the Project
If this project helps you, consider giving it a ⭐ on GitHub!

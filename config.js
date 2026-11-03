// ====== Configuration du frontend ======
// C'est le SEUL fichier à modifier pour changer l'adresse du backend.
//
// En local (Live Server) : le backend est sur http://localhost:3000
// En ligne (GitHub Pages) : remplacez l'adresse ci-dessous par celle de votre service Render
const ADRESSE_RENDER = "https://exampro-backend-c3r4.onrender.com";
const estEnLocal =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1";

const URL_SERVEUR_BASE = estEnLocal ? "http://localhost:3000" : ADRESSE_RENDER;
const URL_API = URL_SERVEUR_BASE + "/api";

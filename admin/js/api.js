// ====== Communication avec le serveur (backend) ======
// L'adresse du serveur (URL_API) vient du fichier config.js à la racine du site

// Envoie une requête au serveur et renvoie la réponse en objet JavaScript.
// "async/await" permet d'attendre la réponse sans bloquer la page.
async function appeler(chemin, options = {}) {
    const jeton = sessionStorage.getItem("jeton");
    const entetes = { "Content-Type": "application/json" };

    // Si l'utilisateur est connecté, on envoie son jeton d'identification
    if (jeton) {
        entetes.Authorization = `Bearer ${jeton}`;
    }

    const reponse = await fetch(URL_API + chemin, { ...options, headers: entetes });
    const donnees = await reponse.json();

    // Jeton expiré : on renvoie l'utilisateur vers la connexion
    if (reponse.status === 401 && jeton) {
        sessionStorage.clear();
        window.location.href = "connexion.html";
    }

    if (!reponse.ok) {
        throw new Error(donnees.message || "Une erreur est survenue.");
    }

    return donnees;
}

// ====== Communication avec le serveur (backend) ======
// L'adresse du serveur (URL_API) vient du fichier config.js à la racine du site

// Envoie une requête au serveur et renvoie la réponse en objet JavaScript.
// "async/await" permet d'attendre la réponse sans bloquer la page.
async function appeler(chemin, options = {}) {
    const jeton = sessionStorage.getItem("jeton");
    const entetes = { "Content-Type": "application/json" };

    // Si l'étudiant est connecté, on envoie son jeton d'identification
    if (jeton) {
        entetes.Authorization = `Bearer ${jeton}`;
    }

    let reponse;
    try {
        reponse = await fetch(URL_API + chemin, { ...options, headers: entetes });
    } catch (erreur) {
        // fetch échoue seulement si le serveur est éteint ou inaccessible
        throw new Error("Serveur injoignable. S'il vient de se réveiller, patientez environ une minute puis réessayez.");
    }

    // Si la réponse n'est pas du JSON, on continue avec un objet vide
    let donnees = {};
    try {
        donnees = await reponse.json();
    } catch (erreur) {
        donnees = {};
    }

    // Jeton expiré : on renvoie l'étudiant vers la connexion
    if (reponse.status === 401 && jeton) {
        sessionStorage.clear();
        window.location.href = "connexion.html";
    }

    if (!reponse.ok) {
        const erreur = new Error(donnees.message || "Une erreur est survenue.");
        erreur.statut = reponse.status; // permet de réagir selon le code (403, 409...)
        throw erreur;
    }

    return donnees;
}

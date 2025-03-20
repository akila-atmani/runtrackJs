// Variables globales pour gérer les utilisateurs et les demandes
let requests = [];
let users = [];

// Fonction pour afficher les demandes de présence
function renderRequests() {
    const requestsList = document.getElementById("requests-list");
    requestsList.innerHTML = ''; // Reset the list
    requests.forEach((request, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${request.name} - ${request.date} 
            <button class="btn btn-success btn-sm" onclick="acceptRequest(${index})">Accepter</button>
            <button class="btn btn-danger btn-sm" onclick="rejectRequest(${index})">Refuser</button>`;
        requestsList.appendChild(li);
    });
}

// Fonction pour afficher les utilisateurs
function renderUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = ''; // Reset the list
    users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `${user.email}`;
        userList.appendChild(li);
    });
}

// Ajouter une demande de présence
document.getElementById("submit-request").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const date = document.getElementById("presence-date").value;
    if (name && date) {
        requests.push({ name, date });
        renderRequests();
        alert("Demande envoyée !");
    } else {
        alert("Veuillez compléter les champs.");
    }
});

// Accepter une demande
function acceptRequest(index) {
    requests[index].status = 'accepted';
    renderRequests();
    alert("Demande acceptée.");
}

// Refuser une demande
function rejectRequest(index) {
    requests[index].status = 'rejected';
    renderRequests();
    alert("Demande refusée.");
}

// Ajouter un utilisateur
document.getElementById("add-user").addEventListener("click", function() {
    const email = document.getElementById("new-email").value;
    if (email) {
        users.push({ email });
        renderUsers();
        alert("Utilisateur ajouté !");
    } else {
        alert("Veuillez entrer un email.");
    }
});

// Fonction de vérification du domaine pour l'inscription et la connexion
function validateDomain(email) {
    return email.endsWith('@laplateforme.io');
}

// Inscription
document.getElementById("register-button").addEventListener("click", function() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    if (validateDomain(email)) {
        alert("Inscription réussie !");
        // Ajouter l'utilisateur à la liste (on ne gère pas réellement la sécurité ici)
        users.push({ email, password });
        renderUsers();
    } else {
        alert("L'email doit être un email de @laplateforme.io.");
    }
});

// Connexion
document.getElementById("login-button").addEventListener("click", function() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    if (validateDomain(email)) {
        alert("Connexion réussie !");
        // Ici, normalement, on aurait une logique de vérification des identifiants.
    } else {
        alert("L'email doit être un email de @laplateforme.io.");
    }
});

// Initialisation : afficher les listes vides au départ
renderRequests();
renderUsers();


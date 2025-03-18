async function updateTable() {
    try {
        const response = await fetch('utilisateur.json');
        const users = await response.json();

        // Sélection le tableau
        const tableBody = document.querySelector('#userTable tbody');

        // Vider le tableau avant de le remplir du coup pas de repittition 
        tableBody.innerHTML = '';

        // Boucle pour ajouter chaque utilisateur au tableau
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nom}</td>
                <td>${user.prenom}</td>
                <td>${user.email}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
    }
}

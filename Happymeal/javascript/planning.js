document.addEventListener("DOMContentLoaded", function() {
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const planningBody = document.getElementById("planning-body");
    let planning = JSON.parse(localStorage.getItem("planning")) || {};
  
    // Fonction pour créer une ligne de planning pour un jour donné
    function creerLigne(jour, recettes) {
      const row = document.createElement("tr");
  
      // Cellule pour le jour
      const cellJour = document.createElement("td");
      cellJour.textContent = jour;
      row.appendChild(cellJour);
  
      // Pour chaque période : Matin, Midi, Soir
      ["Matin", "Midi", "Soir"].forEach(period => {
        const cell = document.createElement("td");
        const select = document.createElement("select");
        select.classList.add("meal-select");
  
        // Option par défaut
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "-- Choisir --";
        select.appendChild(defaultOption);
  
        // Ajouter les options à partir des recettes
        recettes.forEach(plat => {
          const option = document.createElement("option");
          option.value = plat.nom;
          option.textContent = plat.nom;
          select.appendChild(option);
        });
  
        // Charger le choix enregistré (si présent)
        if (planning[jour] && planning[jour][period]) {
          select.value = planning[jour][period];
        }
  
        // Enregistrer le choix lors d'un changement
        select.addEventListener("change", function() {
          if (!planning[jour]) {
            planning[jour] = {};
          }
          planning[jour][period] = this.value;
          localStorage.setItem("planning", JSON.stringify(planning));
        });
  
        cell.appendChild(select);
        row.appendChild(cell);
      });
  
      return row;
    }
  
    // Charger les recettes depuis data.json
    fetch("../data/data.json")
      .then(response => response.json())
      .then(data => {
        const recettes = data.recettes || [];
        jours.forEach(jour => {
          const ligne = creerLigne(jour, recettes);
          planningBody.appendChild(ligne);
        });
      })
      .catch(error => console.error("Erreur lors du chargement des recettes :", error));
  
    // Bouton de sauvegarde (affiche une alerte)
    document.getElementById("save-planning").addEventListener("click", function() {
      alert("Votre planning a été sauvegardé !");
    });
  });
  
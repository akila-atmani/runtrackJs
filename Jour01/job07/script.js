function jourTravaille(date) {
   
    const joursFeries2024 = [
        new Date(2024, 0, 1),    // 1er janvier
        new Date(2024, 4, 1),    // 1er mai
        new Date(2024, 6, 14),   // 14 juillet
        new Date(2024, 10, 1),   // 1er novembre
        new Date(2024, 11, 25)   // 25 décembre
    ];

    // Utilisation de toLocaleDateString pour formater la date
    const formattedDate = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

    // Vérifie si la date est un jour férié
    for (let i = 0; i < joursFeries2024.length; i++) {
        if (date.getDate() === joursFeries2024[i].getDate() &&
            date.getMonth() === joursFeries2024[i].getMonth() &&
            date.getFullYear() === joursFeries2024[i].getFullYear()) {
            console.log(`Le ${formattedDate} est un jour férié`);
            return;
        }
    }

    // Vérifie si la date correspond à un samedi (6) ou dimanche (0)
    const jourSemaine = date.getDay();
    if (jourSemaine === 0 || jourSemaine === 6) {
        console.log(`Non, ${formattedDate} est un week-end`);
        return;
    }

    // Sinon, c'est un jour travaillé
    console.log(`Oui, ${formattedDate} est un jour travaillé`);
}

// Exemple d'utilisation
jourTravaille(new Date(2024, 0, 1)); // Jour férié - 1er janvier 2024
jourTravaille(new Date(2024, 5, 1)); // Jour travaillé - 1er juin 2024
jourTravaille(new Date(2024, 6, 14)); // Jour férié - 14 juillet 2024
jourTravaille(new Date(2024, 6, 20)); // Week-end - 20 juillet 2024 (un samedi)

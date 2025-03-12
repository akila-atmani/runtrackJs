function jourTravaille(date) {
   
    const joursFeries2024 = [
        new Date(2024, 0, 1),    // 1er janvier
        new Date(2024, 4, 1),    // 1er mai
        new Date(2024, 6, 14),   // 14 juillet
        new Date(2024, 10, 1),   // 1er novembre
        new Date(2024, 11, 25)   // 25 décembre
    ];

    const formattedDate = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

    for (let i = 0; i < joursFeries2024.length; i++) {
        if (date.getDate() === joursFeries2024[i].getDate() &&
            date.getMonth() === joursFeries2024[i].getMonth() &&
            date.getFullYear() === joursFeries2024[i].getFullYear()) {
            console.log(`Le ${formattedDate} est un jour férié`);
            return;
        }
    }

    const jourSemaine = date.getDay();
    if (jourSemaine === 0 || jourSemaine === 6) {
        console.log(`Non, ${formattedDate} est un week-end`);
        return;
    }

    console.log(`Oui, ${formattedDate} est un jour travaillé`);
}

jourTravaille(new Date(2024, 0, 1)); // Jour férié - 1er janvier 2024
jourTravaille(new Date(2024, 5, 1)); // Jour travaillé - 1er juin 2024
jourTravaille(new Date(2024, 6, 14)); // Jour férié - 14 juillet 2024
jourTravaille(new Date(2024, 6, 20)); // Week-end - 20 juillet 2024 (un samedi)

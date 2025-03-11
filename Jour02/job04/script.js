let keylogger = document.getElementById('keylogger');

document.addEventListener('keydown', function(event) {

    if ((event.key >= 'a' && event.key <= 'z') || (event.key >= 'A' && event.key <= 'Z')) {
        
        if (document.activeElement === keylogger) {
            keylogger.value += event.key + event.key; // Ajoute la lettre deux fois
        } else {
            // Sinon, ajoute la lettre une fois
            keylogger.value += event.key;
        }
    }
});

$(document).ready(function() {
    $('#buttonaffichage').click(function() {
        $('#citation').fadeIn(); // Afficher la citation avec un effet fadeIn
    });

    // Quand on clique sur le bouton pour cacher la citation
    $('#buttoncacher').click(function() {
        $('#citation').fadeOut(); // Cacher la citation avec un effet fadeOut
    });
});

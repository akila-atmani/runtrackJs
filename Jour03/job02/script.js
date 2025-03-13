$(document).ready(function() {


    $('#melangeimages').click(function() {
        // Sélectionner les images avec la classe 'rainbow-image'
        var images = $('#imagesContainer .rainbow-image');

        images.sort(function() {
            return 0.5 - Math.random(); // Mélange aléatoire
        });

       
        $('#imagesContainer').html(images);
    });
});

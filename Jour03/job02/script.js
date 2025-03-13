$(document).ready(function() {
    $("button").click(function() {
        let images = $("#container img").toArray();
        images.sort(() => Math.random() - 0.5);
        $("#container").empty().append(images);
    });
});


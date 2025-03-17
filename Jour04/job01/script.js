document.getElementById("button").addEventListener("click", async function() {
<<<<<<< HEAD
    let response = await fetch("http://localhost/JS/Jour04/job01/expression.txt");
    let data = await response.text();

    console.log(data);
    document.getElementById("expression").innerText = data;
=======
    let response = await fetch("https://localhost/JS/Jour04/job01/expression.txt");

    console.log(response.status);
    let data = await response.text();

    console.log(data);
    //document.getElementById("expression").innerText = data;
>>>>>>> 57a5bde897dc3d71a3131c091eab15ce873d6c1a
});
 
document.getElementById("button").addEventListener("click", async function() {
    let response = await fetch("https://localhost/JS/Jour04/job01/expression.txt");

    console.log(response.status);
    let data = await response.text();

    console.log(data);
    //document.getElementById("expression").innerText = data;
});
 
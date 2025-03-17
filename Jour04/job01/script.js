document.getElementById("button").addEventListener("click", async function() {
    let response = await fetch("http://localhost/JS/Jour04/job01/expression.txt");
    let data = await response.text();

    console.log(data);
    document.getElementById("expression").innerText = data;
});
 
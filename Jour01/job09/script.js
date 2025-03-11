function tri(numbers, order) {
    if (order === "asc") {
        return numbers.sort((a, b) => a - b);
    }
    else if (order === "desc") {
        return numbers.sort((a, b) => b - a);
    }
    else {
        console.log(" Utilisez 'asc' ou 'desc'.");
        return [];
    }
}

console.log(tri([5, 3, 8, 1, 2], "asc")); 


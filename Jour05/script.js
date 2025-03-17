document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");

    // Fonction pour afficher un message d'erreur
    function showError(input, message) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = message;
        errorSpan.style.color = "red";
    }

    // Fonction pour supprimer un message d'erreur
    function clearError(input) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = "";
    }

    // Vérification des champs
    function validateField(input) {
        const value = input.value.trim();
        let isValid = true;

        switch (input.id) {
            case "nom":
            case "prenom":
                if (value.length < 2) {
                    showError(input, "Le champ doit contenir au moins 2 caractères.");
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;

            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(input, "Adresse e-mail invalide.");
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;

            case "password":
                if (value.length < 8) {
                    showError(input, "Le mot de passe doit contenir au moins 8 caractères.");
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;

            case "code_postal":
                const postalCodeRegex = /^[0-9]{5}$/;
                if (!postalCodeRegex.test(value)) {
                    showError(input, "Code postal invalide. (ex: 75001)");
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;

            default:
                clearError(input);
        }

        return isValid;
    }

    // Attacher les événements asynchrones aux champs
    document.querySelectorAll("#signup-form input").forEach(input => {
        input.addEventListener("input", function () {
            validateField(input);
        });

        input.addEventListener("blur", function () {
            validateField(input);
        });
    });

    // Vérification du formulaire avant soumission
    form.addEventListener("submit", function (event) {
        let isFormValid = true;

        document.querySelectorAll("#signup-form input").forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            event.preventDefault(); // Empêcher l'envoi du formulaire si des erreurs sont présentes
        }
    });
});

// 1. Sélection de l'élément HTML avec l'ID "result" et assignation à la constante result
const result = document.getElementById("result");

// 2. Sélection du premier formulaire trouvé sur la page et assignation à la constante form
const form = document.querySelector("form");

// 3. Sélection du premier élément input trouvé sur la page et assignation à la constante input
const input = document.querySelector("input");

// 4. Déclaration d'un tableau vide pour stocker les données des repas
let meals = [];

// 5. Fonction asynchrone pour effectuer une requête à l'API TheMealDB en fonction de la recherche
const fetchMeals = async (search) => {
  // Utilisation de l'API fetch pour effectuer une requête à l'URL spécifiée avec la recherche
  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
    // Conversion de la réponse en format JSON
    .then((res) => res.json())
    // Stockage des données des repas dans le tableau meals
    .then((data) => (meals = data.meals));

  // Affichage des données dans la console
  console.log(meals);
};

// 6. Fonction pour afficher les repas dans l'élément HTML avec l'ID "result"
const mealsDisplay = () => {
  // Vérification si le tableau meals est null (aucun résultat)
  if (meals === null) {
    result.innerHTML = "<h2>Aucun résultat</h2>";
  } else {
    // Limiter le nombre de repas affichés à 12
    meals.length = 12;

    // Construction du contenu HTML à partir des données des repas
    result.innerHTML = meals
      .map((meal) => {
        // Initialisation d'un tableau pour stocker les ingrédients
        let ingredients = [];

        // Boucle pour parcourir les ingrédients (jusqu'à 20)
        for (i = 1; i < 21; i++) {
          // Vérification de l'existence de l'ingrédient
          if (meal[`strIngredient${i}`]) {
            // Récupération de l'ingrédient et de la mesure
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            // Ajout de l'ingrédient au tableau
            ingredients.push(`<li>${ingredient} - ${measure}</li>`);
          }
        }

        // Construction de la carte HTML pour chaque repas
        return `
            <li class="card">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
            <ul>${ingredients.join("")}</ul>
            </li>
            `;
      })
      .join("");
  }
};

// 7. Écouteur d'événements pour détecter les changements dans l'élément input
input.addEventListener("input", (e) => {
  // Appel de la fonction fetchMeals avec la valeur de l'input comme argument
  fetchMeals(e.target.value);
});

// 8. Écouteur d'événements pour détecter la soumission du formulaire
form.addEventListener("submit", (e) => {
  // Empêcher le comportement par défaut du formulaire
  e.preventDefault();
  // Appel de la fonction mealsDisplay pour afficher les repas
  mealsDisplay();
});

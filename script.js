console.log("Fichier JavaScript chargé avec succès !");

// Variables principales
const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const checkButton = document.getElementById("check-button");
const replayButton = document.getElementById("replay-button");
const userInput = document.getElementById("user-input");
const message = document.getElementById("message");
const history = document.getElementById("history");

// Événement sur le bouton START
startButton.addEventListener("click", function () {
  console.log("Bouton Start cliqué !");
  // Cache l'écran de démarrage
  startScreen.style.display = "none";

  // Affiche le jeu avec une transition
  gameScreen.classList.add("visible");
});

// LOGIQUE DU JEU

// Compteur tentative
let attemptCount = 0;
// Générer un nombre aléatoire
let randomNumber = Math.floor(Math.random() * (100 - 1) + 1);
console.log(randomNumber);

userInput.addEventListener("keydown", verifierSaisie);

function verifierSaisie() {
  if (event.key === "Enter") {
    jouer();
  }
}

// Event pour récupérer et comparer le nombre
checkButton.addEventListener("click", jouer);

function jouer() {
  // Récupérer la saisie utilisateur
  const saisieUser = parseInt(userInput.value, 10);

  if (isNaN(saisieUser)) {
    message.textContent = "Veuillez entrer un nombre valide.";
    return; // Stoppe si la saisie est invalide
  }

  if (saisieUser < 1 || saisieUser > 100) {
    message.textContent = "Le nombre doit être entre 1 et 100.";
    return;
  }

  attemptCount++;
  const newHistoryItem = document.createElement("li");
  newHistoryItem.textContent = `Tentative ${attemptCount} : ${saisieUser}`;
  history.appendChild(newHistoryItem);

  // Feedback vert de l'input
  userInput.classList.add("input-feedback");
  setTimeout(() => userInput.classList.remove("input-feedback"), 300);

  // Comparaison avec le nombre a deviner
  if (saisieUser < randomNumber) {
    message.textContent = "C'est plus";
    userInput.value = "";
  } else if (saisieUser > randomNumber) {
    message.textContent = "C'est moins";
    userInput.value = "";
  } else if (saisieUser === randomNumber) {
    message.textContent = "Bravo !";
    userInput.value = "";
    message.textContent =
      "Bravo ! Cliquez sur Rejouer pour commencer une nouvelle partie.";
  } else {
  }
  userInput.focus(); // Replace le curseur dans l'input
}

// Fonction rejouer
replayButton.addEventListener("click", rejouer);

function rejouer() {
  attemptCount = 0; // Réinitialise le compteur des tentatives
  randomNumber = Math.floor(Math.random() * (100 - 1) + 1);
  history.innerHTML = ""; // Vide l'historique
  userInput.value = ""; // Vide l'input
  message.textContent = ""; // Efface le message
  userInput.focus(); // Replace le curseur dans l'input
}

import "bootstrap";
import "./style.css";

document.addEventListener("DOMContentLoaded", function() {
  const suits = ["♠", "♣", "♦", "♥"]; // Palos
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ]; // Valores

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Función para generar una carta aleatoria
  function generateRandomCard() {
    const suit = suits[getRandomInt(0, suits.length - 1)]; // Elegir un palo aleatorio
    const value = values[getRandomInt(0, values.length - 1)]; // Elegir un valor aleatorio
    return { value, suit }; // Retornamos la carta
  }

  // Función para construir una carta en formato HTML
  function buildCardHTML(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
      <span class="top-suit">${card.suit}</span>
      <span class="number">${card.value}</span>
      <span class="bottom-suit">${card.suit}</span>
    `;
    return cardElement;
  }

  // Función para dibujar las cartas generadas
  function drawCards(cards) {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = ""; // Limpiamos las cartas previas
    cards.forEach(card => {
      const cardHTML = buildCardHTML(card);
      cardsContainer.appendChild(cardHTML);
    });
  }
  function drawCardsRegistro(cards) {
    const cardsContainer = document.getElementById("registro-container");
    //cardsContainer.innerHTML = ""; // Limpiamos las cartas previas
    const div = document.createElement("div");
    div.classList.add("registro");

    cards.forEach(card => {
      const cardHTML = buildCardHTML(card);
      div.appendChild(cardHTML);
    });
    cardsContainer.appendChild(div);
  }

  // Generar y mostrar cartas aleatorias al hacer clic en "Draw"
  document.getElementById("drawButton").addEventListener("click", function() {
    const numCards = parseInt(document.getElementById("numCards").value, 10);

    if (isNaN(numCards) || numCards <= 0 || numCards > 12) {
      alert("Por favor ingresa un número válido de cartas (1-12).");
      return;
    }

    const cards = [];
    for (let i = 0; i < numCards; i++) {
      cards.push(generateRandomCard());
    }
    drawCards(cards);
  });

  // Función para convertir el valor de la carta en un número para facilitar la comparación
  function cardValueToNumber(value) {
    if (value === "A") return 1;
    if (value === "J") return 11;
    if (value === "Q") return 12;
    if (value === "K") return 13;
    return parseInt(value, 10);
  }

  // Algoritmo de ordenamiento por selección
  const selectSort = cards => {
    const log = []; // Array para guardar el log de cambios
    for (let i = 0; i < cards.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < cards.length; j++) {
        if (
          cardValueToNumber(cards[j].value) <
          cardValueToNumber(cards[minIndex].value)
        ) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        // Intercambiamos cartas y guardamos el estado actual en el log
        [cards[i], cards[minIndex]] = [cards[minIndex], cards[i]];
        log.push(cards.map(card => `${card.value}${card.suit}`).join(", "));
      }
    }
    return log;
  };

  // Función para ordenar y redibujar las cartas
  document.getElementById("sortButton").addEventListener("click", function() {
    const cardsContainer = document.getElementById("cards-container");
    const cards = Array.from(cardsContainer.children).map(card => {
      const value = card.querySelector(".number").textContent;
      const suit = card.querySelector(".top-suit").textContent;
      return { value, suit };
    });

    const log = selectSort(cards); // Ahora usamos selectSort en lugar de selectionSort
    drawCardsRegistro(cards); // Redibujamos las cartas ordenadas

    // Mostrar el log de cambios en el contenedor de logs
    //   const logContainer = document.createElement("div");
    //   logContainer.classList.add("log-container");
    //   logContainer.innerHTML = log.join("<br>");
    //   document.body.appendChild(logContainer); // Mostrar el log al final del cuerpo
  });
});

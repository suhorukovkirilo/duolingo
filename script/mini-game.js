// Це js скрипт для міні гри, що стає достпуною після "реєстрації"

// Збільшення кількості карток до 20
var cards = document.getElementsByClassName('cards')[0];
cards.innerHTML = cards.innerHTML.repeat(20);

// Задання основних змінних
var cards = document.querySelectorAll(".card");

var matched = 0;
var cardOne, cardTwo;
var disableDeck = false;

// Функція перевертання карт
function flipCard(event) {
    if (cardOne !== event.target && !disableDeck) { // Якщо перша натиснута карта - не ця
        event.target.classList.add("flip");
        if (!cardOne) {
            cardOne = event.target; // Задання першої карти, якщо не було задано
        } else {
            cardTwo = event.target; // Задання другої картки
            disableDeck = true;
            matchCards(cardOne, cardTwo); 
        }
    }
}

// Функція перевірки співпадання двух карток
function matchCards(img1, img2) {
    // Якщо посилання на зображення однакові
    if(img1.querySelector(".back-view img").src === img2.querySelector(".back-view img").src) {
        matched += 1; // Збільшити кількість правильно зібраних пар карток
        if(matched === 10) {
            // Якщо зібрано всі пари карток - то перемішати картки
            setTimeout(function() {
                shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        // Анулювання даних про вибрані картки
        cardOne = "";
        cardTwo = "";
        disableDeck = false;
    } else {
        // Якщо вибрано дві неправильні картки - то затосувати анмацію та також анулювати дані про вибрані картки
        setTimeout(function() {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);
    
        setTimeout(function() {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = "";
            cardTwo = "";
            disableDeck = false;
        }, 1500);
    }
}

// Початкове задання/переміщювання карток
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = "";
    cardTwo = "";
    let cards_num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // Рандомізація позицій карток з певним номером
    for (var i = cards_num.length - 1; i > 0; i--) { 
        var j = Math.floor(Math.random() * (i + 1)); 
        [cards_num[i], cards_num[j]] = [cards_num[j], cards_num[i]]; 
    }
    // Встановлення для кожної картки зображення та обробників подій
    for (var index of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]) {
        var card = cards[index];
        card.classList.remove("flip");
        card.querySelector(".back-view img").src = `mini-game/img-${cards_num[index]}.svg`;
        card.addEventListener("click", flipCard);
    } 
}

// Початкове задання карток
shuffleCard();

// Функція початку міні-гри
function MiniGame() {
    ShowNav();
    visibility(visible=[".mini-game", ".header-nav"], hidden=[".duolingo-dialog"])
    history.pushState('state', '', '?mini-game') // Додавання до адреси mini-game
};

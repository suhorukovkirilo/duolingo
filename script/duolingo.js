// Це основний js скрипт

// Зміні, які зберігають статуси для функції onScroll
var headerChangeableElement = '.header-nav nav button';
var NavVisibility = 'visible';

// Функція, що викливається під час пересування по сторінці
function onScroll() {
    // Отримання/Задання основних об'єктів
    var header = document.querySelector(".header-nav nav");
    var headerHeight = header.getBoundingClientRect().height;
    var startBtn1 = document.getElementsByClassName('register-or-login')[0].getElementsByClassName('register')[0].getBoundingClientRect();
    var startBtn2 = document.getElementsByClassName('register last-register')[0].getBoundingClientRect();
    var duolingoSuper = document.getElementsByClassName('duolingo-super')[0];
    var installAppTitle = document.getElementsByClassName('install-app-title')[0];

    // Перевірка чи немає на екрані кнопок для реємтрації
    // Якщо таких кнопок немає, то додати таку кнопку у верхню навігацію
    if (startBtn1.bottom - headerHeight  < 0 && (startBtn2.top + headerHeight > window.innerHeight || startBtn2.bottom - headerHeight < 0)) {
        if (headerChangeableElement === '.header-nav nav button') {
            var langButton = header.getElementsByClassName('language')[0];
            header.removeChild(langButton);

            var newStartBtn = document.createElement('button');
            newStartBtn.classList = 'register register-top';
            newStartBtn.innerHTML = '<span>Розпочати</span>';
            newStartBtn.addEventListener('click', RegisterStart);

            header.appendChild(newStartBtn);

            headerChangeableElement = '.header-nav nav a';
        }
    } else {
        if (headerChangeableElement === '.header-nav nav a') {
            var oldStartBtn = header.getElementsByClassName('register')[0];
            header.removeChild(oldStartBtn);

            var langButton = document.createElement('button');
            langButton.classList = 'language';
            langButton.innerHTML = `<span>Мова сайту: Українська</span>
            <img alt="" class="language-list-open" src="svg/language-list-open.svg">`;

            header.appendChild(langButton);

            headerChangeableElement = '.header-nav nav button';
        }
    };

    // Перевірка чи основними об'єктами на екрані користувача є розділ встановлення та Duolingo Super
    // Якщо так, то прибрати верхню навігацію та змінити колір фону
    if (installAppTitle.getBoundingClientRect().top <= 100 && duolingoSuper.getBoundingClientRect().bottom - duolingoSuper.getBoundingClientRect().height * 0.4 >= 50) {
        if (NavVisibility === "visible") {
            HideNav();
            document.body.style.animation = 'bg-repaint 2s linear';
            setTimeout(function() {
                document.body.style.removeProperty('animation');
            }, 2100);
            document.body.style.backgroundColor = '#ddf4ff';
        };
    } else {
        if (NavVisibility === 'hidden') {
            ShowNav();
            document.body.style.animation = 'bg-repaint 2s linear';
            document.body.style.animationDirection = 'reverse';
            setTimeout(function() {
                document.body.style.removeProperty('animation');
                document.body.style.removeProperty('animation-direction');
            }, 2100);
            document.body.style.removeProperty('background-color');
        }
    };   
};

// Функція, що встановлює видимість об'єктів
// visible - з'являться
// hidden - зникнуть
function visibility(visible=[], hidden=[]) {
    for (var el of visible) {
        document.querySelector(el).style.visibility = 'visible';
    }

    for (var el of hidden) {
        document.querySelector(el).style.visibility = 'hidden';
    }
}

// Функція переадресації на певну адресу
function Redirect(url) {
    window.open(location.href.split("/").slice(0, -1).join("/") + "/redirect.html?url=" + url, '_blank')
}

document.addEventListener("scroll", onScroll); // Встановлення функції обробки пересування на сторінці

// Обробка сторінки
// Наприклад, якщо після ? у адресі стоїть login, то відкрити вікно входу до акканту
// Якщо значення після ? невідоме (невідомо, як обробити) то очистити все починаючи з ?
if (location.href.endsWith("?login")) {
    OpenLogin(false);
} else if (location.href.endsWith("?register")) {
    RegisterStart();
} else if (location.href.endsWith("?welcome")) {
    HiDuolingo(false);
    HideScrollBar();
} else if (location.href.endsWith("?survey")) {
    StartSurvey();
    visibility(visible=['.header-nav'], hidden=['header', 'main']);
    HideScrollBar();
} else if (location.href.endsWith("?completed")) {
    SurveyPassed(false);
    HideScrollBar();
    visibility(visible=[], hidden=['header', 'main', '.header-nav']);
} else if (location.href.endsWith("?mini-game")) {
    MiniGame();
    HideScrollBar();
} else if (location.href.includes('?')) {
    history.pushState('state', '', location.pathname);
}

// При натисканні на логотип оновити сторінку
document.getElementsByClassName('duolingo-logo')[0].parentElement.addEventListener('click', function() {
    location.href = location.pathname;
});

// Додавання перехвату стандартної переадресації посилань і додавання своєї переадресації
for (var link of document.querySelectorAll('a')) {
    if (link.querySelector(".duolingo-logo") === null) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            Redirect(event.target.closest("a").href);
        });
    }
}

document.body.style.visibility = 'visible'; // Вікно стає видимим після завантаження всіх об'єктів

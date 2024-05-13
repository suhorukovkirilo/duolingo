// Це js файл для реєстрації до міні-гри

// Функція перемикання діалогу DUo
function Dialog(img, text, prev, next) {
    document.querySelector(".duolingo-dialogue-img img").src = "svg/" + img + ".svg"; // задання зображення Duo
    document.getElementsByClassName("register btn-next")[0].addEventListener('click', next);
    document.getElementsByClassName("register btn-next")[0].removeEventListener('click', prev);
    // Роблення кнопки не робочою
    document.getElementById('dialogue-next').classList.add('btn-disabled');
    document.getElementById('dialogue-next').disabled = true;
    // Амнімація появи тексту
    var message = document.querySelector(".duolingo-message div div");
    typing(message, text, function() {
        // Повернення кнопки до звичайного стану (робочого)
        document.getElementById('dialogue-next').classList.remove('btn-disabled');
        document.getElementById('dialogue-next').disabled = false;
    });
};

// Функція початку реєстрації
function RegisterStart() {
    visibility(visible=[".language-choose-dialog", ".header-nav"], hidden=["header", "main"])
    window.scrollTo(0, 0); // Прокутка до початку сторінки
    setTimeout(HideScrollBar, 100); // Сховати прокрутку
    history.pushState('state', '', '?register') // Додавання register до адреси
};

// Функція початку діалогу
function HiDuolingo(animation=true) {
    visibility(visible=[".duolingo-dialog", ".header-nav"], hidden=[".language-choose-dialog", "header", "main"])
    Dialog("duolingo-hi", "Привіт! Мене звати Duo!", function() {}, function() {});
    if (animation) {
        HideNav();
    } else {
        document.getElementsByClassName('header-nav')[0].style.transform = 'translateY(-70px)';
    }
    history.pushState('state', '', '?welcome') // Додавання welcome до адреси
};

function LetsLearning() {
    Dialog("duolingo-excited", "Гайда навчатися!", LetsLearning, StartWithSurvey)
};

function StartWithSurvey() {
    Dialog("duolingo-happy-student", "Почнемо з невеличкого опитування!", StartWithSurvey, StartSurvey)
};

// Функція початку опитування
function StartSurvey() {
    // Анімація тексту запитання опитування
    var message = document.querySelector(".duolingo-survey-message-box div div");
    typing(message, "Звідки ви дізналися про Duolingo?", function() {});
    ShowNav();
    visibility(visible=[".duolingo-survey", ".header-nav"], hidden=[".duolingo-dialog"]);
    history.pushState('state', '', '?survey'); // Додавання до адреси survey
    document.getElementsByClassName("register btn-next")[0].removeEventListener('click', LetsLearning);
};

function SurveyJob() {
    // Зробити всі кнопки варіантів відповідей неактивними
    for(var answer of document.getElementsByClassName('duolingo-survey-answer-btn')) {
            answer.classList.remove('duolingo-survey-answer-btn-active');
    };
    // Нові зображення та тексти на кнопках
    var survey = [{"title": "Кар'єрне зростання", "img": "svg/career.svg"}, {"title": "Корисне заняття", "img": "svg/brain.svg"}, 
    {"title": "Освітні цілі", "img": "svg/education.svg"}, {"title": "Підготовка до подорожі", "img": "svg/travel.svg"}, 
    {"title": "Спілкування з людьми", "img": "svg/talk.svg"}, {"title": "Задля розваги", "img": "svg/entertainment.svg"}]
    // Змінаа зображень та текстів на кнопках
    var els = document.getElementsByClassName('duolingo-survey-answer');
    for (var i of [0, 1, 2, 3, 4, 5]) {
        els[i].getElementsByTagName('img')[0].src = survey[i].img;
        els[i].getElementsByTagName('span')[0].innerHTML = survey[i].title;
        if (survey[i].title === "Освітні цілі") {
            els[i].getElementsByTagName('img')[0].style.width = '40px';
        }
    };
    // Анімація тексту запитання
    var message = document.querySelector(".duolingo-survey-message-box div div");
    typing(message, "Для чого ви вивчаєте англійську мову?", function() {});
    // Кнопка далі сатє неактивною
    document.getElementById('survey-next').classList.add('btn-disabled');
    document.getElementById('survey-next').disabled = true;
    document.getElementById('survey-next').removeEventListener('click', SurveyJob);
    document.getElementById('survey-next').addEventListener('click', SurveyPassed);
};

function SurveyPassed(animation=true) {
    visibility(visible=[".duolingo-dialog", ".header-nav"], hidden=[".duolingo-survey"]);
    if (animation) {
        HideNav();
        Dialog("duolingo-happy-student", "Дякую за проходження опитування!", StartSurvey, LetsStartGame);
    } else {
        Dialog("duolingo-happy-student", "Дякую за проходження опитування!", LetsLearning, LetsStartGame);
    };
    history.pushState('state', '', '?completed'); // Додати completed до адреси користувача
};

function LetsStartGame(animation=true) {
    Dialog("duolingo-excited", "Тепер перейдемо до гри!", LetsStartGame, MiniGame)
};

// Додавання обробників до кнопок
document.getElementsByClassName("register")[0].addEventListener('click', RegisterStart);
document.getElementsByClassName("register")[1].addEventListener('click', RegisterStart);
document.getElementsByClassName("register btn-next")[0].addEventListener('click', LetsLearning);
document.getElementsByClassName("language-for-choose")[0].addEventListener('click', HiDuolingo);
document.getElementById('survey-next').addEventListener('click', SurveyJob);

// Задання обробнику для кнопок відповідей на запитання
for(var answer of document.getElementsByClassName('duolingo-survey-answer-btn')) {
    answer.addEventListener('click', function() {
        this.classList.add('duolingo-survey-answer-btn-active');
        for(var answer of document.getElementsByClassName('duolingo-survey-answer-btn')) {
            // Якщо це не ця кнопка - зробити неактивною
            if (answer.innerText !== this.innerText) {
                answer.classList.remove('duolingo-survey-answer-btn-active');
            };
        };
        // Зробити активною кнопку далі
        document.getElementById('survey-next').classList.remove('btn-disabled');
        document.getElementById('survey-next').disabled = false;
    });
};

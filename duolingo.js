var headerChangeableElement = '.header-nav nav button';
var NavVisibility = 'visible';

function onScroll() {
    var header = document.querySelector(".header-nav nav")
    var startBtn1 = document.getElementsByClassName('register-or-login')[0].getElementsByClassName('register')[0];
    var startBtn2 = document.getElementsByClassName('register last-register')[0];
    var duolingoSuper = document.getElementsByClassName('duolingo-super')[0];
    var installAppTitle = document.getElementsByClassName('install-app-title')[0];

    if (startBtn1.getBoundingClientRect().bottom - header.getBoundingClientRect().height  < 0 &&
        startBtn2.getBoundingClientRect().top - header.getBoundingClientRect().height > window.innerHeight) {
        if (headerChangeableElement === '.header-nav nav button') {
            var langButton = header.getElementsByClassName('language')[0];
            header.removeChild(langButton);

            var newStartBtn = document.createElement('a');
            newStartBtn.classList = 'register';
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
            <img alt="" class="language-list-open" src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/c6eae48dd48246c89e415b89f9e55282.svg">`;

            header.appendChild(langButton);

            headerChangeableElement = '.header-nav nav button';
        }
    };

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

function OpenLogin() {
    document.getElementsByClassName('login-dialog')[0].style.visibility = 'visible';
    document.getElementsByTagName('header')[0].style.visibility = 'hidden';
    document.getElementsByTagName('main')[0].style.visibility = 'hidden';
    document.body.classList.add('hide-scrollbar');
    window.scrollTo(0, 0);
    setTimeout(function() {
        document.body.style.height = '100%';
        HideNav();
    }, 100);
};

function RegisterStart() {
    document.getElementsByClassName('language-choose-dialog')[0].style.visibility = 'visible';
    document.getElementsByTagName('header')[0].style.visibility = 'hidden';
    document.getElementsByClassName('header-nav')[0].style.visibility = 'visible';
    document.getElementsByTagName('main')[0].style.visibility = 'hidden';

    document.body.classList.add('hide-scrollbar');
    window.scrollTo(0, 0);
    setTimeout(function() {
        document.body.style.height = '100%';
    }, 100);
}

function CloseLogin() {
    document.getElementsByClassName('login-dialog')[0].style.visibility = 'hidden';
    document.getElementsByTagName('header')[0].style.visibility = 'visible';
    document.getElementsByTagName('main')[0].style.visibility = 'visible';
    document.body.removeAttribute('class');
    document.body.removeAttribute('style');
    ShowNav();
};

function ShowNav() {
    var nav = document.getElementsByClassName('header-nav')[0];
    nav.style.removeProperty('transform');
    nav.style.removeProperty('visibility')
    nav.style.animation = 'show-nav 1s ease-in-out';
    NavVisibility = 'visible';
};

function HideNav() {
    var nav = document.getElementsByClassName('header-nav')[0];
    nav.style.transform = 'translateY(-70px)';
    nav.style.visibility = 'hidden';
    nav.style.animation = 'hide-nav 1s ease-in-out';
    NavVisibility = 'hidden';
};

function typing(message, text, afterFunc) {
    var i = 0
    message.innerHTML = '';
    var interval = setInterval(function() {
        message.innerHTML += text.split("")[i];
        i += 1
        if (i === text.length) {
            setTimeout(afterFunc, 200);
            clearInterval(interval);
        }
    }, 40);
};

function HiDuolingo() {
    document.getElementsByClassName('duolingo-dialog')[0].style.visibility = 'visible';
    document.getElementsByClassName('language-choose-dialog')[0].style.visibility = 'hidden';
    document.getElementsByTagName('header')[0].style.visibility = 'hidden';
    document.getElementsByClassName('header-nav')[0].style.visibility = 'visible';
    document.getElementsByTagName('main')[0].style.visibility = 'hidden';
    document.getElementById('dialogue-next').classList.add('btn-disabled');
    document.getElementById('dialogue-next').disabled = true;
    var message = document.querySelector(".duolingo-message div div");
    typing(message, "Привіт! Мене звати Duo!", function(){
        document.getElementById('dialogue-next').classList.remove('btn-disabled');
        document.getElementById('dialogue-next').disabled = false;
    });
    HideNav();
};

function LetsLearning() {
    document.querySelector(".duolingo-dialogue-img img").src = "svg/duolingo-excited.svg";
    document.getElementsByClassName("register btn-next")[0].removeEventListener('click', LetsLearning);
    document.getElementsByClassName("register btn-next")[0].addEventListener('click', StartWithSurvey);
    document.getElementById('dialogue-next').classList.add('btn-disabled');
    document.getElementById('dialogue-next').disabled = true;
    var message = document.querySelector(".duolingo-message div div");
    typing(message, "Гайда навчатися!", function(){
        document.getElementById('dialogue-next').classList.remove('btn-disabled');
        document.getElementById('dialogue-next').disabled = false;
    });
};

function StartWithSurvey() {
    document.querySelector(".duolingo-dialogue-img img").src = "svg/duolingo-happy-student.svg";
    document.getElementsByClassName("register btn-next")[0].removeEventListener('click', StartWithSurvey);
    document.getElementsByClassName("register btn-next")[0].addEventListener('click', StartSurvey);
    document.getElementById('dialogue-next').classList.add('btn-disabled');
    document.getElementById('dialogue-next').disabled = true;
    var message = document.querySelector(".duolingo-message div div");
    typing(message, "Почнемо з невеличкого опитування!", function(){
        document.getElementById('dialogue-next').classList.remove('btn-disabled');
        document.getElementById('dialogue-next').disabled = false;
    });
};

function StartSurvey() {
    document.getElementsByClassName("duolingo-dialog")[0].style.visibility = 'hidden';
    document.getElementsByClassName("duolingo-survey")[0].style.visibility = 'visible';
    document.getElementsByClassName("register btn-next")[0].removeEventListener('click', StartSurvey);
    var message = document.querySelector(".duolingo-survey-message-box div div");
    typing(message, "Звідки ви дізналися про Duolingo?", function() {});
    ShowNav();
    document.getElementsByClassName('header-nav')[0].style.visibility = 'visible';
};

function SurveyJob() {
    var survey = [{"title": "Кар'єрне зростання", "img": "https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/61a06f02b3b988d1c388d484bc0e52e6.svg"}, 
    {"title": "Корисне заняття", "img": "https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/f382d7a1e1a958dc07fca0deae2d16b7.svg"},
    {"title": "Освітні цілі", "img": "https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/d7315c6c7bbeba67df5ebda771d33da1.svg"},
    {"title": "Підготовка до подорожі", "img": "https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/5bbfb55fd21e21012a228bcef29bb557.svg"},
    {"title": "Спілкування з людьми", "img": "https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/484f1c9610935dd40094a9f7cf06e009.svg"},
    {"title": "Задля розваги", "img": "https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/ab81d610a8a79f174a4db0a6085e7e2c.svg"},]
    var els = document.getElementsByClassName('duolingo-survey-answer');
    for (var i of [0, 1, 2, 3, 4, 5]) {
        console.log(survey[i].title);
        console.log(els[i].getElementsByTagName('img'))
        els[i].getElementsByTagName('img')[0].src = survey[i].img;
        els[i].getElementsByTagName('span')[0].innerHTML = survey[i].title;
        if (survey[i].title === "Освітні цілі") {
            els[i].getElementsByTagName('img')[0].style.width = '40px';
        }
    };
    var message = document.querySelector(".duolingo-survey-message-box div div");
    typing(message, "Для чого ви вивчаєте англійську мову?", function() {});
    document.getElementById('survey-next').classList.add('btn-disabled');
    document.getElementById('survey-next').disabled = true;
    document.getElementById('survey-next').removeEventListener('click', SurveyJob);
    document.getElementById('survey-next').addEventListener('click', SurveyPassed);
};

function SurveyPassed() {
    document.getElementsByClassName("duolingo-dialog")[0].style.visibility = 'visible';
    document.getElementsByClassName("duolingo-survey")[0].style.visibility = 'hidden';
    document.getElementsByClassName('header-nav')[0].style.visibility = 'visible';
    document.getElementById('dialogue-next').classList.add('btn-disabled');
    document.getElementById('dialogue-next').disabled = true;
    var message = document.querySelector(".duolingo-message div div");
    typing(message, "Дякую за проходження опитування!", function(){
        document.getElementById('dialogue-next').classList.remove('btn-disabled');
        document.getElementById('dialogue-next').disabled = false;
    });
    document.getElementById('dialogue-next').addEventListener('click', LetsStartGame);
    HideNav();
};

function LetsStartGame() {
    document.querySelector(".duolingo-dialogue-img img").src = "svg/duolingo-excited.svg";
    document.getElementById('dialogue-next').removeEventListener('click', LetsStartGame);
    document.getElementById('dialogue-next').addEventListener('click', MiniGame);
    document.getElementById('dialogue-next').classList.add('btn-disabled');
    document.getElementById('dialogue-next').disabled = true;
    var message = document.querySelector(".duolingo-message div div");
    typing(message, "Тепер перейдемо до гри!", function(){
        document.getElementById('dialogue-next').classList.remove('btn-disabled');
        document.getElementById('dialogue-next').disabled = false;
    });
};

function MiniGame() {
    document.getElementsByClassName('duolingo-dialog')[0].style.visibility = 'hidden';
    document.getElementsByClassName('mini-game')[0].style.visibility = 'visible';
    ShowNav();
    document.getElementsByClassName('header-nav')[0].style.visibility = 'visible';
};

document.getElementsByClassName("register")[0].addEventListener('click', RegisterStart);
document.getElementsByClassName("register")[1].addEventListener('click', RegisterStart);

document.getElementsByClassName("register btn-next")[0].addEventListener('click', LetsLearning);

document.addEventListener("scroll", onScroll);

document.getElementsByClassName('login-dialog-close')[0].addEventListener('click', CloseLogin);

document.getElementsByClassName("language-for-choose")[0].addEventListener('click', HiDuolingo);

document.getElementById('survey-next').addEventListener('click', SurveyJob);

for(var answer of document.getElementsByClassName('duolingo-survey-answer-btn')) {
    answer.addEventListener('click', function() {
        this.classList.add('duolingo-survey-answer-btn-active');
        for(var answer of document.getElementsByClassName('duolingo-survey-answer-btn')) {
            if (answer.innerText !== this.innerText) {
                answer.classList.remove('duolingo-survey-answer-btn-active');
            };
        };
        document.getElementById('survey-next').classList.remove('btn-disabled');
        document.getElementById('survey-next').disabled = false;
    });
};

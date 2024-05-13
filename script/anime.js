// Це файл для js-анімацій, які я самостійно зробив


// Функція показу верхньої навігації
function ShowNav() {
    var nav = document.getElementsByClassName('header-nav')[0];
    nav.style.removeProperty('transform');
    nav.style.removeProperty('visibility')
    nav.style.animation = 'show-nav 1s ease-in-out';
    NavVisibility = 'visible'; // Задання стану для функції onScroll
};

// Функція ховання верхньої навігації
function HideNav() {
    var nav = document.getElementsByClassName('header-nav')[0];
    nav.style.transform = 'translateY(-70px)';
    nav.style.visibility = 'hidden';
    nav.style.animation = 'hide-nav 1s ease-in-out';
    NavVisibility = 'hidden'; // Задання стану для функції onScroll
};

// Функція поступового набирання текстовго повідомлення
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

// Функція ховання прокрутки
function HideScrollBar() {
    document.body.classList.add('hide-scrollbar');
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
}

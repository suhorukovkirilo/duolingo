// Це файл js для вікна входу до аккаунту

// Функція відкриття вікна фходу
function OpenLogin(animation=true) {
    visibility(visible=[".login-dialog"], hidden=["header", "main"])
    window.scrollTo(0, 0);
    HideScrollBar();
    if (animation) {
        setTimeout(function() {
            HideNav();
        }, 100);
    }
    history.pushState('state', '', '?login') //Зміна адреси на login
};

// Функція закриття вікна входу
function CloseLogin() {
    visibility(visible=["header", "main"], hidden=[".login-dialog"])
    document.body.removeAttribute('class');
    document.body.removeAttribute('style');
    ShowNav();
    history.pushState('state', '', location.pathname) //Зміна адреси на головну
};

//Додавання відкриття/закриття до кнопок
document.querySelector('.register-or-login .login').addEventListener('click', OpenLogin);
document.querySelector('.login-dialog-close').addEventListener('click', CloseLogin);

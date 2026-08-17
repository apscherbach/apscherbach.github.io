
$(document).ready(async function() {

    await loadTranslations();

    currentLanguage =
        localStorage.getItem("language") ||
        navigator.language.substring(0,2);

    if (!["br","en","es"].includes(currentLanguage))
        currentLanguage = "br";

    translatePage();

    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-bars fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight() + 75;

        let activeSectionIndex = 0;

        //console.log(scrollPosition);
        if(scrollPosition <= 0) {
            header.css('box-shadow','none');
        } else {
            header.css('box-shadow','5px 1px 5px rgba(0, 211, 162, 0.2)');
        }

        sections.each(function(i){
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBotton = sectionTop + section.outerHeight();
            if (scrollPosition >= sectionTop && scrollPosition < sectionBotton) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');

        $(navItems[activeSectionIndex]).addClass('active');

    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '40%'
    });

    ScrollReveal().reveal('#courses', {
        origin: 'right',
        duration: 2000,
        distance: '40%'
    });

    ScrollReveal().reveal('#testimonial-image', {
        origin: 'left',
        duration: 2000,
        distance: '40%'
    });

        ScrollReveal().reveal('#testimonials-content', {
        origin: 'right',
        duration: 2000,
        distance: '40%'
    });

});


let translations = {};
let currentLanguage = "br";

async function loadTranslations() {
    const response = await fetch("src/lang/translations.json");
    //console.log(response.json());
    translations = await response.json();
}

function t(key) {
    const item = key
        .split(".")
        .reduce((obj, part) => obj?.[part], translations);
    //console.log(item);
    if (!item) return key;
    //console.log(currentLanguage);
    return item[currentLanguage]
        ?? item.en
        ?? Object.values(item)[0]
        ?? key;
}

function translatePage() {

    $("[data-i18n]").each(function () {
        //console.log($(this).data("i18n"));
        //$(this).text(t($(this).data("i18n")));
        $(this).html(t($(this).data("i18n")));

    });

    /*$("[data-i18n-placeholder]").each(function () {
        $(this).attr("placeholder", t($(this).data("i18n-placeholder")));
    });*/

}

$(".lang").on("click", function () {
    setLanguage($(this).data("lang"));
    //console.log($(this).data("lang"));
});

function setLanguage(lang) {
    currentLanguage = lang;
    //console.log("Current language: " + lang);
    localStorage.setItem("language", lang);

    translatePage();
}


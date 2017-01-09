var lang = "ar";
$(document).ready(function () {
    console.log("done");
});

$("#shorten").click(function () {
    shortenUrl();
});

$("#translate").click(function () {
    translatePhrase();
});

function translatePhrase(){
    $.getJSON("/translate/" + lang + "/" + $("#source").val(), function (body) {
        $("#dest").val($.parseJSON(body).data.translations[0].translatedText);
    });
};

function shortenUrl() {
    $.getJSON("/shorten/" + $("#longUrl").val(), function (data) {
        console.log(data.id);
        $("#shortUrl").val(data.id);
        $("#shortUrlLink").attr("href", data.id);
    });
};

function setLang(language, langShort){
    lang = langShort;
    $("#langs").text(language + " \u25bc");
};
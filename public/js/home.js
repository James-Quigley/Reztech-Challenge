$(document).ready(function () {
    console.log("done");
});

$("#shorten").click(function () {
    $.getJSON("/shorten/" + $("#longUrl").val(), function (data) {
        console.log(data.id);
        $("#shortUrl").text(data.id);
        $("#shortUrlLink").attr("href", data.id);
    });
});

$("#translate").click(function () {
    translatePhrase();
});

function translatePhrase(){
    $.getJSON("/translate/" + $("#langs").val() + "/" + $("#source").val(), function (body) {
        $("#dest").val($.parseJSON(body).data.translations[0].translatedText);
    });
};
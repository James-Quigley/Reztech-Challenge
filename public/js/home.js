$(document).ready(function () {
    console.log("done");
});

$("#shorten").click(function () {

    $.getJSON("/shorten/"+$("#longUrl").val(), function(data){
        console.log(data.id);
        $( "#shortUrl" ).text(data.id);
        $( "#shortUrlLink" ).attr("href", data.id);        
    });
});
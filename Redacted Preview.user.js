// ==UserScript==
// @name         Redacted Preview
// @namespace    http://benzy.org/
// @version      0.1
// @description  Preview songs on Redacted
// @author       John Bednarczyk
// @match        https://redacted.ch/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==


(function () {
    'use strict';

    // URL to add video link to
    var youtubeURL = "https://www.youtube.com/watch?v=";

    // Get the section that contains song details
    var albumInfo = document.getElementsByClassName("box torrent_description")[0].lastElementChild

    // Get list of all songs
    var song = $("span").filter(function() { return ($(this).text().indexOf('(') > -1) }); // anywhere match

    // Change the text for every song, also assigns class to each song
    for(var i = 0 ; i < song.length ; i++){
        song[i].setAttribute("class","song");

        var aTag = document.createElement('a');

        var artist = document.getElementsByTagName("h2")[0].firstChild.text;

        var songTitle = song[i].previousSibling.nodeValue;

        var link = youtubeURL + getLink(artist, songTitle);

        // todo: Need to call some function to get correct youtube video
        aTag.setAttribute('href', link);

        // Open link in new window
        aTag.setAttribute('target',"_blank");

        // Name of text
        aTag.innerHTML = "Link";

        // Add Spacing
        song[i].appendChild(document.createTextNode(" "));

        // Add link to end of song
        song[i].appendChild(aTag);
    }

    // Function to get a single
    function getLink(artist, song){

        // API Key
        var key = "AIzaSyCuBAEyb2GnQHCcMo0AQBQ057DFt1yu1zY";

        // Setup url for api
        var url = 'https://www.googleapis.com/youtube/v3/search?part=id&q=' + artist + "-" + song + '&maxResults:1&key=' + key;

        // call api and get videoId
        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", url, false);
        xhReq.send(null);
        var id = JSON.parse(xhReq.responseText);

        return id.items[0].id.videoId;
    }

    // Debug
    console.log(albumInfo);
    console.log(song);


})();
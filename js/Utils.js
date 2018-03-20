'use strict';

function getFromStorage(key) {
    var data = localStorage.getItem(key);
    if(data) return JSON.parse(data);
}

function setInStorage(key, data) {
    return localStorage.setItem(key,JSON.stringify(data));
}


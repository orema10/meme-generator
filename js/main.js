'use strict';

console.log('Hello');
var nextIdCount = 1;
var currImg;

var gImgs = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }];



function createImg(nextId, url, keywords) {
    return {
        id: nextId,
        url: url,
        keywords: keywords,
    }
}

function saveImage(el) {
    currImg = el.getAttribute('src');
    openCanvas();
}

function openCanvas() {
    var elGalleryItem = document.querySelector('.gallery-items');
    // elGalleryItem.style.transform = 'scale(0)';
    elGalleryItem.style.display='none';
    var elGalleryContainer = document.querySelector('.gallery-container');
    elGalleryContainer.innerHTML += `
    <section class="gallery-canvas">
        <canvas class="canvas"></canvas>

        <a class="down-btn" onclick="startDown(this)" download="${currImg}">Download</a>

    </section>
    `;

    editCanvas();
}

function editCanvas() {
    var elCanvas = document.querySelector('.canvas');
    var ctx = elCanvas.getContext('2d');
    elCanvas.width = window.innerWidth / 2;
    elCanvas.height = window.innerHeight / 2;
    var background = new Image();
    background.src = '../' + currImg;

    background.onload = function() {
        ctx.drawImage(background,0,0,elCanvas.width,elCanvas.height);
    }
}

function startDown(elLink) {
    elLink.src = currImg;
}
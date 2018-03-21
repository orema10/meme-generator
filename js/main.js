'use strict';

console.log('Hello');
var nextIdCount = 1;
var currImg;

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['face', 'cartton'] },
    { id: 1, url: 'img/2.jpg', keywords: ['man'] },
    { id: 1, url: 'img/3.jpg', keywords: ['man'] },
    { id: 1, url: 'img/4.jpg', keywords: ['soccer', 'man'] }];

var gMeme = {
    selectedImg: null,
    txts: [
        {
            line: 'left',
            size: 20,
            align: 'left',
            color: 'red'
        }
        ,
        {
            line: 'right',
            size: 20,
            align: 'right',
            color: 'blue'
        }

    ],

}



function init() {
    renderGallery(gImgs);
    renderTagBar();
}

function renderGallery(imgs) {
    var strHTML = ``;
    imgs.forEach(function(img) {
        strHTML += `<div class="img-wrapper">
                        <img onclick="saveImage(this)" src="${img.url}" />
                    </div>`
    });

    var elGalleryContainer = document.querySelector('.gallery-container');
    elGalleryContainer.innerHTML = strHTML;
}

function renderTagBar() {
    var strHTML = ``;
    var wordsBar = getTagsBar();
    for (var key in wordsBar) {
        strHTML += `<span style="font-size: ${(wordsBar[key] * 5 + 10)}px">${key}</span> </t> | `
    }

    var elTagsBar = document.querySelector('.tags-bar');
    elTagsBar.innerHTML = strHTML;
}

function saveImage(el) {
    currImg = '../' + el.getAttribute('src');
    openCanvas();
}
function saveUrl() {
    var elInputUrl = document.querySelector('.url');
    currImg = elInputUrl.value;
    openCanvas();
}

function openCanvas() {
    var elGalleryItems = document.querySelector('.gallery-items');
    elGalleryItems.style.display = 'none';

    var elMemeGenerator = document.querySelector('.meme-generator');
    elMemeGenerator.classList.toggle('open');
    editCanvas();
    closeModal();
}

function editCanvas() {
    var elCanvas = document.querySelector('.canvas');
    var ctx = elCanvas.getContext('2d');
    elCanvas.width = window.innerWidth / 2;
    elCanvas.height = window.innerHeight / 2;
    var background = new Image();

    background.src = currImg;

    background.onload = function () {
        ctx.drawImage(background, 0, 0, elCanvas.width, elCanvas.height);
    }
}


function createWordsBar() {
    var wordsBar = [];
    gImgs.forEach(function (img) {
        img.keywords.forEach(function (keywords) {
            wordsBar.push(keywords);
        });
    });

    return wordsBar;
}

function getTagsBar() {
    var wordsBar = createWordsBar();
    return wordsBar.reduce(function (acc, key) {
        if (!acc[key]) acc[key] = 1;
        else acc[key] += 1;
        return acc;
    }, {});
}
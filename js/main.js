'use strict';

console.log('Hello');
var currImg;
var ctx;
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['face', 'cartton'] },
    { id: 1, url: 'img/2.jpg', keywords: ['man'] },
    { id: 1, url: 'img/3.jpg', keywords: ['man','lklk'] },
    { id: 1, url: 'img/4.jpg', keywords: ['soccer', 'man'] }];

var gMeme = {
    selectedImg: null,
    txts: [
        // {
        //     align: 'left',
        //     size: 20,
        //     align: 'left',
        //     color: 'red'
        // }
        // ,
        // {
        //     align: 'right',
        //     size: 30,
        //     align: 'right',
        //     color: 'blue'
        // }

    ],

}


function addCanvasLine() {
    console.log('change Canvas Txt');
}

function init() {
    renderGallery(gImgs);
    renderTagBar();
}

function renderGallery(imgs) {
    var elGalleryContainer = document.querySelector('.gallery-container');
    elGalleryContainer.innerHTML = imgs.map(function(img) {
        return `<div class="img-wrapper">
                    <img onclick="saveImage(this)" src="${img.url}" />
                </div>`

    }).join('');
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
    gMeme.selectedImg = currImg;
    openCanvas();
}
function saveUrl() {
    var elInputUrl = document.querySelector('.url');
    currImg = elInputUrl.value;
    gMeme.selectedImg = currImg;
    openCanvas();
}

function openCanvas() {
    var elGalleryItems = document.querySelector('.gallery-items');
    elGalleryItems.style.display = 'none';

    var elMemeGenerator = document.querySelector('.meme-generator');
    elMemeGenerator.classList.toggle('open');
    closeModal();
    setCanvasStart();
}

function setCanvasStart() {
    var elCanvas = document.querySelector('.canvas');
    ctx = elCanvas.getContext('2d');
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


function addCanvasLine(line) {

    var line = document.getElementById('side').value;
    var font = document.getElementById('font').value;

    var testGenerate = {
        line: 'l like',
        size: 20,
        align: 'center',
        color: 'green',
        font: 'Impact',
    }
    gMeme.txts.push(testGenerate);
    printLineCanvas(line);

}

function printLineCanvas(line) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var meme = gMeme.txts[line];
    var centerPos = width/2;
    console.log(meme);
    // debugger;
    ctx.font = ''+meme.size+'px '+meme.font+' ';
    ctx.fillStyle = meme.color;
    if (meme.align === 'center') {
        console.log('entered center');
        ctx.textAlign = "center";
        ctx.fillText(meme.line,centerPos ,height/5);
    }
    else if(meme.align === 'left') {
        
        ctx.textAlign = "start";
        ctx.fillText(meme.line,width/10,height/5);
        ctx.textAlign = "end";
    }
    else if(meme.align === 'right') {
        
        ctx.textAlign = "start";
        ctx.fillText(meme.line,(width-width/10),height/5);
        ctx.textAlign = "end";
    }


}

// get the gMeme and print the canvas.

function renderCanvas(){
    
}


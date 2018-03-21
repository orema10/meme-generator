'use strict';

console.log('Hello');
var currImg;
var ctx;
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['face', 'cartoon'] },
    { id: 2, url: 'img/2.jpg', keywords: ['man'] },
    { id: 3, url: 'img/3.jpg', keywords: ['man','lklk'] },
    { id: 4, url: 'img/4.jpg', keywords: ['soccer', 'man'] }];

var gMeme = {
    selectedImg: null,
    txts: [
        {
        input: 'sopouse to be top',
        size: 27,
        align: 'center',
        color: 'green',
        font: 'David',
        startVPos: 'up',
        vPos: 0,
        hPos: 0
        

        }
        ,
        {
        input: 'sopouse to be buttom',
        size: 20,
        align: 'right',
        color: 'red',
        font: 'Impact',
        startvPos:'down',
        vPos: 0,
        hPos: 0
        }

    ],

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
    renderCanvas();
}

function renderCanvas() {
    var elCanvas = document.querySelector('.canvas');
    ctx = elCanvas.getContext('2d');
    elCanvas.width = window.innerWidth / 2;
    elCanvas.height = window.innerHeight / 2;
    var background = new Image();
    
    background.src = currImg;

    background.onload = function () {
        ctx.drawImage(background, 0, 0, elCanvas.width, elCanvas.height);
        detailsRender();
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
function changeFontSize (el,diff) {
    var idx = el.getAttribute('data-line');
    gMeme.txts[idx].size +=diff;
    renderCanvas();
}
function changeTxtSide(el) {
    var idx = el.getAttribute('data-line');
    var val = el.value;
gMeme.txts[idx].align = val;
gMeme.txts[idx].hPos = 0;
renderCanvas();
}
function changeFont(el) {
    var idx = el.getAttribute('data-line');
    var val = el.value;
    gMeme.txts[idx].font = val;
    renderCanvas();
}
function moveVertaclly (el,diff) {
    var idx = el.getAttribute('data-line');
    gMeme.txts[idx].vPos += diff;
    renderCanvas();
}
function moveHorizantlly (el,diff) {
    var idx = el.getAttribute('data-line');
    gMeme.txts[idx].hPos += diff;
   
    renderCanvas();
}
function changeInput (el) {
    var idx = el.getAttribute('data-line');
    var val = el.value;
    gMeme.txts[idx].input = val;
    renderCanvas();
}

function changeColor(el) {
    var idx = el.getAttribute('data-line');
    var val = el.value;
    console.log(val);
    gMeme.txts[idx].color = val;
    renderCanvas();
}

function handleLine(line) {
    
    var input = document.getElementById('canvas-text1').value;
    var align = document.getElementById('side').value;
    var font = document.getElementById('font').value;

    gMeme.txts[line].input = input;
    gMeme.txts[line].align = align;
    gMeme.txts[line].font = font;

    // gMeme.txts.push(testGenerate);
    renderCanvas();

}


// get the gMeme and print the canvas.

function detailsRender(){
    
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var centerPos = width/2;

    gMeme.txts.forEach(function (txt) {
        ctx.font = ''+txt.size+'px '+txt.font+' ';
        ctx.fillStyle = txt.color;
        var vPos = (txt.startVPos === 'up') ? height/5 : (height-height/5)
        console.log('line',txt.input);
        if (txt.align === 'center') {
            console.log('entered center');
            ctx.textAlign = "center";
            ctx.fillText(txt.input,centerPos +txt.hPos,vPos +txt.vPos);
        }
        else if(txt.align === 'left') {
            
            ctx.textAlign = "start";
            ctx.fillText(txt.input,width/5 +txt.hPos,vPos +txt.vPos);
            ctx.textAlign = "end";
        }
        else if(txt.align === 'right') {
            
            ctx.textAlign = "start";
            ctx.fillText(txt.input,(width-width/2.5) +txt.hPos,vPos +txt.vPos);
            ctx.textAlign = "end";
        }
        });
}



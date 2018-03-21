'use strict';

console.log('Hello');
var currImg;
var ctx;
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['face', 'cartton'] },
    { id: 2, url: 'img/2.jpg', keywords: ['Girl','money'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cartton','table','angry'] },
    { id: 4, url: 'img/4.jpg', keywords: ['girl', 'baby'] },
    { id: 5, url: 'img/5.jpg', keywords: ['girl', 'fat','what'] },
    { id: 6, url: 'img/6.jpg', keywords: ['man', 'understand'] },
    { id: 7, url: 'img/7.jpg', keywords: ['cartton', 'nerd'] },
    { id: 8, url: 'img/8.jpg', keywords: ['man', 'magician'] },
    { id: 9, url: 'img/9.jpg', keywords: ['boy', 'know'] },
    { id: 10, url: 'img/10.jpg', keywords: ['man', 'suprise'] },
    { id: 11, url: 'img/11.jpg', keywords: ['man', 'what'] },
    { id: 12, url: 'img/12.jpg', keywords: ['man', 'glasses'] },
    { id: 13, url: 'img/13.jpg', keywords: ['man', 'funny'] },
    { id: 14, url: 'img/14.jpg', keywords: ['cartton', 'spongbob'] },
    { id: 15, url: 'img/15.jpg', keywords: ['man', 'funny'] },
    { id: 16, url: 'img/16.jpg', keywords: ['chuld', 'boy', 'background'] },
    { id: 17, url: 'img/17.jpg', keywords: ['tramp', 'president'] },
    { id: 18, url: 'img/18.png', keywords: ['child', 'cartton'] },
    { id: 19, url: 'img/19.jpg', keywords: ['suprise'] },
    { id: 20, url: 'img/20.jpg', keywords: ['cat', 'pets'] },
    { id: 21, url: 'img/21.jpg', keywords: ['smoking'] },
    { id: 22, url: 'img/22.jpg', keywords: ['so'] },
    { id: 23, url: 'img/23.jpg', keywords: ['think'] },
    { id: 24, url: 'img/24.jpg', keywords: ['background'] },
    { id: 25, url: 'img/25.jpg', keywords: ['background'] },
    { id: 26, url: 'img/27.jpg', keywords: ['girl'] },
    { id: 27, url: 'img/28.jpg', keywords: ['dog', 'pets'] },
    { id: 28, url: 'img/29.jpg', keywords: ['girl'] },
    { id: 29, url: 'img/30.jpg', keywords: ['baby', 'girl'] },
    { id: 30, url: 'img/31.jpg', keywords: ['girl'] },
    { id: 31, url: 'img/32.jpg', keywords: ['girl'] },
    { id: 32, url: 'img/33.jpg', keywords: ['girl', 'fat'] },
    { id: 33, url: 'img/34.jpg', keywords: ['girl', 'fat'] },
    { id: 34, url: 'img/35.jpg', keywords: ['girl', 'money'] },
    { id: 35, url: 'img/36.jpg', keywords: ['nerd'] },
    { id: 36, url: 'img/37.jpg', keywords: ['cartton'] }];

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
        // return `<div class="img-wrapper">
        //             <img onclick="saveImage(this)" src="${img.url}" />
        //         </div>`

        return `<div onclick="saveImage(this)"class="hexagon" style="background-image: url(${img.url})">
                    <div class="hexTop"></div>
                    <div class="hexBottom"></div>
                </div>`

    }).join('');
}

function renderTagBar() {
    var strHTML = ``;
    var wordsBar = getTagsBar();
    for (var key in wordsBar) {
        strHTML += `<span class="tag" style="font-size: ${(wordsBar[key] * 5 + 10)}px" onclick="checkWords('${key}')">${key}</span> </t> | `
    }

    var elTagsBar = document.querySelector('.tags-bar');
    elTagsBar.innerHTML = strHTML;
}

function saveImage(el) {
    var img = el.style.backgroundImage;
    var firstSym = img.indexOf('"');
    var lastSym = img.lastIndexOf('"');
    currImg = img.substr((firstSym + 1) , (lastSym - 5));
    gMeme.selectedImg = '../' + currImg;
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
            wordsBar.push(keywords.toLowerCase());
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

    // var line = document.getElementById('left')

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


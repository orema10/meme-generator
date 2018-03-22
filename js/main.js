'use strict';

console.log('Hello');

//var for dragging

// variables used to get mouse position on the canvas
var $canvas = $('.canvas');

var offsetX;
var offsetY;

// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
var startX;
var startY;

// this var will hold the index of the hit-selected text
var selectedText = -1;

//end of var for dragging
var currImg;
var elCanvas = document.querySelector('.canvas');
var ctx = elCanvas.getContext('2d');

// var gCanvasStates = { width: 0, height: 0, centerPos: 0 };
var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['face', 'cartton'] },
  { id: 2, url: 'img/2.jpg', keywords: ['Girl', 'money'] },
  { id: 3, url: 'img/3.jpg', keywords: ['cartton', 'table', 'angry'] },
  { id: 4, url: 'img/4.jpg', keywords: ['girl', 'baby'] },
  { id: 5, url: 'img/5.jpg', keywords: ['girl', 'fat', 'what'] },
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
  { id: 35, url: 'img/36.jpg', keywords: ['nerd'] }
];

var gMeme = {
  selectedImg: null,
  txts: [
    {
      input: 'sopouse to be top',
      size: 40,
      align: 'center',
      color: 'white',
      font: 'Impact',
      startVPos: 'up',
      vPos: 0,
      hPos: 0,
      x: 0,
      y: 0,
      shadow: true,
      lineWidth: 1,
      width: 0
    },
    {
      input: 'sopouse to be buttom',
      size: 35,
      align: 'center',
      color: 'white',
      font: 'Impact',
      startvPos: 'down',
      vPos: 0,
      hPos: 0,
      x: 0,
      y: 0,
      shadow: true,
      lineWidth: 1,
      width: 0
    }
  ]
};

function resetTxt(idx) {
  var txt = gMeme.txts[idx];
  txt.input = '';
  txt.size = 35;
  txt.color = 'white';
  txt.font = 'Impact';
  txt.vPos = 0;
  txt.hPos = 0;
  txt.shadow = true;
  (txt.width = 0), (txt.lineWidth = 1);
}

function init() {
  renderGallery(gImgs);
  renderTagBar();
}

function renderGallery(imgs) {
  var elGalleryContainer = document.querySelector('.gallery-container');
  elGalleryContainer.innerHTML = imgs.map(function (img) {
    return `<div onclick='saveImage(this)'class='hexagon' style='background-image: url(${
      img.url
      })'>
                    <div class='hexTop'></div>
                    <div class='hexBottom'></div>
                </div>`;
  }).join('');
}

function renderTagBar() {
  var strHTML = ``;
  var wordsBar = getTagsBar();
  for (var key in wordsBar) {
    strHTML += `<span class='tag' style='font-size: ${wordsBar[key] * 5 + 10}px'
                 onclick='checkWords('${key}')'>${key}</span> </t> | `;
  }

  var elTagsBar = document.querySelector('.tags-bar');
  elTagsBar.innerHTML = strHTML;
}

function saveImage(el) {
  var img = el.style.backgroundImage;
  var firstSym = img.indexOf('"');
  var lastSym = img.lastIndexOf('"');
  currImg = img.substr(firstSym + 1, lastSym - 5);
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
  renderCanvas();
}

function renderCanvas() {
  var elCanvas = document.querySelector(".canvas");
  ctx = elCanvas.getContext("2d");
  var canvasOffset = $canvas.offset();
  offsetX = canvasOffset.left;
  offsetY = canvasOffset.top;

  elCanvas.width =  window.innerWidth / 2;
  elCanvas.height =  window.innerHeight / 2;
  // gCanvasStates.centerPos = gCanvasStates.width / 2;

  var background = new Image();

  background.src = currImg;
  
  // elCanvas.width = window.innerWidth / 2;
  // elCanvas.height = window.innerHeight / 2;

  if (background.complete) {
    ctx.drawImage(background, 0, 0, elCanvas.width, elCanvas.height);
    detailsRender();
  } else {

    background.onload = function () {

      elCanvas.width = currImg.width;
      elCanvas.height = currImg.height;
      background.onload = function () {

        ctx.drawImage(background, 0, 0, elCanvas.width, elCanvas.height);
        // console.count()
        detailsRender();
      };
    }
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

// -----------bottons changers start ---------------
function removeTxt(el) {
  var idx = el.getAttribute('data-line');
  resetTxt(idx);
  document.querySelectorAll('#canvas-text')[idx].value = '';
  renderCanvas();
}

function changeFontSize(el, diff) {
  var idx = el.getAttribute('data-line');
  gMeme.txts[idx].size += diff;
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

function moveVertaclly(el, diff) {
  var idx = el.getAttribute('data-line');
  gMeme.txts[idx].vPos += diff;
  renderCanvas();
}

function moveHorizantlly(el, diff) {
  var idx = el.getAttribute('data-line');
  gMeme.txts[idx].hPos += diff;

  renderCanvas();
}

function changeInput(el) {
  var idx = el.getAttribute('data-line');
  var val = el.value;
  gMeme.txts[idx].input = val;
  renderCanvas();
}

function changeColor(el) {
  var idx = el.getAttribute('data-line');
  var val = el.value;

  gMeme.txts[idx].color = val;
  renderCanvas();
}

function changeShadow(el) {
  var idx = el.getAttribute('data-line');
  var shadowIdx = gMeme.txts[idx].shadow;
  gMeme.txts[idx].shadow = shadowIdx ? false : true;
  renderCanvas();
}

function changeLineWidth(el, diff) {
  var idx = el.getAttribute('data-line');
  gMeme.txts[idx].lineWidth += diff;
  renderCanvas();
}

// -----------bottons changers end ---------------
function handleLine(line) {
  var input = document.getElementById('canvas-text').value;
  var align = document.getElementById('side').value;
  var font = document.getElementById('font').value;

  gMeme.txts[line].input = input;
  gMeme.txts[line].align = align;
  gMeme.txts[line].font = font;

  // gMeme.txts.push(testGenerate);
  renderCanvas();
}

// get the gMeme and print the canvas.

function detailsRender() {
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var centerPos = width / 2;
  var x;
  var y;

  gMeme.txts.forEach(function (txt) {

    if (txt.shadow) {
      ctx.lineWidth = txt.lineWidth;
      ctx.strokeStyle = 'black';
    }

    ctx.font = "" + txt.size + "px " + txt.font + " ";
    ctx.fillStyle = txt.color;
    var vPos = txt.startVPos === "up" ? height / 5 : height - height / 5;

    if (txt.align === "center") {
      x = centerPos + txt.hPos;
      y = vPos + txt.vPos;

      ctx.textAlign = "center";
      if (txt.shadow) ctx.strokeText(txt.input, x, y);
      ctx.fillText(txt.input, x, y);

    } else if (txt.align === "left") {

      x = width / 5 + txt.hPos;
      y = vPos + txt.vPos;
      ctx.textAlign = 'start';
      if (txt.shadow) ctx.strokeText(txt.input, x, y);
      ctx.fillText(txt.input, x, y);

      ctx.textAlign = "end";

    } else if (txt.align === "right") {


      x = width - width / 2.5 + txt.hPos;
      y = vPos + txt.vPos;
      ctx.textAlign = 'start';
      if (txt.shadow) ctx.strokeText(txt.input, x, y);
      ctx.fillText(txt.input, x, y);
      ctx.textAlign = 'end';
    }


    txt.width = ctx.measureText(txt.input).width;
    txt.x = x;
    txt.y = y;
  });
}

function downloadImage(el) {
  var canvas = document.querySelector('.canvas');
  var dataURL = canvas.toDataURL('image/png');
  el.href = dataURL;
}



// <-----------------------------drgging functions----------------------->
function textHittest(x, y, textIndex) {
  // console.log('intiate test');
  var txt = gMeme.txts[textIndex];
  // console.log('testing ', txt)
  console.log('start x ', x, 'txt.x ', txt.x, 'txt.width', txt.width);
  // console.log('start y ', y, 'txt.y ', txt.y, 'txt.size', txt.size);
  var xWordStart = x + (txt.width / 2)

  return (xWordStart >= txt.x && x <= txt.x + txt.width && y >= txt.y - txt.size && y <= txt.y);
}
function handleMouseDown(e) {
  e.preventDefault();
  startX = parseInt(e.clientX - offsetX);
  startY = parseInt(e.clientY - offsetY);
  // Put your mousedown stuff here
  for (var i = 0; i < gMeme.txts.length; i++) {
    if (textHittest(startX, startY, i)) {
      console.log('clicked on txt match');
      selectedText = i;
    }
  }
}


function handleMouseUp(e) {

  e.preventDefault();
  selectedText = -1;
}

function handleMouseOut(e) {
  e.preventDefault();
  selectedText = -1;
}

function handleMouseMove(e) {
  if (selectedText < 0) {
    return;
  }
  e.preventDefault();
  var mouseX = parseInt(e.clientX - offsetX);
  var mouseY = parseInt(e.clientY - offsetY);

  // Put your mousemove stuff here
  var dx = mouseX - startX;
  var dy = mouseY - startY;
  startX = mouseX;
  startY = mouseY;

  var txt = gMeme.txts[selectedText];
  txt.hPos += dx;
  txt.vPos += dy;
  renderCanvas();
}

$(".canvas").mousedown(function (e) {
  console.log('mouse down');
  handleMouseDown(e);
});
$(".canvas").mousemove(function (e) {
  handleMouseMove(e);
});
$(".canvas").mouseup(function (e) {
  handleMouseUp(e);
});
$(".canvas").mouseout(function (e) {
  handleMouseOut(e);
});


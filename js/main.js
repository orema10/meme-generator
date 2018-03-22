"use strict";

console.log("Hello");
var currImg;
var ctx;
var gImgs = [
  { id: 1, url: "img/1.jpg", keywords: ["face", "cartton"] },
  { id: 2, url: "img/2.jpg", keywords: ["Girl", "money"] },
  { id: 3, url: "img/3.jpg", keywords: ["cartton", "table", "angry"] },
  { id: 4, url: "img/4.jpg", keywords: ["girl", "baby"] },
  { id: 5, url: "img/5.jpg", keywords: ["girl", "fat", "what"] },
  { id: 6, url: "img/6.jpg", keywords: ["man", "understand"] },
  { id: 7, url: "img/7.jpg", keywords: ["cartton", "nerd"] },
  { id: 8, url: "img/8.jpg", keywords: ["man", "magician"] },
  { id: 9, url: "img/9.jpg", keywords: ["boy", "know"] },
  { id: 10, url: "img/10.jpg", keywords: ["man", "suprise"] },
  { id: 11, url: "img/11.jpg", keywords: ["man", "what"] },
  { id: 12, url: "img/12.jpg", keywords: ["man", "glasses"] },
  { id: 13, url: "img/13.jpg", keywords: ["man", "funny"] },
  { id: 14, url: "img/14.jpg", keywords: ["cartton", "spongbob"] },
  { id: 15, url: "img/15.jpg", keywords: ["man", "funny"] },
  { id: 16, url: "img/16.jpg", keywords: ["chuld", "boy", "background"] },
  { id: 17, url: "img/17.jpg", keywords: ["tramp", "president"] },
  { id: 18, url: "img/18.png", keywords: ["child", "cartton"] },
  { id: 19, url: "img/19.jpg", keywords: ["suprise"] },
  { id: 20, url: "img/20.jpg", keywords: ["cat", "pets"] },
  { id: 21, url: "img/21.jpg", keywords: ["smoking"] },
  { id: 22, url: "img/22.jpg", keywords: ["so"] },
  { id: 23, url: "img/23.jpg", keywords: ["think"] },
  { id: 24, url: "img/24.jpg", keywords: ["background"] },
  { id: 25, url: "img/25.jpg", keywords: ["background"] },
  { id: 26, url: "img/27.jpg", keywords: ["girl"] },
  { id: 27, url: "img/28.jpg", keywords: ["dog", "pets"] },
  { id: 28, url: "img/29.jpg", keywords: ["girl"] },
  { id: 29, url: "img/30.jpg", keywords: ["baby", "girl"] },
  { id: 30, url: "img/31.jpg", keywords: ["girl"] },
  { id: 31, url: "img/32.jpg", keywords: ["girl"] },
  { id: 32, url: "img/33.jpg", keywords: ["girl", "fat"] },
  { id: 33, url: "img/34.jpg", keywords: ["girl", "fat"] },
  { id: 34, url: "img/35.jpg", keywords: ["girl", "money"] },
  { id: 35, url: "img/36.jpg", keywords: ["nerd"] },
  { id: 36, url: "img/37.jpg", keywords: ["cartton"] }
];

var gMeme = {
  selectedImg: null,
  txts: [
    {
      input: "sopouse to be top",
      size: 40,
      align: "center",
      color: "white",
      font: "Impact",
      startVPos: "up",
      vPos: 0,
      hPos: 0,
      shadow: true,
      lineWidth:1
    },
    {
      input: "sopouse to be buttom",
      size: 35,
      align: "center",
      color: "white",
      font: "Impact",
      startvPos: "down",
      vPos: 0,
      hPos: 0,
      shadow: true,
      lineWidth:1
    }
  ]
};

function resetTxt(idx){
  var txt = gMeme.txts[idx];
  txt.input = "";
  txt.size = 35;
  txt.color = "white";
  txt.font = "Impact";
  txt.vPos = 0;
  txt.hPos = 0;
  txt.shadow = true;
  txt.lineWidth = 1;

}

function init() {
  renderGallery(gImgs);
  renderTagBar();
}

function renderGallery(imgs) {
  var elGalleryContainer = document.querySelector(".gallery-container");
  elGalleryContainer.innerHTML = imgs
    .map(function (img) {
      return `<div onclick="saveImage(this)"class="hexagon" style="background-image: url(${
        img.url
        })">
                    <div class="hexTop"></div>
                    <div class="hexBottom"></div>
                </div>`;
    })
    .join('');
}

function renderTagBar() {
  var strHTML = ``;
  var wordsBar = getTagsBar();
  for (var key in wordsBar) {
    strHTML += `<span class="tag" style="font-size: ${wordsBar[key] * 5 +
      10}px" onclick="checkWords('${key}')">${key}</span> </t> | `;
  }

  var elTagsBar = document.querySelector(".tags-bar");
  elTagsBar.innerHTML = strHTML;
}

function saveImage(el) {
  var img = el.style.backgroundImage;
  var firstSym = img.indexOf('"');
  var lastSym = img.lastIndexOf('"');
  currImg = img.substr(firstSym + 1, lastSym - 5);
  gMeme.selectedImg = "../" + currImg;
  openCanvas();
}
function saveUrl() {
  var elInputUrl = document.querySelector(".url");
  currImg = elInputUrl.value;
  gMeme.selectedImg = currImg;
  openCanvas();
}

function openCanvas() {
  var elGalleryItems = document.querySelector(".gallery-items");
  elGalleryItems.style.display = "none";

  var elMemeGenerator = document.querySelector(".meme-generator");
  elMemeGenerator.classList.toggle("open");
  closeModal();
  renderCanvas();
}

function renderCanvas() {
  var elCanvas = document.querySelector(".canvas");
  ctx = elCanvas.getContext("2d");
  elCanvas.width = window.innerWidth / 2;
  elCanvas.height = window.innerHeight / 2;
  var background = new Image();

  background.src = currImg;

  background.onload = function () {
    ctx.drawImage(background, 0, 0, elCanvas.width, elCanvas.height);
    detailsRender();
  };
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
  var idx = el.getAttribute("data-line");
  resetTxt(idx);
  document.querySelectorAll('#canvas-text')[idx].value = '';
  renderCanvas();
}
function changeFontSize(el, diff) {
  var idx = el.getAttribute("data-line");
  gMeme.txts[idx].size += diff;
  renderCanvas();
}
function changeTxtSide(el) {
  var idx = el.getAttribute("data-line");
  var val = el.value;
  gMeme.txts[idx].align = val;
  gMeme.txts[idx].hPos = 0;
  renderCanvas();
}
function changeFont(el) {
  var idx = el.getAttribute("data-line");
  var val = el.value;
  gMeme.txts[idx].font = val;
  renderCanvas();
}
function moveVertaclly(el, diff) {
  var idx = el.getAttribute("data-line");
  gMeme.txts[idx].vPos += diff;
  renderCanvas();
}
function moveHorizantlly(el, diff) {
  var idx = el.getAttribute("data-line");
  gMeme.txts[idx].hPos += diff;

  renderCanvas();
}
function changeInput(el) {
  var idx = el.getAttribute("data-line");
  var val = el.value;
  gMeme.txts[idx].input = val;
  renderCanvas();
}

function changeColor(el) {
  var idx = el.getAttribute("data-line");
  var val = el.value;
  
  gMeme.txts[idx].color = val;
  renderCanvas();
}
function changeShadow(el) {
  var idx = el.getAttribute("data-line");
  var shadowIdx = gMeme.txts[idx].shadow;
  gMeme.txts[idx].shadow = shadowIdx ? false : true;
  renderCanvas();
}
function changeLineWidth(el,diff) {
  var idx = el.getAttribute("data-line");
  gMeme.txts[idx].lineWidth += diff;
  renderCanvas();
}
// -----------bottons changers end ---------------
function handleLine(line) {
  var input = document.getElementById("canvas-text").value;
  var align = document.getElementById("side").value;
  var font = document.getElementById("font").value;

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


  gMeme.txts.forEach(function (txt) {

    if (txt.shadow) {
      ctx.lineWidth = txt.lineWidth;
      ctx.strokeStyle = 'black';
    }
  
    ctx.font = "" + txt.size + "px " + txt.font + " ";
    ctx.fillStyle = txt.color;
    var vPos = txt.startVPos === "up" ? height / 5 : height - height / 5;
    
    if (txt.align === "center") {

     
      ctx.textAlign = "center";
      if (txt.shadow) ctx.strokeText(txt.input, centerPos + txt.hPos, vPos + txt.vPos);
      ctx.fillText(txt.input, centerPos + txt.hPos, vPos + txt.vPos);

    } else if (txt.align === "left") {

      ctx.textAlign = "start";
      if (txt.shadow) ctx.strokeText(txt.input, width / 5 + txt.hPos, vPos + txt.vPos);
      ctx.fillText(txt.input, width / 5 + txt.hPos, vPos + txt.vPos);
      ctx.textAlign = "end";

    } else if (txt.align === "right") {

      ctx.textAlign = "start";
      if (txt.shadow) ctx.strokeText(txt.input, width - width / 2.5 + txt.hPos, vPos + txt.vPos);
      ctx.fillText(txt.input, width - width / 2.5 + txt.hPos, vPos + txt.vPos);
      ctx.textAlign = "end";
    }
  });
}


function downloadImage(el) {
  var canvas = document.querySelector('.canvas');
  var dataURL = canvas.toDataURL('image/png');
  el.href = dataURL;
}
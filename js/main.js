'use strict';

console.log('Hello');
var nextIdCount = 1;

var gImgs = [{id: 1, url: 'img/popo.jpg', keywords: ['happy']}];



function createImg (nextId,url,keywords) {

var img = {
id: nextId,
url: url,
keywords: keywords,
}
nextIdCount++;

return img;
}
'use strict';

console.log('Hello');
var nextIdCount = 1;

var gImgs = [{id: 1, url: 'img/popo.jpg', keywords: ['happy']}];



function createImg (nextId,url,keywords) {
return {
id: nextId,
url: url,
keywords: keywords,
}
}
'use strict';
function runSearch(elInput) {
    var input = elInput.value;
    var imgToSerch = gImgs.filter(function(img) {
        var isValid = img.keywords.some(function(keyword) {
            return keyword.includes(input);
        });

        return isValid;
    });

    renderGallery(imgToSerch);
}

function closeModal() {
    var elModal = document.querySelector('#openModal');
    elModal.style.display = 'none';
}
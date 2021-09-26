const $ = document;

const popupElement = $.querySelector('#info-popup');
const popupTextElement = popupElement.children[0];
const popupNextBtnElement = $.querySelector('#info-popup > button')

popupNextBtnElement.addEventListener('click', function(e){
    popupTextElement.innerHTML = "";
    popupElement.style.display = "none";
})

function popupInfo(text){
    //refers to the p tag in the popup div
    popupTextElement.innerHTML = text;
    popupElement.style.display = "initial"
}
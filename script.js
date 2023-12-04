let cards = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
let actualCard = [];
let flipped = [];
let pair = [];

randomizeCards();
for (i = 0; i < cards.length; i ++) {
    let thingy = document.getElementById("image" + (i + 1)); 
    thingy.dataset.photoid = cards[i];
    thingy.dataset.id = i;
    thingy.dataset.flipped = false;
    actualCard.push(thingy);
}

for (let cards of actualCard){
    cards.addEventListener('click', function() {
        if (cards.dataset.flipped === "false"){
            flip(cards);
        }
    })
}

function randomizeCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function flip(element) {
    if (pair.length < 2) {
        pair.push(element);
        element.setAttribute("src", element.dataset.photoid + ".jpg");
    }   
    if (pair.length == 2){
        if ((pair[0].dataset.photoid === pair[1].dataset.photoid) === true) {
            console.log("SUPRISE");
            flipped.push(pair[0], pair[1]);
            pair[0].dataset.flipped = true;
            pair[1].dataset.flipped = true;
            pair = [];
        }else {
            setTimeout(function(){
                for (let card of pair){
                    card.setAttribute("src", "mystery.png");
                }
                pair = [];}, 1000);
        }
    }
}
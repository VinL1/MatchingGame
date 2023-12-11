let cards = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
let actualCard = [];
let flipped = [];
let pair = [];
let score = 0;

randomizeCards();
document.getElementById('score').innerHTML = `Score: ${score}`;
for (i = 0; i < cards.length; i ++) {
    let thingy = document.getElementById("image" + (i + 1)); 
    thingy.dataset.photoid = cards[i];
    thingy.dataset.id = i;
    thingy.dataset.flipped = false;
    actualCard.push(thingy);
}

for (let cards of actualCard){
    cards.addEventListener('click', function(){
        addFlip(cards)
    });
}

document.getElementById('refreshButton').addEventListener('click', function() {
    location.reload();
});

function randomizeCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function addFlip(obj){
    if (obj.dataset.flipped === "false"){
        flip(obj);
    }
}

function flip(element) {
    if (pair.length < 2) {
        pair.push(element);
        element.setAttribute("src", element.dataset.photoid + ".jpg");
    }   
    if (pair.length == 2){
        if (pair[0].dataset.flipped === true && pair[1].dataset.flipped === true){
            return;
        }
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
    score ++;
    document.getElementById('score').innerHTML = `Score: ${score}`;
    if(flipped.length === 16) {
        gameEnd();
    }
}

function gameEnd(){
    if (score <= 16){
        alert("Huh? This isn't possible. You cheater!");
    }else if(score > 16 && score <=24){
        alert("Not bad! Congratulations, you've won the game!");
    }else if(score > 24 && score <= 32) {
        alert("Congrats, you've completed the game! You are certainly one of the winners");
    }else{
        alert("Yikes... Better luck next time");
    }
    for (let cards of actualCard){
        cards.removeEventListener('click', flip);
    }
}
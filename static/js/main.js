let blackJackGame = {
    "player": {"scoreSpan":"#player1-card-count", "div":"#player1", "score":0},
    "dealer": {"scoreSpan":"#dealer-card-count", "div":"#dealer","score":0},
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "Q", "K"],
    "cardsMap": {"2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6,
                 "7" : 7, "8" : 8, "9" : 9, "10" : 10, "J" : 10,
                  "Q" : 10, "K" : 10, "A" : 1},
};

const player = blackJackGame["player"];
const dealer = blackJackGame["dealer"];

const hitSound = new Audio("static/sounds/swish.m4a");

document.querySelector('#blackJack-hit-button').addEventListener('click',blackJackHit);
document.querySelector('#blackJack-deal-button').addEventListener('click',blackJackDeal);

function blackJackHit()
{
    let card = randomCard();
    console.log(card);
    showCard(dealer, card);
    showCard(player, card);
    updateCardCount(player, card);
    updateCardCount(dealer, card);
    showCardCount(player);
    showCardCount(dealer);
    console.log(player["score"]);
}

function showCard(activePlayer, card)
{   
    if(player["score"]<=21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        cardImage.width = "150";
        cardImage.height = "180";
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        hitSound.play();
    }
}

function blackJackDeal()
{
    let playerImages = document.querySelector(player["div"]).querySelectorAll('img');
    let dealerImages = document.querySelector(dealer["div"]).querySelectorAll('img');
    for(let i=0; i<playerImages.length;i++)
    {
        playerImages[i].remove();
    }
    for(let i=0; i<dealerImages.length;i++)
    {
        dealerImages[i].remove();
    }

    player["score"] = 0;
    dealer["score"] = 0;
    document.querySelector(player["scoreSpan"]).textContent = player["score"];
    document.querySelector(player["scoreSpan"]).style.color = "#ffffff";
    document.querySelector(dealer["scoreSpan"]).textContent = dealer["score"];
    document.querySelector(dealer["scoreSpan"]).style.color = "#ffffff";
}

function randomCard()
{
    let randomIdx = Math.floor(Math.random()*13);
    return blackJackGame["cards"][randomIdx];
}

function updateCardCount(player, card)
{
    player["score"] += blackJackGame["cardsMap"][card];
}

function showCardCount(player)
{
    if(player["score"]>21)
    {
        document.querySelector(player["scoreSpan"]).textContent = "BUST";
        document.querySelector(player["scoreSpan"]).style.color = "red";
    }
    else
    {
        document.querySelector(player["scoreSpan"]).textContent = player["score"];
    }
}
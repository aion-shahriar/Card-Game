let deckId
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")
lost_game()

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            deckId = data.deck_id
            console.log(deckId)
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText
            
            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if (computerScore > myScore) {
                    // display "The computer won the game!"
                    header.textContent = "The computer won the game!"
                    alert("😢 You lost the game, Deliver your Kindey ASAP");
                    

                } else if (myScore > computerScore) {
                    // display "You won the game!"
                    header.textContent = "You won the game!"
                    celebration();
                } else {
                    // display "It's a tie game!"
                    header.textContent = "It's a tie game!"
                }
            }
        })
})



function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}



function celebration() {
    const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
    );
    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
    );
    }, 250);
}






// function lost_game() {
//     confetti({
//         particleCount: 40,       // fewer, like individual tears
//         angle: 90,               // straight down
//         spread: 10,              // very narrow
//         startVelocity: 15,       // gentle fall
//         gravity: 1.8,            // heavier than normal
//         ticks: 200,              // stay visible longer
//         shapes: ['circle'],      // rounded like drops
//         scalar: 0.7,             // small size
//         colors: ['#4a90e2', '#357ABD', '#5DADEC', '#7BB8E8'], // blue shades
//         origin: { x: 0.5, y: 0 } // from the top center
//     });
// }



// function lost_game() { // 😢 Lost game effect
//     const duration = 15 * 1000,
//     animationEnd = Date.now() + duration,
//     defaults = { 
//         startVelocity: 12,      // slow
//         spread: 30,             // narrow spread
//         ticks: 200,             // linger longer
//         gravity: 1.5,           // heavier drop
//         colors: ['#4a90e2', '#357ABD', '#5DADEC', '#7BB8E8', '#555', '#777'], // sad colors
//         shapes: ['😔'],     // tear-like
//         zIndex: 0 
//     };

//     function randomInRange(min, max) {
//         return Math.random() * (max - min) + min;
//     }

//     const interval = setInterval(function() {
//         const timeLeft = animationEnd - Date.now();

//         if (timeLeft <= 0) {
//             return clearInterval(interval);
//         }

//         const particleCount = 8 * (timeLeft / duration); // fewer particles

//         // Drop from center-left
//         confetti(Object.assign({}, defaults, {
//             particleCount,
//             origin: { x: randomInRange(0.4, 0.45), y: 0 }
//         }));
//         // Drop from center-right
//         confetti(Object.assign({}, defaults, {
//             particleCount,
//             origin: { x: randomInRange(0.55, 0.6), y: 0 }
//         }));
//     }, 250);
// }




function lost_game() {
    const duration = 3000; // 3 seconds
    const animationEnd = Date.now() + duration;

    const defaults = {
        angle: 90,               // fall straight down
        spread: 10,              // very narrow
        startVelocity: 12,       // gentle drop
        gravity: 1.8,            // sink faster
        ticks: 200,              // stay visible longer
        scalar: 1.5,             // bigger emoji size
        shapes: ['text'],
        text: '😢',              // sad face emoji
        origin: { x: 0.5, y: 0 } // from top center
    };

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        confetti(Object.assign({}, defaults, {
            particleCount: 5
        }));
    }, 250);
}




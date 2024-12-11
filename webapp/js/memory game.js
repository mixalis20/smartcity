const cardArray = [
    {
        name: 'fries',
        img: '/webapp/images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: '/webapp/images/cheeseburger.png',
    },
    {
        name: 'hotbog',
        img: '/webapp/images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: '/webapp/images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: '/webapp/images/milkshake.png',
    },
    {
        name: 'pizza',
        img: '/webapp/images/pizza.png',
    },
    {
        name: 'fries',
        img: '/webapp/images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: '/webapp/images/cheeseburger.png',
    },
    {
        name: 'hotbog',
        img: '/webapp/images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: '/webapp/images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: '/webapp/images/milkshake.png',
    },
    {
        name: 'pizza',
        img: '/webapp/images/pizza.png',
    }
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

function createBoard () {
    for (let i = 0; i < cardArray.length; i++) {
       const card = document.createElement('img')
       card.setAttribute('src', '/webapp/images/blank.png')
       card.setAttribute('data-id', i)
       card.addEventListener('click', flipCard)
       gridDisplay.appendChild(card)

    }
}
createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    console.log(cards)
    console.log('check for match!')
    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', '/webapp/images/blank.png')
        cards[optionTwoId].setAttribute('src', '/webapp/images/blank.png')
        alert('You have clicked the same image!')
    }

    if (cardsChosen[0] == cardsChosen[1]) {
        alert('You found a match!')
        cards[optionOneId].setAttribute('src', '/webapp/images/white.png')
        cards[optionTwoId].setAttribute('src', '/webapp/images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    }else {
        cards[optionOneId].setAttribute('src', '/webapp/images/blank.png')
        cards[optionTwoId].setAttribute('src', '/webapp/images/blank.png')
        alert('Sorry try again!')
    }
    resultDisplay.textContent = cardsWon.length
        cardsChosen = []
    cardsChosenIds = []

    if(cardsWon.length == cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations you found them all!'
    }

}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    console.log(cardsChosen)
    console.log(cardsChosenIds)
    this.setAttribute('src', cardArray[cardId].img)
    if(cardsChosen.length === 2) {
        setTimeout( checkMatch, 500)
    }
}
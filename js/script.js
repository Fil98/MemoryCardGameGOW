


 const cards = document.querySelectorAll('.card') //константа card -  составляет список всех элементов карты и сохраняет их в константе
 let hasFlippedCard = false // переменная перевернутой карты

 let firstCard, secondCard // задание переменных первой и второй карты
 let lockBoard = false // переменная блокирование доски карты
 
//  При каждом нажатии на карточку будет вызываться функция flip
// this отвечает за нажатую карточку
 function flipCard() {
    
     if(lockBoard) return // внутри flipCard(), если lockBoard имеет значение true, возврат из функции. это мешает другим картам переворачиваться
      if(this === firstCard) return

     this.classList.add('flip')

// // если hasFlippedCard равно false, это первая карта, которую щелкнул игрок. если true, это вторая карта, на которую нажал игрок
// Если ни одна карточка не перевёрнута, значение hasFlippedCard устанавливается равным true
//  а нажатой карточке присваивается flippedCard
     if(!hasFlippedCard) {
        hasFlippedCard = true
         firstCard = this  // это в данном контексте представляет собой первую 
        return
      }

     hasFlippedCard = false
     secondCard = this // это в данном контексте представляет вторую карту
    
    checkForMath();
 }
// Чтобы получить доступ к значениям данных, которые мы установили в HTML, мы должны использовать объект .dataset:
 function checkForMath() {
    //  случае совпадения будет вызван метод disableCards()
   if(firstCard.dataset.card === secondCard.dataset.card){
         disableCards()
        return
    }

    unflipCards()
 }

// обработчики событий будут откреплены от обеих карточек, чтобы предотвратить их переворот
function disableCards() {
    // если они одинаковы, удалите прослушиватель событий и функцию flipCard, чтобы их нельзя было щелкнуть и перевернуть:
     firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

     resetBoard()
}

// В противном случае метод unflipCards() перевернёт обе карточки с помощью 1500 мс тайм-аута, который удалит класс .flip:
// если не совпадают, удаляем класс флипа, чтобы они вернулись назад. Поскольку это происходит так быстро, мы должны обернуть это в метод таймера:
function unflipCards() {
    lockBoard = true //Если первые две карты не совпадают, заблокируйте доску и разблокируйте ее только в том случае, если другие карты были перевернуты. Разблокируем доску в unflipCards()
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1500)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}
// // Math.random() возвращает число от 0 до 1, исключая 1. Поскольку нам нужно число от 0 до 11, мы умножаем Math.random на 12.
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12)
        card.style.order = randomPosition
    })
})()

// // перебирает список элементов карточки и ожидает события click, запускающего функцию flipCard
cards.forEach((card) => {
    card.addEventListener('click', flipCard)	
})
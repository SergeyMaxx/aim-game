let startBtn = document.getElementById('start')
let screens = document.querySelectorAll('.screen')
let timeList = document.getElementById('time-list')
let timeEl = document.getElementById('time')
let board = document.getElementById('board')
let oneMoreButton = document.createElement('button')
let time = 0
let score = 0
let colors = ['red', 'blue', 'green', 'yellow', 'orange', 'lightseagreen', 'coral', 'violet', 'lime']

startBtn.addEventListener('click', event => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = +event.target.getAttribute('data-time')
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

oneMoreButton.addEventListener('click', () => location.reload())

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  }
  else {
    let current = --time
    if (current < 10) {
      current = '0' + current
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = '00:' + value
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
  oneMoreButton.innerText = 'Ещё раз'
  oneMoreButton.classList.add('time-btn')
  board.append(oneMoreButton)
}

function createRandomCircle() {
  let circle = document.createElement('div')
  let size = getRandomNumber(10, 60)
  let {width, height} = board.getBoundingClientRect()
  circle.classList.add('circle')
  circle.style.width = size + 'px'
  circle.style.height = size + 'px'
  circle.style.top = getRandomNumber(0, height - size) + 'px'
  circle.style.left = getRandomNumber(0, width - size) + 'px'
  let color = colors[Math.floor(Math.random() * colors.length)]
  circle.style.background = color
  circle.style.boxShadow = `0 0 10px 3px ${color}`
  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
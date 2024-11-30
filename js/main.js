document.addEventListener('DOMContentLoaded', function () {
	const ruletkaBtn = document.querySelector('.main-ruletka__btn')
	const ruletkaWhel = document.querySelector('.main-ruletka__wheel-img')
	const attempts = document.querySelector('.main__attempts')
	const prizeFirst = document.querySelector('.main__prize')
	const prizeSecond = document.querySelector('.main__prize-two')
	const prizeThird = document.querySelector('.main__prize-three')
	const popup = document.querySelector('.popup')

	const attemptsText = 'You have the last attempt'
	let countWhel = 0
	let isButtonClicked = false

	firstScroll = 2100
	secondScroll = 4500
	thirdScrole = 6970

	if (ruletkaBtn) {
		ruletkaBtn.addEventListener('click', () => {
			if (isButtonClicked) return
			isButtonClicked = true
			ruletkaBtn.classList.add('stop-pulse')

			if (countWhel === 0) {
				prize(firstScroll, attemptsText, prizeFirst)
			} else if (countWhel === 1) {
				prize(secondScroll, attemptsText, prizeSecond)
			} else if (countWhel === 2) {
				prize(thirdScrole, '', prizeThird, prizeSecond)
			}
		})
	} else {
		console.error('Кнопка .main-ruletka__btn не найдена.')
	}

	const prize = (scrolling, text, prizePoint, hideBlock = '') => {
		ruletkaWhel.style.transform = `rotate(${Math.ceil(scrolling)}deg)`
		setTimeout(() => {
			hideBlock ? (hideBlock.style.display = 'none') : null
			attempts.textContent = text
			prizePoint.style.display = 'block'
			isButtonClicked = false
			ruletkaBtn.classList.remove('stop-pulse')

			countWhel === 3 ? finish() : null
		}, 5000)
		countWhel++
	}

	const finish = () => {
		ruletkaBtn.style.display = 'none'
		setTimeout(() => {
			popup.style.display = 'flex'
			//запрет на скролл страницы
			document.documentElement.style.overflow = 'hidden' 
			document.documentElement.style.height = '100%' 
			document.body.style.overflow = 'hidden'
			document.body.style.height = '100%' 
		}, 3000)
	}
})

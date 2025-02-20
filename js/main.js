function launchConfetti() {
	if (window.confetti) {
		const isMobile = window.matchMedia('(max-width: 1040px)').matches
		const confettiConfig = isMobile
			? { origin: { x: 0.5, y: 0.85 } } // Позиция для мобильного
			: { origin: { x: 0.4, y: 0.7 } } // Позиция для десктопа
		confetti({
			particleCount: 500, // Количество частиц
			spread: 60, // Угол распыления 0, чтобы частицы летели строго вверх
			...confettiConfig,
			angle: 90, // Направление вверх
			gravity: 0.1, // Гравитация, чтобы частицы падали вниз
			scalar: 1.3, // Увеличение размера частиц для лучшего визуального эффекта
			zIndex: 9999, // Убедиться, что конфетти поверх других элементов
		})
	} else {
		console.error('Confetti library is not loaded.')
	}
}

document.addEventListener('DOMContentLoaded', function () {
	const ruletkaBtn = document.querySelector('.main-ruletka__btn')
	const ruletkaBtnCenter = document.querySelector('.main-ruletka__arrow')

	const ruletkaWhel = document.querySelector('.main-ruletka__wheel-img')
	const prizeFirst = document.querySelector('.main__prize')

	const popup = document.querySelector('.popup')

	const firstLampOff = document.querySelectorAll('.first-off')
	const firstLampOn = document.querySelectorAll('.first-on')
	const secondLampOff = document.querySelectorAll('.second-off')
	const secondLampOn = document.querySelectorAll('.second-on')

	const attemptsText = 'You have the last attempt'
	let isButtonClicked = false

	firstScroll = 2100
	secondScroll = 4500
	thirdScrole = 6970

	if (ruletkaBtn || ruletkaBtnCenter) {
		const buttons = [ruletkaBtn, ruletkaBtnCenter] // Объединяем в массив

		buttons.forEach(button => {
			if (!button) return // Пропускаем, если кнопка не найдена

			button.addEventListener('click', () => {
				if (isButtonClicked) return // Предотвращаем повторное нажатие
				isButtonClicked = true
				button.classList.add('stop-pulse') // Добавляем класс для остановки пульсации

				prize(firstScroll, prizeFirst)
			})
		})
	} else {
		console.error('Одна или обе кнопки не найдены.')
	}

	const prize = (scrolling, prizePoint) => {
		ruletkaWhel.style.transform = `rotate(${Math.ceil(scrolling)}deg)`

		// Модифицируем функцию lamp для обработки 0 и 1
		let lampState = 0 // Начальное состояние лампы (выключена)

		// Создаем таймер, который будет переключать лампы каждые 0.3 секунды
		const lampInterval = setInterval(() => {
			lamp(firstLampOff, firstLampOn, secondLampOff, secondLampOn, lampState)
			lampState = lampState === 0 ? 1 : 0 // Меняем состояние на противоположное
		}, 300) // 300 мс (0.3 секунды)

		// Через 5 секунд остановим цикл и выполняем дальнейшие действия
		setTimeout(() => {
			clearInterval(lampInterval) // Останавливаем цикл
			launchConfetti() // Запуск конфетти после загрузки скрипта
			prizePoint.style.display = 'block'
			isButtonClicked = false
			ruletkaBtn.classList.remove('stop-pulse')
			finish()
		}, 5000) // Таймаут 5 секунд
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

const lamp = (firstOff, firstOn, secondOn, secondOff, switchPosition) => {
	if (switchPosition) {
		firstOff.forEach(lamp => {
			lamp.style.display = 'none'
		})
		firstOn.forEach(lamp => {
			lamp.style.display = 'none'
		})
		secondOff.forEach(lamp => {
			lamp.style.display = 'block'
		})
		secondOn.forEach(lamp => {
			lamp.style.display = 'block'
		})
	} else {
		firstOff.forEach(lamp => {
			lamp.style.display = 'block'
		})
		firstOn.forEach(lamp => {
			lamp.style.display = 'block'
		})
		secondOff.forEach(lamp => {
			lamp.style.display = 'none'
		})
		secondOn.forEach(lamp => {
			lamp.style.display = 'none'
		})
	}
}

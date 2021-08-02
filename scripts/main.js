'use strict'

const bill = document.querySelector('.input--bill')
const numberOfPeople = document.querySelector('.input--people')
const tipAmount = document.querySelector('.tip-amount')
const total = document.querySelector('.total')
const resetBtn = document.querySelector('.btn--reset')
const buttons = document.querySelector('.grid-buttons')
const customAmount = document.querySelector('.input--amount')
const peopleError = document.querySelector('.people-error')
let percent = 0

buttons.addEventListener('click', e => {
	e.stopPropagation()
	if (e.target.parentNode != buttons) return
	if (e.target.localName == 'button') percent = parseFloat(e.target.textContent)
	validation()
	activateResetButton()
	selectTipButtons(e)
})

customAmount.addEventListener('input', e => {
	if (/\d+/.test(customAmount.value)) percent = parseFloat(customAmount.value)
	validation()
	activateResetButton()
})

numberOfPeople.addEventListener('input', e => {
	validation()
	activateResetButton()
})

bill.addEventListener('input', e => {
	validation()
	activateResetButton()
})

resetBtn.addEventListener('click', e => {
	bill.value = ''
	numberOfPeople.value = ''
	buttons.children[5].value = ''
	tipAmount.textContent = '0.00'
	total.textContent = '0.00'
	resetBtn.classList.add('btn--ghost')
	selectTipButtons() //restablece los botones a su valor por defecto
})

const validation = () => {
	if (numberOfPeople.value != 0 && bill.value != ' ') {
		showResult(numberOfPeople.value, bill.value, percent)
		peopleError.textContent = ''
		numberOfPeople.classList.remove('input--error')
	} else showError()
}

const showResult = (people, bill, percent) => {
	;(bill = parseFloat(bill)), (people = parseFloat(people))
	if (isNaN(bill)) bill = 0 //para los casos en que bill es ''
	let tip = (bill * percent) / 100
	tipAmount.textContent = (tip / people).toFixed(2)
	total.textContent = ((bill + tip) / people).toFixed(2)
}

const showError = () => {
	peopleError.textContent = 'Can’t be zero'
	numberOfPeople.classList.add('input--error')
}

const activateResetButton = () => {
	resetBtn.classList.remove('btn--ghost')
}

const selectTipButtons = e => {
	for (let button of buttons.children) {
		button.classList.remove('btn--green')
		button.classList.remove('input--active')
	}

	if (e == undefined) return //para restablecer las clases al tocar 'reset'
	if (buttons.children[5] == e.target) e.target.classList.add('input--active')
	else if (e.target.parentNode == buttons) e.target.classList.add('btn--green')
}

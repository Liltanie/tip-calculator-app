'use strict'

const bill = document.querySelector('.input--bill')
const numberOfPeople = document.querySelector('.input--people')
const tipAmount = document.querySelector('.tip-amount')
const total = document.querySelector('.total')
const reset = document.querySelector('.btn--reset')
const buttons = document.querySelector('.grid-buttons')
const customAmount = document.querySelector('.input--amount')
const peopleError = document.querySelector('.people-error')
let percent = 0

buttons.addEventListener('click', e => {
	e.stopPropagation()
	if (e.target.localName == 'button') percent = parseFloat(e.target.textContent)
	validation()
})

customAmount.addEventListener('input', e => {
	if (/\d+/.test(customAmount.value)) percent = parseFloat(customAmount.value)
	validation()
})

numberOfPeople.addEventListener('input', e => {
	validation()
})

bill.addEventListener('input', e => {
	validation()
})

const validation = () => {
	if (numberOfPeople.value != 0 && bill.value != ' ') {
		showResult(numberOfPeople.value, bill.value, percent)
		peopleError.textContent = ''
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
	peopleError.textContent = "Can't be zero"
}

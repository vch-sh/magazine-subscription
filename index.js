// 0. Swiper
const swiper = new Swiper('.swiper', {
	allowTouchMove: false,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
	},
	speed: 500,
	spaceBetween: 20,
	keyboard: true
});

// 1. DOM
const subButton 		= document.querySelector('.sub-button');

const subscriptionInput 	= document.querySelector('.subscription__input');
const nameInput 		= document.querySelector('.name-input');
const userName 			= document.querySelector('.user-name');
const nameButton 		= document.querySelector('.name-button');

const plansInputs 		= document.querySelectorAll('input[name="group_1"]');
const plansButton 		= document.querySelector('.plans-button');

const subscriptionPaymentInput 	= document.querySelector('.subscription__payment-input');
const userPaymentName 		= document.querySelector('.user-payment-name');

const inputDay 			= document.querySelector('.input-day');
const inputMonth 		= document.querySelector('.input-month');
const inputYear 		= document.querySelector('.input-year');
const dateButton 		= document.querySelector('.date-button');

const inputEmail 		= document.querySelector('.input__email');
const emailButton 		= document.querySelector('.email-button');

const paymentName 		= document.querySelector('.payment-name');
const paymentCard 		= document.querySelector('.payment-card');
const paymentExpiry 		= document.querySelector('.peyment-expiry');
const paymentCVC 		= document.querySelector('.payment-cvc');
const submitButton 		= document.querySelector('.submit-button');

// 2. Variables
let checkInputDate;
let checkInputYear;

let checkPaymentName;
let checkPaymentCard;
let checkPaymentExpiry;
let checkPaymentCVC;

// 3. Input Events
nameInput.addEventListener('blur', () => {
	localStorage.setItem('name', nameInput.value);
	userName.textContent = localStorage.name;
});

subscriptionPaymentInput.addEventListener('blur', () => {
	localStorage.setItem('paymentName', subscriptionPaymentInput.value);
	userPaymentName.textContent = localStorage.paymentName;
});

inputDay.addEventListener	('input', checkInputValid);
inputMonth.addEventListener	('input', checkInputValid);
inputYear.addEventListener	('input', checkInputYearValid);
inputDay.addEventListener	('input', reduceToTwoCharacters);
inputMonth.addEventListener	('input', reduceToTwoCharacters);
inputYear.addEventListener	('input', reduceToFourCharacters);

paymentName.addEventListener	('input', checkPaymentNameValid);
paymentCard.addEventListener	('input', addDash);
paymentCard.addEventListener	('input', checkPaymentCardValid);
paymentExpiry.addEventListener	('input', addSlash);
paymentExpiry.addEventListener	('input', checkPaymentExpiryValid);
paymentCVC.addEventListener	('input', checkPaymentCVCValid);

// 4. Button Events
subButton.addEventListener	('click', nextSlide);

nameButton.addEventListener	('click', checkNameValid);

plansButton.addEventListener	('click', function() {
	for (let plansInput of plansInputs) {
		if (plansInput.checked) nextSlide();
	}
})

dateButton.addEventListener	('click', function() {
	if (checkInputDate && checkInputYear) setTimeout(nextSlide, 500);
})

emailButton.addEventListener	('click', checkEmailValid);

submitButton.addEventListener	('click', checkPaymentInfo);

sessionStorage.clear();

// 5. Main Functions

function checkNameValid() {
	let nameInputValue = nameInput.value;
	let pattern = /^\D+$/;

	nameInputValue === '' && nameInput.classList.add('invalid');
	if (nameInputValue.match(pattern)) {
		addValidStyles(nameInput);
		setTimeout(nextSlide, 500);
	} else {
		addInvalidStyles(nameInput);
	}
}

function checkInputValid() {
	if (this.value.length > 0) {
		addValidStyles(this);
		return checkInputDate = true;
	} else {
		addInvalidStyles(this);
		return checkInputDate = false;
	}
}

function checkInputYearValid() {
	if (inputYear.value.length === 4) {
		addValidStyles(inputYear);
		return checkInputYear = true;
	} else {
		addInvalidStyles(inputYear);
		return checkInputYear = false;
	}
}

function checkEmailValid() {
	let emailValue = inputEmail.value;
	let pattern = /^[^.]+@[^.]+\.[a-z]{2,3}$/;

	if (emailValue === '') inputEmail.classList.add('invalid');
	if (emailValue.match(pattern)) {
		addValidStyles(inputEmail);
		setTimeout(nextSlide, 500);
	} else {
		addInvalidStyles(inputEmail);
	}
}

function checkPaymentNameValid() {
	let paymentNameValue = paymentName.value;
	let pattern = /^\D\w+\s\D\w+$/;

	if (paymentNameValue === '') paymentName.classList.add('invalid');
	if (paymentNameValue.match(pattern)) {
		addValidStyles(paymentName);
		return checkPaymentName = true;
	} else {
		addInvalidStyles(paymentName);
		return checkPaymentName = false;
	}
}

function checkPaymentCardValid() {
	let paymentCardValue = paymentCard.value;
	let pattern = /(\d{4}-){3}\d{4}/;

	if (paymentCardValue === '') paymentCard.classList.add('invalid');
	if (paymentCardValue.match(pattern)) {
		addValidStyles(paymentCard);
		return checkPaymentCard = true;
	} else {
		addInvalidStyles(paymentCard);
		return checkPaymentCard = false;
	}
}

function checkPaymentExpiryValid() {
	let value = this.value;
	let pattern = /\d{2}\/\d{2}/;

	if (value === '') this.classList.add('invalid');
	if (value.match(pattern)) {
		addValidStyles(this);
		return checkPaymentExpiry = true;
	} else {
		addInvalidStyles(this);
		return checkPaymentExpiry = false;
	}
}

function checkPaymentCVCValid() {
	let value = this.value;
	let pattern = /\d{3}/;

	this.classList.remove('valid');
	this.classList.remove('invalid');
	if (value === '') this.classList.add('invalid');
	if (value.match(pattern)) {
		this.classList.add('valid');
		return checkPaymentCVC = true;
	} else {
		this.classList.add('invalid');
		return checkPaymentCVC = false;
	}
}

function checkPaymentInfo() {
	if (checkPaymentName && checkPaymentCard && checkPaymentExpiry && checkPaymentCVC) setTimeout(nextSlide, 500);
}

// 6. Additional Functions

function nextSlide() {
	swiper.slideNext();
}

function addValidStyles(element) {
	element.classList.remove('invalid');
	element.classList.add('valid');
}

function addInvalidStyles(element) {
	element.classList.remove('valid');
	element.classList.add('invalid');
}

function reduceToTwoCharacters() {
	if (this.value > 2) this.value = this.value.slice(0, 2);
}

function reduceToFourCharacters() {
	if (this.value >= 4) this.value = this.value.slice(0, 4);
};

function addDash() {
	let paymentCardValue = this.value.split('-').join('');
	if (paymentCardValue.length > 0) {
		paymentCardValue = paymentCardValue.match(/.{1,4}/g).join("-");
	}
	this.value = paymentCardValue;
}

function addSlash() {
	let paymentExpiryValue = this.value.split('/').join('');
	if (paymentExpiryValue.length > 0) {
		paymentExpiryValue = paymentExpiryValue.match(/.{1,2}/g).join("/");
	}
	this.value = paymentExpiryValue;
}

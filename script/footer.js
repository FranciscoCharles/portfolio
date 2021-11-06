(function createFooterText(){
	const today = new Date();
	const year = today.getFullYear();
	const footerTextElement = document.querySelector('.footer-container > .text-container > h1');
	if(year > 2021){
		footerTextElement.textContent += ` - ${year}`
	}
})();
(function initToolContainerAnimation() {

	const animationTime = 150;
	const arrayToolElements = Array.from(
		document.querySelectorAll('.tool-container')
	).map(element => (
		{
			domElement: element,
			timeId: null,
			animate: false,
			mouseover: false
		}
	));

	function mouseOverAnimation(arrayElement) {
		if (arrayElement.isAnimating) return;
		const element = arrayElement.domElement;
		arrayElement.isAnimating = true;
		arrayElement.mouseover = false;
		arrayElement.timeId = setInterval(() => {
			const elementComputedStyle = window.getComputedStyle(element);
			const angle = +elementComputedStyle.getPropertyValue('--angle').replace('deg', '');
			element.style.setProperty('--angle', (10 + angle) % 360 + 'deg');
		}, animationTime);
	}

	function mouseLeaveAnimation(arrayElement) {
		if (arrayElement.mouseover) return;
		const element = arrayElement.domElement;
		arrayElement.mouseover = true;
		clearInterval(arrayElement.timeId);
		arrayElement.timeId = null;
		arrayElement.timeId = setInterval(() => {
			const elementComputedStyle = window.getComputedStyle(element);
			const angle = +elementComputedStyle.getPropertyValue('--angle').replace('deg', '');
			if (angle < 360) {
				element.style.setProperty('--angle', 10 + angle + 'deg');
			} else {
				clearInterval(arrayElement.timeId);
				element.style.setProperty('--angle', '0deg');
				arrayElement.mouseover = false;
				arrayElement.isAnimating = false;
			}
		}, animationTime);
	}

	arrayToolElements.forEach(arrayElement => {
		const element = arrayElement.domElement;
		element.addEventListener('mouseenter', () => mouseOverAnimation(arrayElement));
		element.addEventListener('mouseleave', () => mouseLeaveAnimation(arrayElement));
	})
})();
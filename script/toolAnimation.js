(function createAnimations() {

	/*tool-container animation code*/
	const animationTimeMilliseconds = 150;
	const arrayToolElements = Array.from(
		document.querySelectorAll('.tool-container')
	).map(element => (
		{
			domElement: element,
			timeId: null,
			isAnimating: false,
			isMouseEnter: false,
			set angle(value) {
				this.domElement.style.setProperty('--angle', value + 'deg');
			},
			get angle() {
				const elementComputedStyle = window.getComputedStyle(this.domElement);
				const angle = +elementComputedStyle.getPropertyValue('--angle').replace('deg', '');
				return angle;
			}
		}
	));

	function mouseEnterAnimation(arrayElement) {
		if (arrayElement.isMouseEnter && arrayElement.isAnimating) return;
		arrayElement.isAnimating = true;
		arrayElement.isMouseEnter = true;
		if (arrayElement.timeId !== null) {
			clearInterval(arrayElement.timeId);
		}
		arrayElement.timeId = setInterval(() => {
			arrayElement.angle = (10 + arrayElement.angle) % 360;
		}, animationTimeMilliseconds);
	}

	function mouseLeaveAnimation(arrayElement) {
		if (!arrayElement.isAnimating) return;
		arrayElement.isMouseEnter = false;
		if (arrayElement.timeId !== null) {
			clearInterval(arrayElement.timeId);
		}
		arrayElement.timeId = setInterval(() => {
			const angle = arrayElement.angle;
			if (angle < 360) {
				arrayElement.angle = 10 + angle;
			} else {
				clearInterval(arrayElement.timeId);
				arrayElement.timeId = null;
				arrayElement.isAnimating = false;
				arrayElement.angle = 0;
			}
		}, animationTimeMilliseconds);
	}

	arrayToolElements.forEach(arrayElement => {
		const element = arrayElement.domElement;
		element.addEventListener('mouseenter', () => mouseEnterAnimation(arrayElement));
		element.addEventListener('mouseleave', () => mouseLeaveAnimation(arrayElement));
	})
})();
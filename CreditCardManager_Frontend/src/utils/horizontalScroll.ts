function horizontalScroll(event: React.WheelEvent) {
	const SCROLL_VALUE: number = 100;

	event.currentTarget.scrollLeft =
		event.deltaY > 0
			? event.currentTarget.scrollLeft + SCROLL_VALUE
			: event.currentTarget.scrollLeft - SCROLL_VALUE;
}

export default horizontalScroll;

SenseHAT = require('node-sense-hat')

const matrix = SenseHAT.Leds

outputBinaryStrings = (hrs, mins, secs) => {
	const hX = 1
	const mX = 3
	const sX = 5

	matrix.clear()

	// setup the work to do
	tasks = [
		{ x: hX, color: [255, 0, 0], timeStr: hrs },
		{ x: mX, color: [0, 255, 0], timeStr: mins },
		{ x: sX, color: [0, 0, 255], timeStr: secs }
	]

	for (var t of tasks) {
		y = 7
		for (var c of t.timeStr) {
			if (c === '1') {
				matrix.setPixel(t.x, y, t.color)
			}
			y--
		}
	}
}

setInterval(() => {
	const d = new Date()
	const hourStr = d.getHours().toString(2).reverse()
	const minStr = d.getMinutes().toString(2).reverse()
	const secStr = d.getSeconds().toString(2).reverse()

	outputBinaryStrings(hourStr, minStr, secStr)

}, 500)

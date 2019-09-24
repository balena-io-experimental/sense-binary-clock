SenseHAT = require('node-sense-hat')

const matrix = SenseHAT.Leds

fill8Binary = (s) => {
	return "00000000"
			.slice(0, 8 - s.toString(2).length)
			.concat(s.toString(2))
}

outputBinaryStrings = (hrs, mins, secs) => {
	const hX = 1
	const mX = 3
	const sX = 5

	matrix.clear()

	// setup the work to do
	tasks = [
		{ x: hX, color: [0, 0, 255], timeStr: fill8Binary(hrs) },
		{ x: mX, color: [0, 255, 0], timeStr: fill8Binary(mins) },
		{ x: sX, color: [255, 0, 0], timeStr: fill8Binary(secs) }
	]

	for (var t of tasks) {
		y = 0
		for (var c of t.timeStr) {
			if (c === '1') {
				matrix.setPixel(y, t.x, t.color)
			}
			y++
		}
	}
}

setInterval(() => {
	const d = new Date()
	outputBinaryStrings(d.getHours(), d.getMinutes(), d.getSeconds())
}, 500)


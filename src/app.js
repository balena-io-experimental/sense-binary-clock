SenseHAT = require('node-sense-hat')

const matrix = SenseHAT.Leds
const JoystickLib = SenseHAT.Joystick;
var twelveHrClock = false;

fill8Binary = (s) => {
    return "00000000"
            .slice(0, 8 - s.toString(2).length)
            .concat(s.toString(2))
}

outputBinaryStrings = (hrs, mins, secs) => {
    const hX = 1
    const mX = 3
    const sX = 5
    const pm = (twelveHrClock ? hrs > 12 : false);
    hrs = (pm ? hrs - 12 : hrs);
    (secs == 0) && console.log("%s:%s%s",
            (!twelveHrClock && hrs < 10 ? "0" + hrs : hrs),
            (mins < 10 ? "0" + mins : mins),
            (twelveHrClock ? (pm ? " PM" : " AM") : ""));

    // setup the work to do
    tasks = [
        { x: hX, color: [255, 0, 0], timeStr: fill8Binary(hrs) },
        { x: mX, color: [0, 255, 0], timeStr: fill8Binary(mins) },
        { x: sX, color: [0, 0, 255], timeStr: fill8Binary(secs) }
    ]

    for (var t of tasks) {
        y = 0
        for (var c of t.timeStr) {
            if (twelveHrClock && y == 0 && t.x == hX) {
                matrix.setPixel(y, t.x, (pm ? [255, 0, 0] : [0, 255, 255]));
            }
            else if (c === '1') {
                matrix.setPixel(y, t.x, t.color)
            }
            else {
                matrix.setPixel(y, t.x, [0, 0, 0]);
            }
            y++
        }
    }
}

// Clear screen
matrix.clear()
// Toggle 12/24 hour mode on joystick click
JoystickLib.getJoystick().then((joystick) => {
    joystick.on('press', (direction) => {
        if (direction == 'click') {
            // 12/24 hr toggle
            twelveHrClock = !twelveHrClock;
        }
    });
});
// Start clock
setInterval(() => {
    const d = new Date()
    outputBinaryStrings(d.getHours(), d.getMinutes(), d.getSeconds())
}, 500)


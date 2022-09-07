x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
draw_cars = "";
cars = "";
speak_data = "";
to_number = "";

function preload() {
    cars = loadImage("zenvo.png");

}
var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
    document.getElementById("status").innerHTML = "System is listening please speak";
    recognition.start();
}

recognition.onresult = function(event) {

    console.log(event);

    content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

    to_number = Number(content);

    if (Number.isInteger(to_number)) {
        document.getElementById("status").innerHTML = "started drawing cars";
        draw_cars = "set";
    } else {
        document.getElementById("status").innerHTML = "the speech recognised is not a number.Try Again"
    }

}

function setup() {

    screen_width = window.innerWidth;

    screen_height = window.innerHeight;

    canvas = createCanvas(screen_width, screen_height - 150)

    canvas.position(0, 150);
}

function draw() {
    if (draw_cars == "set") {
        for (var i = 1; i <= to_number; i++) {
            x = Math.floor(Math.random() * 700)
            y = Math.floor(Math.random() * 400)
            image(cars, x, y, 50, 50);
        }
        document.getElementById("status").innerHTML = to_number + " cars drawn";
        speak_data = to_number + "cars drawn";
        speak();
        draw_cars = "";
    }
}

function speak() {
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
const textEl = document.getElementById('displayText');
const speedEl = document.getElementById('speed');
const sizeEl = document.getElementById('size');
const textInputEl = document.getElementById('text');

let text = textInputEl.value; // Initialize with the input's value
let idx = 1;
let speed = 300 / speedEl.value;
let size = sizeEl.value + "px";

function writeText() {
    textEl.style.fontSize = size;
    textEl.innerText = text.slice(0, idx);
    idx++;
    if (idx > text.length) {
        idx = 1;
    }
    setTimeout(writeText, speed);
}

writeText();

speedEl.addEventListener('input', (e) => speed = 300 / e.target.value);

sizeEl.addEventListener('input', (e) =>size = e.target.value + "px");

textInputEl.addEventListener('input', (e) => {
    text = e.target.value;
    idx = 1;
});

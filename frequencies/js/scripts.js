let currentFrequency = 0;
let correctGuesses = parseInt(getCookie("correctGuesses")) || 0;
let incorrectGuesses = parseInt(getCookie("incorrectGuesses")) || 0;
let totalGuesses = parseInt(getCookie("totalGuesses")) || 0;
let audioContext;
let oscillator;
let gainNode;

const minFrequency = 0;
const maxFrequency = 1000;
const volumeMin = 0;
const volumeMax = 100;

function generateRandomFrequency() {
    const ranges = [
        { min: minFrequency, max: 999, step: 100 },
        { min: 1000, max: maxFrequency, step: 500 }
    ];

    const range = ranges[Math.floor(Math.random() * ranges.length)];
    const steps = Math.floor((range.max - range.min) / range.step) + 1;
    return range.min + (Math.floor(Math.random() * steps) * range.step);
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function submitGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    const result = document.getElementById('result');
    totalGuesses++;
    setCookie("totalGuesses", totalGuesses, 1);
    if (guess === currentFrequency) {
        correctGuesses++;
        setCookie("correctGuesses", correctGuesses, 1);
        result.textContent = `Correct! The frequency was ${currentFrequency} Hz.`;
    } else {
        incorrectGuesses++;
        setCookie("incorrectGuesses", incorrectGuesses, 1);
        result.textContent = `Incorrect. The frequency was ${currentFrequency} Hz.`;
    }
    updateStats();
}

function tryAgain() {
    currentFrequency = generateRandomFrequency();
    setCookie("currentFrequency", currentFrequency, 1);
    document.getElementById('guess').value = '';
    document.getElementById('result').textContent = '';
}

function playSineWave() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(currentFrequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime); // Set initial volume to 15%
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();

    // Stop the oscillator after 3 seconds
    setTimeout(() => {
        stopSineWave();
    }, 3000);
}

function stopSineWave() {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
    }
}

function setVolume(value) {
    if (gainNode) {
        gainNode.gain.setValueAtTime(value / 100, audioContext.currentTime);
    }
    document.getElementById('volumeValue').textContent = `Volume: ${value}%`;
}

function updateStats() {
    document.getElementById('correctGuesses').textContent = `Correct Guesses: ${correctGuesses}`;
    document.getElementById('incorrectGuesses').textContent = `Incorrect Guesses: ${incorrectGuesses}`;
    document.getElementById('totalGuesses').textContent = `Total Guesses: ${totalGuesses}`;
}

function updateFrequencyRanges() {
    const frequencyRanges = document.getElementById('frequencyRanges');
    frequencyRanges.innerHTML = `
        <li>${minFrequency} Hz to 999 Hz in steps of 25</li>
        <li>1000 Hz to ${maxFrequency} Hz in steps of 500</li>
    `;
    document.getElementById('guess').min = minFrequency;
    document.getElementById('guess').max = maxFrequency;
    document.getElementById('volume').min = volumeMin;
    document.getElementById('volume').max = volumeMax;
}

// Initialize the first frequency or get it from the cookie
currentFrequency = getCookie("currentFrequency") || generateRandomFrequency();
setCookie("currentFrequency", currentFrequency, 1);
updateStats();
updateFrequencyRanges();
let currentFrequency = 0;
let correctGuesses = parseInt(getCookie("correctGuesses")) || 0;
let incorrectGuesses = parseInt(getCookie("incorrectGuesses")) || 0;
let totalGuesses = parseInt(getCookie("totalGuesses")) || 0;
let audioContext;
let oscillator;
let gainNode;

const minFrequency = 20;
const maxFrequency = 20000;
const volumeMin = 0;
const volumeMax = 100;

const subBassMin = 20;
const subBassMax = 60;
const subBassStep = 10;

const bassMin = 60;
const bassMax = 250;
const bassStep = 10;

const lowMidMin = 250;
const lowMidMax = 500;
const lowMidStep = 50;

const midMin = 500;
const midMax = 2000;
const midStep = 50;

const highMidMin = 2000;
const highMidMax = 6000;
const highMidStep = 100;

const highsMin = 6000;
const highsMax = 20000;
const highsStep = 500;

let selectedRanges = {
    subBass: true,
    bass: true,
    lowMid: true,
    mid: true,
    highMid: true,
    highs: true
};

function generateRandomFrequency() {
    const ranges = [];
    if (selectedRanges.subBass) ranges.push({ min: subBassMin, max: subBassMax, step: subBassStep });
    if (selectedRanges.bass) ranges.push({ min: bassMin, max: bassMax, step: bassStep });
    if (selectedRanges.lowMid) ranges.push({ min: lowMidMin, max: lowMidMax, step: lowMidStep });
    if (selectedRanges.mid) ranges.push({ min: midMin, max: midMax, step: midStep });
    if (selectedRanges.highMid) ranges.push({ min: highMidMin, max: highMidMax, step: highMidStep });
    if (selectedRanges.highs) ranges.push({ min: highsMin, max: highsMax, step: highsStep });

    if (ranges.length === 0) {
        ranges.push(
            { min: subBassMin, max: subBassMax, step: subBassStep },
            { min: bassMin, max: bassMax, step: bassStep },
            { min: lowMidMin, max: lowMidMax, step: lowMidStep },
            { min: midMin, max: midMax, step: midStep },
            { min: highMidMin, max: highMidMax, step: highMidStep },
            { min: highsMin, max: highsMax, step: highsStep }
        );
    }

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

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
}

function playSineWave() {
    if (!audioContext) {
        initAudio();
    } else {
        oscillator = audioContext.createOscillator();
        oscillator.connect(gainNode);
        oscillator.start();
    }
    oscillator.frequency.setValueAtTime(currentFrequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime); // Set initial volume to 15%

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
    frequencyRanges.innerHTML = '';
    if (selectedRanges.subBass) frequencyRanges.innerHTML += `<li>${subBassMin} Hz to ${subBassMax} Hz in steps of ${subBassStep}</li>`;
    if (selectedRanges.bass) frequencyRanges.innerHTML += `<li>${bassMin} Hz to ${bassMax} Hz in steps of ${bassStep}</li>`;
    if (selectedRanges.lowMid) frequencyRanges.innerHTML += `<li>${lowMidMin} Hz to ${lowMidMax} Hz in steps of ${lowMidStep}</li>`;
    if (selectedRanges.mid) frequencyRanges.innerHTML += `<li>${midMin} Hz to ${midMax} Hz in steps of ${midStep}</li>`;
    if (selectedRanges.highMid) frequencyRanges.innerHTML += `<li>${highMidMin} Hz to ${highMidMax} Hz in steps of ${highMidStep}</li>`;
    if (selectedRanges.highs) frequencyRanges.innerHTML += `<li>${highsMin} Hz to ${highsMax} Hz in steps of ${highsStep}</li>`;
    document.getElementById('guess').min = minFrequency;
    document.getElementById('guess').max = maxFrequency;
    document.getElementById('volume').min = volumeMin;
    document.getElementById('volume').max = volumeMax;
}

function updateSelectedRanges() {
    selectedRanges.subBass = document.getElementById('subBass').checked;
    selectedRanges.bass = document.getElementById('bass').checked;
    selectedRanges.lowMid = document.getElementById('lowMid').checked;
    selectedRanges.mid = document.getElementById('mid').checked;
    selectedRanges.highMid = document.getElementById('highMid').checked;
    selectedRanges.highs = document.getElementById('highs').checked;
    updateFrequencyRanges();
    $('#rangeModal').modal('hide');
}

// Initialize the first frequency or get it from the cookie
currentFrequency = getCookie("currentFrequency") || generateRandomFrequency();
setCookie("currentFrequency", currentFrequency, 1);
updateStats();
updateFrequencyRanges();
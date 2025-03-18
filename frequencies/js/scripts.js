let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator;
let gainNode = audioContext.createGain();
let randomFrequency;

function generateRandomFrequency() {
    min_frequency = 20;
    max_frequency = 200;
    randomFrequency = Math.floor(Math.random() * (max_frequency - min_frequency + 1)) + min_frequency;
}

function playSineWave() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if (oscillator) {
        oscillator.stop();
    }
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(randomFrequency, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(document.getElementById('volume').value / 100, audioContext.currentTime); // Set volume to slider value
    oscillator.start();
    setTimeout(stopSineWave, 3000); // Stop after 3 seconds
}

function stopSineWave() {
    if (oscillator) {
        oscillator.stop();
    }
}

function submitGuess() {
    let guess = document.getElementById('guess').value;
    let result = document.getElementById('result');
    let difference = Math.abs(randomFrequency - guess);
    result.innerHTML = `Random Frequency: ${randomFrequency} Hz<br>Your Guess: ${guess} Hz<br>Difference: ${difference} Hz`;

    // Track progress
    let correctGuesses = parseInt(getCookie('correctGuesses')) || 0;
    let incorrectGuesses = parseInt(getCookie('incorrectGuesses')) || 0;
    let totalGuesses = parseInt(getCookie('totalGuesses')) || 0;

    console.log(`Before update - Correct: ${correctGuesses}, Incorrect: ${incorrectGuesses}, Total: ${totalGuesses}`);

    if (difference === 0) {
        correctGuesses++;
    } else {
        incorrectGuesses++;
    }
    totalGuesses++;

    setCookie('correctGuesses', correctGuesses, 365);
    setCookie('incorrectGuesses', incorrectGuesses, 365);
    setCookie('totalGuesses', totalGuesses, 365);

    console.log(`After update - Correct: ${correctGuesses}, Incorrect: ${incorrectGuesses}, Total: ${totalGuesses}`);
    console.log(`Cookies - Correct: ${getCookie('correctGuesses')}, Incorrect: ${getCookie('incorrectGuesses')}, Total: ${getCookie('totalGuesses')}`);

    updateProgress();
}

function tryAgain() {
    generateRandomFrequency();
    document.getElementById('result').innerHTML = '';
    document.getElementById('guess').value = '';
    playSineWave();
}

function setVolume(value) {
    gainNode.gain.setValueAtTime(value / 100, audioContext.currentTime);
    document.getElementById('volumeValue').innerText = `Volume: ${value}%`;
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log(`Set cookie - ${name}: ${value}`);
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function updateProgress() {
    let correctGuesses = parseInt(getCookie('correctGuesses')) || 0;
    let incorrectGuesses = parseInt(getCookie('incorrectGuesses')) || 0;
    let totalGuesses = parseInt(getCookie('totalGuesses')) || 0;

    console.log(`Update progress - Correct: ${correctGuesses}, Incorrect: ${incorrectGuesses}, Total: ${totalGuesses}`);

    document.getElementById('progress').innerText = `Total Guesses: ${totalGuesses}, Correct Guesses: ${correctGuesses}, Incorrect Guesses: ${incorrectGuesses}`;
}

// Initialize with a random frequency
generateRandomFrequency();
updateProgress();
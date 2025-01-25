// Your script here.
const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Load voices when speechSynthesis is ready
  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // Select voice when dropdown is changed
  voicesDropdown.addEventListener('change', (event) => {
    const selectedVoice = voices.find(voice => voice.name === event.target.value);
    msg.voice = selectedVoice;
  });

  // Update rate and pitch when adjusted
  options.forEach(option => {
    option.addEventListener('input', (event) => {
      if (event.target.name === 'rate') {
        msg.rate = event.target.value;
      } else if (event.target.name === 'pitch') {
        msg.pitch = event.target.value;
      }
    });
  });

  // Speak the text when the speak button is clicked
  speakButton.addEventListener('click', () => {
    msg.text = document.querySelector('[name="text"]').value;
    speechSynthesis.speak(msg);
  });

  // Stop the speech when the stop button is clicked
  stopButton.addEventListener('click', () => {
    speechSynthesis.cancel();
  });

  // Populate voices when the voices are available
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
  }

  // Initially populate voices when the page loads
  populateVoices();

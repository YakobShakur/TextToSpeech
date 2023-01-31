navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    console.log('Service worker registered:', registration);
  })
  .catch(function(error) {
    console.log('Service worker registration failed:', error);
  });

// Listen for messages from the service worker
navigator.serviceWorker.addEventListener('message', function(event) {
  // Handle the message from the service worker
  if (event.data.command === "read-text") {
    chrome.tabs.executeScript({
      code: "window.getSelection().toString();"
    }, function(selectedText) {
      // code to read selected text using the Web Speech API
      var msg = new SpeechSynthesisUtterance();
      msg.text = selectedText;
      msg.lang = 'en-US';
      msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google US English'; })[0];
      speechSynthesis.speak(msg);
    });
  }
});
document.addEventListener("DOMContentLoaded", function() {
    var languageSelect = document.getElementById("language");
    var voiceSelect = document.getElementById("voice");
    var speakButton = document.getElementById("speak-button");
    var hotkeyInput = document.getElementById("hotkey");
    var hotkeyButton = document.getElementById("hotkey-button");

    //Populate the voiceSelect dropdown with available English Male and Female voices
    window.speechSynthesis.onvoiceschanged = function() {
        var voices = window.speechSynthesis.getVoices();
        for(var i = 0; i < voices.length; i++) {
            if(voices[i].lang.startsWith("en") && (voices[i].name.endsWith(" Male") || voices[i].name.endsWith(" Female")) ) {
              var option = document.createElement("option");
              option.value = voices[i].name;
              option.text = voices[i].name;
              voiceSelect.appendChild(option);
            }
        }
    };
  
    // Handle hotkey input and save
    hotkeyButton.addEventListener("click", function() {
        var newHotkey = hotkeyInput.value;
        chrome.commands.update({
            name: "speakSelection",
            shortcut: newHotkey
        });
    });
  
    // Handle speak button click
    speakButton.addEventListener("click", function() {
        var selectedLanguage = languageSelect.value;
        var selectedVoiceName = voiceSelect.value;
        chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        }, function(selectedText) {
            var msg = new SpeechSynthesisUtterance();
            msg.text = selectedText;
            msg.lang = selectedLanguage;

            // Set the voice based on the selected value in the voiceSelect dropdown
            var selectedVoice = window.speechSynthesis.getVoices().filter(function(voice) { return voice.name == selectedVoiceName; });
            if (selectedVoice.length > 0) {
                msg.voice = selectedVoice[0];
            }
            speechSynthesis.speak(msg);
        });
    });
});
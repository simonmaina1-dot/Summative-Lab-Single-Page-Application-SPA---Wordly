Wordly SPA

Wordly SPA is a Single Page Application (SPA) dictionary that allows users to search for a word and retrieve its definitions, pronunciation, examples, synonyms, and source information — all without reloading the page. This project demonstrates the use of JavaScript, HTML, CSS, and fetch requests to interact with an external dictionary API.

Features

Search Words: Users can input a word to search.

Display Results: Shows the word, pronunciation audio, part of speech, definitions, examples, and synonyms dynamically.

Audio Playback: Plays the pronunciation of the searched word.

Error Handling: Gracefully handles invalid words or API errors.

Interactive SPA: Updates content without page reload.

Folder Structure
wordly-spa/
├─ index.html          # Main HTML page
├─ style.css           # Styles for the SPA
├─ script.js           # JavaScript logic for fetching and displaying results
├─ package.json        # Project configuration and dependencies
└─ tests/
   └─ script.test.js   # Jest tests for helper functions



Running the App

Open index.html in your browser. You can search for any English word to see its definitions, examples, synonyms, and listen to its pronunciation.

Running Tests

The project includes Jest tests for the pure helper functions (fetchWord, parseMeanings, displayResults).

npm test


The tests run in a jsdom environment to simulate DOM behavior.


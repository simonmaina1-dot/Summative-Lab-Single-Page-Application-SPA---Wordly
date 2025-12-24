
async function fetchWord(word) {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  if (!response.ok) throw new Error('Word not found');
  const data = await response.json();
  return data[0];
}

function parseMeanings(meaning) {
  return `
    <div class="definition">
      <h3>Part of Speech: ${meaning.partOfSpeech}</h3>
      ${meaning.definitions.map(d => `
        <p>Definition: ${d.definition}</p>
        ${d.example ? `<p>Example: ${d.example}</p>` : ''}
        ${d.synonyms && d.synonyms.length ? `<p>Synonyms: ${d.synonyms.join(', ')}</p>` : ''}
      `).join('')}
    </div>
  `;
}

function displayResults(data) {
  if (!data) return `<p>No data available.</p>`;

  const { word, phonetics, meanings, sourceUrls } = data;

  let phoneticAudio = '';
  if (phonetics && phonetics[0] && phonetics[0].audio) {
    phoneticAudio = `<button class="audio-btn" onclick="playAudio('${phonetics[0].audio}')">🔊 Play Pronunciation</button>`;
  }

  let html = `<h2>${word}</h2>${phoneticAudio}`;
  meanings.forEach(meaning => {
    html += parseMeanings(meaning);
  });

  if (sourceUrls && sourceUrls.length) {
    html += `<p>Source: <a href="${sourceUrls[0]}" target="_blank">${sourceUrls[0]}</a></p>`;
  }

  return html;
}

// DOM interactions (not executed during tests)

if (typeof document !== 'undefined') {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('results');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = input.value.trim();
    if (!word) return;

    results.innerHTML = '<p>Loading...</p>';

    try {
      const data = await fetchWord(word);
      results.innerHTML = displayResults(data);
    } catch (error) {
      results.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  });

  window.playAudio = function(url) {
    const audio = new Audio(url);
    audio.play();
  };
}

// Export for Jest
if (typeof module !== 'undefined') {
  module.exports = { fetchWord, parseMeanings, displayResults };
}

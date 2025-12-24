global.fetch = jest.fn();

const { fetchWord, parseMeanings, displayResults } = require('../script.js');

describe('Wordly SPA helper functions', () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  test('parseMeanings returns correct HTML', () => {
    const input = {
      partOfSpeech: 'noun',
      definitions: [
        { definition: 'A domesticated animal.', example: 'The dog barked.', synonyms: ['canine'] }
      ]
    };
    const output = parseMeanings(input);
    expect(output).toContain('Part of Speech: noun');
    expect(output).toContain('Definition: A domesticated animal.');
    expect(output).toContain('Example: The dog barked.');
    expect(output).toContain('Synonyms: canine');
  });

  test('displayResults returns correct HTML', () => {
    const sampleData = {
      word: 'dog',
      phonetics: [{ audio: 'https://audio.example.com/dog.mp3' }],
      meanings: [
        { partOfSpeech: 'noun', definitions: [{ definition: 'A domesticated animal.', example: 'The dog barked.', synonyms: ['canine'] }] }
      ],
      sourceUrls: ['https://dictionaryapi.dev/']
    };
    const html = displayResults(sampleData);
    expect(html).toContain('<h2>dog</h2>');
    expect(html).toContain('🔊 Play Pronunciation');
    expect(html).toContain('Definition: A domesticated animal.');
  });

  test('fetchWord returns word data when API call is successful', async () => {
    const mockData = [{ word: 'dog', meanings: [] }];
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });
    const data = await fetchWord('dog');
    expect(data.word).toBe('dog');
    expect(fetch).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/dog');
  });

  test('fetchWord throws error when API call fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(fetchWord('nonexistentword')).rejects.toThrow('Word not found');
  });
});

const accentDict = {
  é: 'e',
  è: 'e',
  ë: 'e',
  ê: 'e',
  à: 'a',
  ä: 'a',
  â: 'a',
  ö: 'o',
  ô: 'o',
  î: 'i',
  ï: 'i',
  ù: 'u',
  ü: 'u',
  û: 'u',
  ç: 'c',
};

module.exports = str => str.toString().toLowerCase()
  .replace(/\s+/g, '-')           // Replace spaces with -
  .replace(/[^\w\-]+/g, c => accentDict[c])
  .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
  .replace(/\-\-+/g, '-')         // Replace multiple - with single -
  .replace(/^-+/, '')             // Trim - from start of text
  .replace(/-+$/, '');            // Trim - from end of text

// source : https://gist.github.com/mathewbyrne/1280286

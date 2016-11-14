export default (html) => {
  const dict = {
    gt: '>',
    hellip: '...',
    ldquo: '"',
    rdquo: '"',
    lsquo: "'",
    rsquo: "'",
    ndash: '-',
  }
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&frac12;/g, '1/2')
    .replace(/&frac14;/g, '1/4')
    .replace(/&frac34;/g, '3/4')
    .replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, (first, sec) => {
      return dict.hasOwnProperty(sec) ? dict[sec] : first
    })
    .trim()
  return text;
}

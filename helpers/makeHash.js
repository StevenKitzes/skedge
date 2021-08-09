const options = [
  '0','1','2','3','4','5','6','7','8','9',
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
]

function getChar() {
  const length = options.length
  const i = Math.floor(Math.random() * length)
  return options[i]
}

function makeHash(length = 10) {
  const hashArr = []
  for( let i = 0; i < length; i++ ) {
    hashArr.push(getChar())
  }
  return hashArr.join('')
}

export default makeHash

function isEmptyOrWhiteSpace (input) {
  if (input === '') return true

  return new RegExp(/^[\s\t\n\r]+$/).test(input)
}

export default isEmptyOrWhiteSpace

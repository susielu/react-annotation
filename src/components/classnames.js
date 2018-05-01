export default (...params) =>
  params
    .filter(d => d)
    .join(" ")
    .trim()

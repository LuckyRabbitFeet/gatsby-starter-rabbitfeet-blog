export const shuffle = array => {
  let count = array.length
  let index
  while (count) {
    index = Math.floor(Math.random() * count--)
    ;[array[count], array[index]] = [array[index], array[count]]
  }
  return array
}

export const combinePath = (root, path) => {
  root = root.charAt(0) === '/' ? root : `/${root}`
  root = root.charAt(root.length - 1) === '/' ? root : `${root}/`
  path = path.charAt(0) === '/' ? path.substring(1) : path
  return `${root}${path}`
}

const h1 = document.querySelector('h1')
const h2 = document.querySelector('h2')
document.addEventListener('scroll', (e) => {
  let scrolled = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)

  h1.style.setProperty('--percentage', `${scrolled * 100}%`)
  h2.style.setProperty('--percentage', `${scrolled * 50}%`)
})

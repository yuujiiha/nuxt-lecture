const slides = [...document.querySelectorAll('.slide')]
let current = 0

function render() {
  slides.forEach((slide, index) => slide.classList.toggle('active', index === current))
  document.getElementById('progress').style.width = `${((current + 1) / slides.length) * 100}%`
  history.replaceState(null, '', `#${current + 1}`)
}

function move(amount) {
  current = Math.max(0, Math.min(slides.length - 1, current + amount))
  render()
}

function toggleAnswers() {
  if (slides[current].id === 'quiz-slide') slides[current].classList.toggle('show-answers')
}

document.getElementById('prev').addEventListener('click', () => move(-1))
document.getElementById('next').addEventListener('click', () => move(1))
document.addEventListener('keydown', event => {
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) move(1)
  if (['ArrowLeft', 'PageUp'].includes(event.key)) move(-1)
  if (event.key === 'Enter') toggleAnswers()
  if (event.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.()
})

const requested = Number(location.hash.slice(1))
if (Number.isInteger(requested) && requested >= 1 && requested <= slides.length) current = requested - 1
render()

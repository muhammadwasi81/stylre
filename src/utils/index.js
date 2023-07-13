import confetti from 'canvas-confetti'

export const UUID = () => {
  const head = Date.now().toString(36)
  const tail = Math.random().toString(36).substr(2)
  return head + tail
}

export const runFireworks = () => {
  var duration = 5 * 1000
  var animationEnd = Date.now() + duration
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    var particleCount = 50 * (timeLeft / duration)
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    )
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    )
  }, 250)
}

export const dropAddress = [
  {
    id: 1,
    title: 'dropOff Address',
    address: ' Memorial Hermann-Texas Medical Center Houston, TX 77030',
  },
]

export const pickUpAddress = [
  {
    id: 1,
    title: 'pickupAddress',
    address: '5085 Westheimer Rd, Houston, TX 77056',
  },
]

export const productsData = [
  { id: 1, name: 'T-Shirt' },
  { id: 2, name: 'Shoes' },
  { id: 3, name: 'Pants' },
  { id: 4, name: 'Dress' },
  { id: 5, name: 'Jackets' },
  { id: 6, name: 'Dress shirt' },
  { id: 7, name: 'Sun glasses' },
  { id: 8, name: 'Shorts' },
  { id: 9, name: 'Socks' },
  { id: 10, name: 'Hats' },
  { id: 11, name: 'Underwear' },
  { id: 12, name: 'Belt' },
  { id: 13, name: 'Tie' },
  { id: 14, name: 'Scarf' },
  { id: 15, name: 'Gloves' },
  { id: 16, name: 'Jewelry' },
  { id: 17, name: 'Watch' },
  { id: 18, name: 'Wallet' },
  { id: 19, name: 'Purse' },
  { id: 20, name: 'Backpack' },
  { id: 21, name: 'Suitcase' },
  { id: 22, name: 'Luggage' },
  { id: 23, name: 'Other' },
]

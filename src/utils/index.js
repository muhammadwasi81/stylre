export const UUID = () => {
  const head = Date.now().toString(36)
  const tail = Math.random().toString(36).substr(2)
  return head + tail
}

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

export const businessStores = [
  { id: 1, name: '4520 S Orange Blossom Trl Orlando, FL 32839' },
  { id: 2, name: '7901 South Orange Blossom Trail Orlando, FL 32809' },
  { id: 3, name: '2745 N Hiawassee Rd Orlando, FL 32818' },
  { id: 4, name: '451 East Altamonte Drive Altamonte Springs, FL 32701' },
  { id: 5, name: '12381 S. Orange Blossom Trail Orlando, FL 32837' },
  { id: 6, name: '355 N Alafaya Trail Orlando (Waterford Lakes), FL 32828' },
  { id: 7, name: '755 S Orange Blossom Trl Apopka, FL 32703' },
  { id: 8, name: '2759 E Broson Memorial Hwy Space 3 Kissimmee, FL 34744' },
]

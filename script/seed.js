'use strict'

const db = require('../server/db/db')
const { models: { User, Location, Tag, Host } } = require('../server/db')

const usersData = [
  {
    firstName: 'Tai',
    lastName: 'Stack',
    email: 'tai@email.com',
    password: '123'
  },
  {
    firstName: 'David',
    lastName: 'Stack',
    email: 'david@email.com',
    password: 'abc'
  },
  {
    firstName: 'Greg',
    lastName: 'Stack',
    email: 'greg@email.com',
    password: '123'
  },
  {
    firstName: 'Tony',
    lastName: 'Stack',
    email: 'tony@email.com',
    password: '123'
  }
]

const hostData = [
  {
    firstName: 'Drew',
    lastName: 'Stack',
    email: 'drew@email.com',
    password: '123'
  },
  {
    firstName: 'Sarah',
    lastName: 'Stack',
    email: 'sarah@email.com',
    password: 'abc'
  },
  {
    firstName: 'Omar',
    lastName: 'Stack',
    email: 'omar@email.com',
    password: '123'
  },
  {
    firstName: 'Joe',
    lastName: 'Stack',
    email: 'joe@email.com',
    password: '123'
  }
]

const tagsData = [
  {
    title: 'Spades',
    description: 'King Of Spades',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/pk.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Spades',
    description: 'Queen Of Spades',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/pq.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Spades',
    description: 'Jack Of Spades',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/pj.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Hearts',
    description: 'Ten Of Hearts',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/s10.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Hearts',
    description: 'Nine Of Hearts',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/s9.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Hearts',
    description: 'Eight Of Hearts',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/s8.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Clubs',
    description: 'Seven Of Clubs',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/k7.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Clubs',
    description: 'Six Of Clubs',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/k6.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Clubs',
    description: 'Five Of Clubs',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/k5.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Diamonds',
    description: 'Four Of Diamonds',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/l4.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Diamonds',
    description: 'Three Of Diamonds',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/l3.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Diamonds',
    description: 'Two Of Diamonds',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/l2.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
  {
    title: 'Diamonds',
    description: 'Ace Of Diamonds',
    imageUrl: "https://www.improvemagic.com/wp-content/uploads/2020/11/la.png?ezimgfmt=ng:webp/ngcb13",
    position: [0, 0, -1],
  },
]

const locationsData = [
  {
    name: 'TaiHome',
    key: 'taisecret',
  },
  {
    name: 'DavidHome',
    key: 'davidsecret',
  },
  {
    name: 'GregHome',
    key: 'gregsecret',
  },
  {
    name: 'TonyHome',
    key: 'tonysecret'
  }
]

// const cards = [
//   {
//     card: 'two of clubs',
//     image: 'https://media.istockphoto.com/photos/playing-card-two-of-clubs-picture-id149138132?k=20&m=149138132&s=612x612&w=0&h=RiFclzYIk14Dcp9aBG5DFGOEp5cr2birsxH-lWIy758='
//   },
//   {
//     card: 'two of hearts',
//     image: 'https://media.istockphoto.com/photos/playing-card-two-of-hearts-picture-id166089272?k=20&m=166089272&s=612x612&w=0&h=zODXUL-8g-CyRao9P2yO1ESSxnBc7EOminanb9sjctY='
//   },
//   {
//     card: 'two of spades',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Playing_card_spade_2.svg/1200px-Playing_card_spade_2.svg.png'
//   }
// ]

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all(
    usersData.map(user => {
      return User.create(user)
    })
  );

  const hosts = await Promise.all(
    hostData.map(host => {
      return Host.create(host)
    })
  );

  const tags = await Promise.all(
    tagsData.map(tag => {
      return Tag.create(tag)
    })
  );

  const locations = await Promise.all(
    locationsData.map(location => {
      return Location.create(location)
    })
  );



  locations[0].addTag(tags[0])
  locations[1].addTag(tags[1])
  locations[2].addTag(tags[2])
  locations[3].addTag(tags[3])

  hosts[0].addLocation(locations[0])
  hosts[1].addLocation(locations[1])
  hosts[2].addLocation(locations[2])
  hosts[3].addLocation(locations[3])

  return {
    users,
    tags,
    hosts,
    locations
  }
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

const db = require('../db')
const { User, Stock } = require('./models')

async function seedUsers() {
  const users = await Promise.all([
    User.create({
      email: 'novatore@email.com',
      username: 'Novatore!',
      password: '123'
    }),
    User.create({
      email: 'sarah@email.com',
      username: 'notnull',
      password: '123'
    })
  ])

  console.log(`seeded ${users.length} users`)
}

async function runSeed() {
  await db.sync({ force: true })
  console.log('db synced!')
  console.log('seeding...')
  try {
    await seedUsers()
    const user = await User.findOne({ where: { email: 'sarah@email.com' } })
    // const stock0 = await Stock.create({
    //   symbol: 'AAPL',
    //   quantity: 6,
    //   price: 174.55
    // })
    // const stock1 = await Stock.create({
    //   symbol: 'BA',
    //   quantity: 40,
    //   price: 33.55
    // })
    // await user.addStock(stock0)
    // await user.addStock(stock1)
    console.log('seeded successfully')
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

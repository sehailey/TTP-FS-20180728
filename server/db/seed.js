const db = require('../db')
const { User } = require('./models')

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

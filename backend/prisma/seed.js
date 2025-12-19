import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Check if default pinned comment already exists
  const existingPinned = await prisma.comment.findFirst({
    where: {
      name: 'Thanh Tai',
      isPinned: true,
    },
  })

  if (!existingPinned) {
    // Create default pinned comment from Thanh Tai
    const defaultComment = await prisma.comment.create({
      data: {
        name: 'Thanh Tai',
        message: 'Thanks for visiting! Contact me if you need anything',
        profilePhoto: '/images/profile/5d20d308b815374b6e04.jpg',
        isPinned: true,
      },
    })
    console.log('✅ Created default pinned comment:', defaultComment)
  } else {
    console.log('ℹ️ Default pinned comment already exists')
  }

  console.log('✅ Seeding completed')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


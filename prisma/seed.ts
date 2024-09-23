// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt'); // Correct way to import bcrypt in CommonJS

const prisma = new PrismaClient();

async function main() {
  // Hash the password for admin and superadmin
  const adminPassword = await bcrypt.hash('123', 10); // Adjust the plain password
  const superadminPassword = await bcrypt.hash('123', 10); // Adjust the plain password

  // Create Admin user
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: adminPassword, // Save the hashed password
      role: 'ADMIN',
    },
  });
  

  // Create SuperAdmin user
  await prisma.user.create({
    data: {
      email: 'superadmin@example.com',
      password: superadminPassword, // Save the hashed password
      role: 'SUPERADMIN',
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

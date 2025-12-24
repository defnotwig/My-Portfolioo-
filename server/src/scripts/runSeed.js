import { seedContent } from '../data/seedData.js';

async function run() {
  try {
    await seedContent();
    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

run();

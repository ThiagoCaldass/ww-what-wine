require('dotenv').config();
const { populateWines } = require('./src/scraper');

async function main() {
  try {
    await populateWines();
    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();

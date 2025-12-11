
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Checking building "Colosseum"...');

    const building = await prisma.building.findFirst({
        where: { name: 'Colosseum' }
    });

    if (building) {
        console.log('Found in DB:');
        console.log(`ID: ${building.id}`);
        console.log(`Name: "${building.name}"`); // Quotes to reveal whitespace
        console.log(`URL:  "${building.imageUrl}"`); // Quotes to reveal whitespace
    } else {
        console.log('Building "Colosseum" NOT found in the database.');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

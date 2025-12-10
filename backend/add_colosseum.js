
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Adding "Colosseum" building to Regio Colossealis...');

    // 1. Find the district
    const district = await prisma.district.findFirst({
        where: { name: 'Regio Colossealis' }
    });

    if (!district) {
        console.error('Error: Region "Regio Colossealis" not found!');
        process.exit(1);
    }

    console.log(`Found District: ${district.name} (ID: ${district.id})`);

    // 2. Create the building
    // District size is 60m x 82m.
    // We'll place the Colosseum roughly in the center.
    // Let's assume a size of 50m x 60m for the building itself.
    const building = await prisma.building.create({
        data: {
            districtId: district.id,
            name: 'Colosseum',
            imageUrl: '/images/col.png',
            width: 50,
            height: 60,
            x: 5,  // (60 - 50) / 2
            y: 11  // (82 - 60) / 2
        }
    });

    console.log('Building created successfully:');
    console.log(building);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

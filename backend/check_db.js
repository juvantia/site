
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const districtCount = await prisma.district.count();
    const buildingCount = await prisma.building.count();
    console.log(`Districts: ${districtCount}, Buildings: ${buildingCount}`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

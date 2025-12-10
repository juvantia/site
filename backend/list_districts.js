
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const districts = await prisma.district.findMany({
        select: { id: true, name: true }
    });
    console.log('Current districts in DB:');
    districts.forEach(d => console.log(`${d.id}: "${d.name}"`));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

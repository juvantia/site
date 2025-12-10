
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Starting district renaming...');

    // 1. Rename "Regio Modesta" -> "Regio Insularis"
    try {
        const modesta = await prisma.district.update({
            where: { name: 'Regio Modesta' },
            data: { name: 'Regio Insularis' },
        });
        console.log(`Success: ID ${modesta.id} renamed to "${modesta.name}"`);
    } catch (e) {
        if (e.code === 'P2025') {
            console.log('Warning: "Regio Modesta" not found (maybe already renamed?)');
        } else {
            console.error('Error renaming Regio Modesta:', e);
        }
    }

    // 2. Rename "Regio Fortunata" -> "Regio Modesta"
    try {
        const fortunata = await prisma.district.update({
            where: { name: 'Regio Fortunata' },
            data: { name: 'Regio Modesta' },
        });
        console.log(`Success: ID ${fortunata.id} renamed to "${fortunata.name}"`);
    } catch (e) {
        if (e.code === 'P2025') {
            console.log('Warning: "Regio Fortunata" not found (maybe already renamed?)');
        } else {
            console.error('Error renaming Regio Fortunata:', e);
        }
    }

    console.log('Renaming process finished.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

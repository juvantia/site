
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Starting district renaming...');

    // 1. Rename Modesta -> Insularis
    try {
        const modesta = await prisma.district.update({
            where: { name: 'Modesta' },
            data: { name: 'Insularis' },
        });
        console.log(`Updated: Modesta -> ${modesta.name}`);
    } catch (e) {
        if (e.code === 'P2025') {
            console.log('District "Modesta" not found (maybe already renamed?)');
        } else {
            console.error('Error renaming Modesta:', e);
        }
    }

    // 2. Rename Fortunata -> Modesta
    try {
        const fortunata = await prisma.district.update({
            where: { name: 'Fortunata' },
            data: { name: 'Modesta' },
        });
        console.log(`Updated: Fortunata -> ${fortunata.name}`);
    } catch (e) {
        if (e.code === 'P2025') {
            console.log('District "Fortunata" not found (maybe already renamed?)');
        } else {
            console.error('Error renaming Fortunata:', e);
        }
    }

    console.log('Renaming complete.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const districts = [
    {
        id: 1,
        name: 'Regio Portalis',
        description: 'Main entrance, parking, checkpoint.',
        type: 'gateway',
        x: 1,
        y: 85,
        width: 60,
        height: 40
    },
    {
        id: 2,
        name: 'Regio Modesta',
        description: 'Affordable housing, common folk quarter.',
        type: 'residential_low',
        x: 63,
        y: 2,
        width: 125,
        height: 123
    },
    {
        id: 3,
        name: 'Regio Ingeniosa',
        description: 'Creative suburbs, workshops, garages.',
        type: 'residential_mid',
        x: 272,
        y: 56,
        width: 124,
        height: 90
    },
    {
        id: 4,
        name: 'Regio Cereris',
        description: 'Agriculture, greenhouses, food processing.',
        type: 'agricultural',
        x: 190,
        y: 3,
        width: 80,
        height: 40
    },
    {
        id: 5,
        name: 'Regio Capitolina',
        description: 'Government center, Senate, Custodia.',
        type: 'government',
        x: 190,
        y: 45,
        width: 80,
        height: 80
    },
    {
        id: 6,
        name: 'Regio Fortunata',
        description: 'Luxury villas, prestigious living.',
        type: 'residential_high',
        x: 272,
        y: 3,
        width: 125,
        height: 50
    },
    {
        id: 7,
        name: 'Regio Minervalis',
        description: 'Industry, factories, heavy processing.',
        type: 'industrial',
        x: 1,
        y: 127,
        width: 269,
        height: 20
    },
    {
        id: 8,
        name: 'Regio Colossealis',
        description: 'The Arena and the lawless zone.',
        type: 'entertainment',
        x: 1,
        y: 2,
        width: 60,
        height: 82
    }
];

async function main() {
    console.log('Start seeding ...');

    // Clear existing data
    await prisma.landTile.deleteMany();
    await prisma.district.deleteMany();

    for (const d of districts) {
        const district = await prisma.district.create({
            data: d,
        });
        console.log(`Created district: ${district.name}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

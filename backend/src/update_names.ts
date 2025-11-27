import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const updates = [
        { id: 1, name: 'Regio Portalis' },
        { id: 2, name: 'Regio Modesta' },
        { id: 3, name: 'Regio Ingeniosa' },
        { id: 4, name: 'Regio Cereris' },
        { id: 5, name: 'Regio Capitolina' },
        { id: 6, name: 'Regio Fortunata' },
        { id: 7, name: 'Regio Minervalis' },
        { id: 8, name: 'Regio Colossealis' },
    ];

    for (const u of updates) {
        await prisma.district.update({
            where: { id: u.id },
            data: { name: u.name },
        });
    }
    console.log('Names updated');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

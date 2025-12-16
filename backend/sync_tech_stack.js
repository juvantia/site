const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const techStackData = [
    {
        id: '3d-print',
        name: '3D Printing',
        description: '3D printing is the creative backbone of Juvantia. The park is designed so that enthusiasts can fabricate custom hardware at home or in local makerspaces, then ship their creations to Juvantia: robot bodies, mounts, protective shells, sensor brackets, adapters, and other structural parts. The goal is to make "build it your way" a normal workflow—where a contributor can design something, print it, test it, and send it into the park's real environment.\n\nFor Robuli, 3D printing enables a modular ecosystem of ready- to - build solutions: we expect to provide and support printable Robuli kits—standardised sets of printable parts and assembly guidance—so new builders can join without access to industrial manufacturing.Without 3D printing, the diversity of designs and the speed of iteration required for Juvantia would be much harder to achieve.\n\n3D printing is also used for the city environment: decorative elements, signage, mounts, protective covers, small infrastructure components, and custom fixtures that help shape the park and make it maintainable.\n\nSome enthusiasts even apply 3D printing to Shelters, either by printing fully modular structures or by producing key functional elements for pre - built shelters—gates and latches, camera housings, motion - sensor enclosures, weatherproof brackets, and other accessories.\n\nLocal manufacturing inside the park is not a starting assumption.At launch, the main model is distributed fabrication by the community.However, as desktop manufacturing improves, it is realistic that on - site printing and rapid replacement of parts will become feasible in the near future—especially for non - critical components and standardised spares.',
layer: 'physical',
    color: '#009688',
        partners: 'Creality / Prusa (TBD)',
            textColor: '[{"name":"Bambu Lab","logoUrl":"https://upload.wikimedia.org/wikipedia/commons/f/f4/BambuLab_logo.svg","website":""}]',
                colStart: 1,
                    rowStart: 8,
                        gridSpan: 3,
                            rowSpan: 8,
                                role: 'Manufacturing',
                                    heightRatio: 1,
                                        displayOrder: 1,
                                            verticalAlign: 'end'
    },
    // Add more items here...
];

async function main() {
    console.log('Syncing tech stack to VPS database...\n');

    for (const item of techStackData) {
        console.log(`Upserting "${item.name}"...`);

        try {
            await prisma.techStack.upsert({
                where: { id: item.id },
                update: item,
                create: item
            });
            console.log(`  ✅ ${item.name} saved`);
        } catch (err) {
            console.error(`  ❌ Failed to save ${item.name}:`, err.message);
        }
    }

    console.log('\n✅ Tech stack sync complete!');
}

main()
    .catch(e => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

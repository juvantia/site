#!/usr/bin/env node

// Full sync script: export from local API and import to VPS DB
// Run: node backend/full_tech_sync.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const LOCAL_API = 'http://localhost:3001/api';

async function main() {
    console.log('🔄 Full Tech Stack Sync: Local → VPS Database\n');

    // Step 1: Export data from local API
    console.log('📥 Step 1: Fetching data from local API...');
    const res = await fetch(`${LOCAL_API}/tech-stack`);
    const items = await res.json();
    console.log(`Found ${items.length} items in local database\n`);

    // Step 2: Import to VPS database via Prisma
    console.log('📤 Step 2: Importing to VPS database...\n');

    let synced = 0;
    let failed = 0;

    for (const item of items) {
        console.log(`Syncing "${item.name}"...`);

        try {
            // Prepare data for Prisma
            const data = {
                id: item.id,
                name: item.name,
                description: item.description || '',
                layer: item.layer || 'physical',
                color: item.color,
                partner: item.partner || '',  // Correct field name matching schema
                textColor: item.textColor || null,
                colStart: item.colStart || 1,
                rowStart: item.rowStart || 1,
                gridSpan: item.gridSpan || 4,
                rowSpan: item.rowSpan || 2,
                role: item.role || item.layer || 'Component',
                heightRatio: item.heightRatio || 1,
                displayOrder: item.displayOrder || 0,
                verticalAlign: item.verticalAlign || 'end'
            };

            await prisma.techStackItem.upsert({
                where: { id: item.id },
                update: data,
                create: data
            });

            console.log(`  ✅ Synced`);
            synced++;
        } catch (err) {
            console.error(`  ❌ Failed: ${err.message}`);
            failed++;
        }
    }

    console.log(`\n📊 Database update complete!`);
    console.log(`✅ Updated: ${synced}`);
    console.log(`❌ Failed: ${failed}`);

    if (failed === 0) {
        console.log('\n🚀 Uploading database to VPS...');
        const { execSync } = require('child_process');
        try {
            // Use 'general' SSH alias as requested
            execSync('./upload_db.sh general', { stdio: 'inherit' });
            console.log('\n✅ Upload complete!');
        } catch (err) {
            console.error('\n❌ Upload failed:', err.message);
            process.exit(1);
        }
    } else {
        process.exit(1);
    }
}

main()
    .catch(e => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

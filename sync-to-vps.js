#!/usr/bin/env node

// Sync tech stack from local DB to VPS
// Run: node sync-to-vps.js YOUR_ADMIN_SECRET

async function syncToVPS() {
    const adminSecret = process.argv[2];

    if (!adminSecret) {
        console.error('Usage: node sync-to-vps.js YOUR_ADMIN_SECRET');
        process.exit(1);
    }

    const LOCAL_API = 'http://localhost:3001/api';
    const VPS_API = 'https://juvantia.org/api';

    console.log('📥 Fetching data from local database...');

    // Fetch from local
    const localRes = await fetch(`${LOCAL_API}/tech-stack`);
    const localItems = await localRes.json();

    console.log(`Found ${localItems.length} items in local database\n`);

    let synced = 0;
    let failed = 0;

    for (const item of localItems) {
        console.log(`Syncing "${item.name}"...`);

        // Format payload
        const payload = {
            id: item.id,
            name: item.name,
            description: item.description || '',
            layer: item.layer || 'physical',
            color: item.color,
            partners: item.partners || [],
            colStart: item.colStart || 1,
            rowStart: item.rowStart || 1,
            gridSpan: item.gridSpan || 4,
            rowSpan: item.rowSpan || 2,
            role: item.role || item.layer || 'Component',
            partner: item.partner || '',
            heightRatio: item.heightRatio || 1,
            displayOrder: item.displayOrder || 0,
            verticalAlign: item.verticalAlign || 'end',
            textColor: item.textColor || null
        };

        // Debug first item
        if (item.name === '3D Printing') {
            console.log('DEBUG First item payload:', JSON.stringify(payload, null, 2));
        }

        try {
            const updateRes = await fetch(`${VPS_API}/tech-stack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-secret': adminSecret
                },
                body: JSON.stringify(payload)
            });

            if (!updateRes.ok) {
                const errorText = await updateRes.text();
                console.error(`  ❌ Failed: ${updateRes.status} ${updateRes.statusText}`);
                console.error(`     ${errorText}`);
                failed++;
            } else {
                console.log(`  ✅ Synced`);
                synced++;
            }
        } catch (err) {
            console.error(`  ❌ Error: ${err.message}`);
            failed++;
        }

        // Small delay
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(`\n📊 Sync complete!`);
    console.log(`✅ Synced: ${synced}`);
    console.log(`❌ Failed: ${failed}`);

    if (failed > 0) {
        process.exit(1);
    }
}

syncToVPS().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});

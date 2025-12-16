#!/usr/bin/env node

// Export local tech stack data to JavaScript format for sync script

async function exportData() {
    const LOCAL_API = 'http://localhost:3001/api';

    console.log('📥 Fetching data from local database...');

    const res = await fetch(`${LOCAL_API}/tech-stack`);
    const items = await res.json();

    console.log(`Found ${items.length} items\n`);
    console.log('// Copy this array into backend/sync_tech_stack.js:');
    console.log('const techStackData = [');

    items.forEach((item, idx) => {
        console.log('    {');
        console.log(`        id: '${item.id}',`);
        console.log(`        name: '${item.name}',`);
        console.log(`        description: ${JSON.stringify(item.description || '')},`);
        console.log(`        layer: '${item.layer || 'physical'}',`);
        console.log(`        color: '${item.color}',`);
        console.log(`        partners: '${item.partner || ''}',`);
        console.log(`        textColor: ${JSON.stringify(item.textColor || null)},`);
        console.log(`        colStart: ${item.colStart || 1},`);
        console.log(`        rowStart: ${item.rowStart || 1},`);
        console.log(`        gridSpan: ${item.gridSpan || 4},`);
        console.log(`        rowSpan: ${item.rowSpan || 2},`);
        console.log(`        role: '${item.role || item.layer || 'Component'}',`);
        console.log(`        heightRatio: ${item.heightRatio || 1},`);
        console.log(`        displayOrder: ${item.displayOrder || idx},`);
        console.log(`        verticalAlign: '${item.verticalAlign || 'end'}'`);
        console.log(`    }${idx < items.length - 1 ? ',' : ''}`);
    });

    console.log('];');
}

exportData().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});

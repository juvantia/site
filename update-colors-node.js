#!/usr/bin/env node

// Node.js script to update tech stack colors
// Run: node update-colors-node.js YOUR_ADMIN_SECRET

const techColors = {
    'Computer Vision': '#00BFA5',
    'Large Language Models': '#AB47BC',
    'GX16-4': '#26A69A',
    'POGO Pin Magnetic': '#00897B',
    'Wi-Fi 6': '#2196F3',
    'MQTT': '#00BCD4',
    'Embedded Platforms': '#1976D2',
    'Smart Contracts': '#7E57C2',
    '3D Printing': '#009688',
    'Real-Time Kinematic': '#004D40',
    'EUR-Pegged Stablecoins': '#00796B',
    'Blockchain Ledger': '#1A237E',
    'Wi-Fi 4': '#0288D1',
    'Robotic Platforms': '#00838F',
    'Embedded Control': '#0097A7',
    'Swarm Logic': '#00ACC1',
    'Communication': '#26C6DA',
    'Governance': '#9C27B0',
    'Voting': '#8E24AA',
    'DAO': '#7B1FA2',
    'Consensus': '#6A1B9A',
    'Manufacturing': '#00897B',
    'Automation': '#00796B',
    'Sensors': '#00695C',
    'Actuators': '#004D40',
    'AI': '#D81B60',
    'Machine Learning': '#C2185B',
    'Neural Networks': '#AD1457',
    'Deep Learning': '#880E4F',
    'Cryptocurrency': '#1565C0',
    'Token': '#0D47A1',
    'Payment': '#01579B',
    'Economy': '#006064',
    'Mesh Network': '#00838F',
    'P2P': '#0097A7',
    'Protocol': '#00ACC1',
    'Security': '#E64A19',
    'Encryption': '#D84315',
    'Authentication': '#BF360C',
};

const fallbackColors = [
    '#00BFA5', '#AB47BC', '#2196F3', '#00BCD4', '#009688',
    '#7E57C2', '#1976D2', '#26A69A', '#00897B', '#004D40',
    '#D81B60', '#E64A19', '#FBC02D', '#7CB342', '#00ACC1'
];

async function updateColors() {
    const adminSecret = process.argv[2];

    if (!adminSecret) {
        console.error('Usage: node update-colors-node.js YOUR_ADMIN_SECRET');
        process.exit(1);
    }

    const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

    console.log(`Fetching tech stack from ${API_BASE_URL}/tech-stack...`);

    // Fetch current items
    const res = await fetch(`${API_BASE_URL}/tech-stack`);
    const items = await res.json();

    console.log(`Found ${items.length} items\n`);

    let updated = 0;
    let fallbackIndex = 0;

    for (const item of items) {
        let newColor = techColors[item.name];

        if (!newColor) {
            newColor = fallbackColors[fallbackIndex % fallbackColors.length];
            fallbackIndex++;
        }

        console.log(`Updating "${item.name}": ${item.color} -> ${newColor}`);

        // Format payload like AdminTechStack does
        const payload = {
            id: item.id,
            name: item.name,
            description: item.description || '',
            layer: item.layer || 'physical',
            color: newColor,
            partners: item.partners || [],
            // Grid coordinates
            colStart: item.colStart || 1,
            rowStart: item.rowStart || 1,
            gridSpan: item.gridSpan || 4,
            rowSpan: item.rowSpan || 2,
            // Required backend fields
            role: item.role || item.layer || 'Component',
            partner: item.partner || '',
            heightRatio: item.heightRatio || 1,
            displayOrder: item.displayOrder || 0,
            verticalAlign: item.verticalAlign || 'end',
            // Store partners as JSON in textColor (workaround)
            textColor: item.partners && item.partners.length > 0
                ? JSON.stringify(item.partners)
                : item.textColor || null
        };

        const updateRes = await fetch(`${API_BASE_URL}/tech-stack`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-secret': adminSecret
            },
            body: JSON.stringify(payload)
        });

        if (!updateRes.ok) {
            console.error(`  ❌ Failed: ${updateRes.status} ${updateRes.statusText}`);
        } else {
            console.log(`  ✅ Updated`);
            updated++;
        }

        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n✅ Successfully updated ${updated}/${items.length} items!`);
}

updateColors().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});

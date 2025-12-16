// Cyberpunk color palette - unique color for each technology
// Run this in browser console on /admin/tech page after logging in

const techColors = {
    // From the screenshot - assign specific colors to each tech
    'Computer Vision': '#00BFA5',           // Bright teal
    'Large Language Models': '#AB47BC',     // Purple
    'GX16-4': '#26A69A',                    // Teal green
    'POGO Pin Magnetic': '#00897B',         // Dark teal
    'Wi-Fi 6': '#2196F3',                   // Bright blue
    'MQTT': '#00BCD4',                      // Cyan
    'Embedded Platforms': '#1976D2',        // Deep blue
    'Smart Contracts': '#7E57C2',           // Light purple
    '3D Printing': '#009688',               // Teal
    'Real-Time Kinematic': '#004D40',       // Very dark teal
    'EUR-Pegged Stablecoins': '#00796B',    // Medium teal
    'Blockchain Ledger': '#1A237E',         // Very dark blue

    // Additional cyberpunk colors for other techs
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

// Fallback colors if tech not in the list
const fallbackColors = [
    '#00BFA5', '#AB47BC', '#2196F3', '#00BCD4', '#009688',
    '#7E57C2', '#1976D2', '#26A69A', '#00897B', '#004D40',
    '#D81B60', '#E64A19', '#FBC02D', '#7CB342', '#00ACC1'
];

async function updateColors() {
    const API_BASE_URL = 'http://localhost:5173/api';
    const adminSecret = localStorage.getItem('adminSecret');

    if (!adminSecret) {
        console.error('Not logged in as admin');
        return;
    }

    // Fetch current items
    const res = await fetch(`${API_BASE_URL}/tech-stack`);
    const items = await res.json();

    console.log(`Found ${items.length} items`);

    let updated = 0;
    let fallbackIndex = 0;

    for (const item of items) {
        // Get color for this specific tech
        let newColor = techColors[item.name];

        // If not found, use fallback
        if (!newColor) {
            newColor = fallbackColors[fallbackIndex % fallbackColors.length];
            fallbackIndex++;
        }

        console.log(`Updating ${item.name}: ${item.color} -> ${newColor}`);

        // Update item
        const payload = {
            ...item,
            color: newColor
        };

        await fetch(`${API_BASE_URL}/tech-stack`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-secret': adminSecret
            },
            body: JSON.stringify(payload)
        });

        updated++;

        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`✅ Updated ${updated} items!`);
    console.log('Reload the page to see changes');
}

// Run it
updateColors();

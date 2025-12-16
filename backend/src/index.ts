import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

// Simple Admin Secret (In production, use Environment Variables!)
const ADMIN_SECRET = 'JUVANTIA_ARCHITECT_KEY_888';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Middleware to protect admin routes
const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const secret = req.headers['x-admin-secret'];
    if (secret === ADMIN_SECRET) {
        next();
    } else {
        res.status(403).json({ error: 'Access Denied: Invalid or missing admin secret.' });
    }
};

// Get all districts (Public)
app.get('/api/districts', async (req, res) => {
    try {
        const districts = await prisma.district.findMany({
            include: { salesZones: true, buildings: true }
        });
        res.json(districts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch districts' });
    }
});

// Get specific district with tiles (Public)
app.get('/api/districts/:id', async (req, res) => {
    const { id } = req.params;
    const district = await prisma.district.findUnique({
        where: { id: Number(id) },
        include: { tiles: true, buildings: true },
    });
    res.json(district);
});

// Create a building (Admin Protected)
app.post('/api/buildings', requireAdmin, async (req, res) => {
    const { districtId, x, y, width, height, imageUrl, name } = req.body;
    try {
        const building = await prisma.building.create({
            data: {
                districtId: Number(districtId),
                x: Number(x),
                y: Number(y),
                width: Number(width),
                height: Number(height),
                imageUrl,
                name
            }
        });
        res.json(building);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create building' });
    }
});

// Delete a building (Admin Protected)
app.delete('/api/buildings/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.building.delete({
            where: { id: Number(id) }
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete building' });
    }
});

// Create a sales zone (Admin Protected)
app.post('/api/sales-zones', requireAdmin, async (req, res) => {
    const { districtId, x, y, width, height } = req.body;
    try {
        const zone = await prisma.salesZone.create({
            data: {
                districtId: Number(districtId),
                x: Number(x),
                y: Number(y),
                width: Number(width),
                height: Number(height)
            }
        });
        res.json(zone);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create sales zone' });
    }
});

// Bulk create sales zones (Admin Protected)
app.post('/api/sales-zones/bulk', requireAdmin, async (req, res) => {
    const { districtId, zones } = req.body; // zones is array of {x, y, width, height}
    try {
        // Transaction to ensure all or nothing
        const createdZones = await prisma.$transaction(
            zones.map((z: any) =>
                prisma.salesZone.create({
                    data: {
                        districtId: Number(districtId),
                        x: Number(z.x),
                        y: Number(z.y),
                        width: Number(z.width),
                        height: Number(z.height)
                    }
                })
            )
        );
        res.json(createdZones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to bulk create sales zones' });
    }
});

// Delete a sales zone (Admin Protected)
app.delete('/api/sales-zones/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.salesZone.delete({
            where: { id: Number(id) }
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete sales zone' });
    }
});

// Delete ALL sales zones for a district (Admin Protected)
app.delete('/api/sales-zones/district/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.salesZone.deleteMany({
            where: { districtId: Number(id) }
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to clear district zones' });
    }
});

// Delete sales zones within a specific area (Admin Protected)
app.post('/api/sales-zones/district/:id/clear-area', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const { x, y, width, height } = req.body;

    try {
        // Find zones that are completely within or overlapping the area?
        // Usually "Clear Area" implies clearing things inside the box.
        // Let's delete any zone that is strictly INSIDE or PARTIALLY INSIDE?
        // For safety, let's delete zones whose top-left corner is inside the box.
        // Or better, use Prisma's filtering.

        // Let's delete if the zone's x,y is within the bounds.
        await prisma.salesZone.deleteMany({
            where: {
                districtId: Number(id),
                x: { gte: Number(x), lt: Number(x) + Number(width) },
                y: { gte: Number(y), lt: Number(y) + Number(height) }
            }
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to clear area' });
    }
});

// Update district coordinates (Admin Protected)
app.put('/api/districts/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const { x, y, width, height } = req.body;
    try {
        const district = await prisma.district.update({
            where: { id: Number(id) },
            data: { x, y, width, height },
        });
        res.json(district);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update district' });
    }
});

// Admin: Update a tile (buy, reserve, etc.) (Admin Protected)
app.post('/api/admin/tile', requireAdmin, async (req, res) => {
    const { x, y, districtId, status, price, owner } = req.body;

    try {
        const tile = await prisma.landTile.upsert({
            where: {
                x_y: { x, y }
            },
            update: {
                status,
                price,
                owner
            },
            create: {
                x,
                y,
                districtId,
                status,
                price,
                owner
            }
        });
        res.json(tile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tile' });
    }
});

// Create a Memorandum (Public - anyone can submit)
app.post('/api/memorandums', async (req, res) => {
    const { name, contact, readyToBuild, experience, photos } = req.body;
    try {
        const memorandum = await prisma.memorandum.create({
            data: {
                name,
                contact,
                readyToBuild,
                experience,
                photos,
                status: 'PENDING'
            }
        });
        res.json(memorandum);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create memorandum' });
    }
});

// Get all Memorandums (Admin Protected)
app.get('/api/memorandums', requireAdmin, async (req, res) => {
    try {
        const memorandums = await prisma.memorandum.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(memorandums);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch memorandums' });
    }
});

// Update Memorandum status (Admin Protected)
app.put('/api/memorandums/:id/status', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const memorandum = await prisma.memorandum.update({
            where: { id: Number(id) },
            data: { status }
        });
        res.json(memorandum);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// Delete Memorandum (Admin Protected)
app.delete('/api/memorandums/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.memorandum.delete({
            where: { id: Number(id) }
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete memorandum' });
    }
});

// Get Memorandum count (Public - for progress bar)
app.get('/api/memorandums/count', async (req, res) => {
    try {
        const count = await prisma.memorandum.count({
            where: {
                status: 'APPROVED'
            }
        });
        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch count' });
    }
});


// --- Tech Stack API ---

// Get all Tech Stack items (Public)
app.get('/api/tech-stack', async (req, res) => {
    try {
        const items = await prisma.techStackItem.findMany({
            orderBy: { displayOrder: 'asc' }
        });
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tech stack' });
    }
});

// Upsert Tech Stack item (Admin Protected)
app.post('/api/tech-stack', requireAdmin, async (req, res) => {
    const { id, name, role, partner, description, layer, gridSpan, rowSpan, colStart, rowStart, verticalAlign, heightRatio, color, textColor, displayOrder } = req.body;
    try {
        const item = await prisma.techStackItem.upsert({
            where: { id },
            update: {
                name, role, partner, description, layer,
                gridSpan: Number(gridSpan),
                rowSpan: rowSpan ? Number(rowSpan) : 1,
                colStart: colStart ? Number(colStart) : null,
                rowStart: rowStart ? Number(rowStart) : null,
                verticalAlign: verticalAlign || 'end',
                heightRatio: Number(heightRatio),
                color, textColor,
                displayOrder: Number(displayOrder)
            },
            create: {
                id, name, role, partner, description, layer,
                gridSpan: Number(gridSpan),
                rowSpan: rowSpan ? Number(rowSpan) : 1,
                colStart: colStart ? Number(colStart) : null,
                rowStart: rowStart ? Number(rowStart) : null,
                verticalAlign: verticalAlign || 'end',
                heightRatio: Number(heightRatio),
                color, textColor,
                displayOrder: Number(displayOrder)
            }
        });
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save tech stack item' });
    }
});

// Delete Tech Stack item (Admin Protected)
app.delete('/api/tech-stack/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.techStackItem.delete({
            where: { id }
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// Initialize Default Tech Stack (Admin Protected)
app.post('/api/tech-stack/init', requireAdmin, async (req, res) => {
    const defaults = [
        {
            id: '3d-print', name: '3D Printing', role: 'Manufacturing', partner: 'Creality / Prusa (TBD)',
            description: 'On-site additive manufacturing facilities for rapid prototyping.', layer: 'physical',
            gridSpan: 3, heightRatio: 1, color: 'rgba(0, 150, 136, 0.2)', displayOrder: 1
        },
        {
            id: 'pogo', name: 'Pogo Pin', role: 'Charging', partner: 'Juvantia Hardware',
            description: 'Automated high-efficiency charging interface.', layer: 'physical',
            gridSpan: 3, heightRatio: 1, color: 'rgba(0, 180, 160, 0.25)', displayOrder: 2
        },
        {
            id: 'gx16', name: 'GX16-4', role: 'Grid Connect', partner: 'Standard Industrial',
            description: 'Robust aviation-style connectors.', layer: 'physical',
            gridSpan: 3, heightRatio: 1, color: 'rgba(0, 150, 136, 0.2)', displayOrder: 3
        },
        {
            id: 'vision', name: 'CV / Vision', role: 'Sensing', partner: 'OpenCV / YOLO',
            description: 'Advanced optical recognition systems.', layer: 'physical',
            gridSpan: 3, heightRatio: 1, color: 'rgba(0, 180, 160, 0.25)', displayOrder: 4
        },
        {
            id: 'wifi', name: 'Wi-Fi 6 Mesh', role: 'Communication', partner: 'Ubiquiti / Cisco',
            description: 'High-speed, low-latency city-wide mesh network.', layer: 'communication',
            gridSpan: 4, heightRatio: 1.2, color: 'rgba(0, 120, 255, 0.15)', displayOrder: 5
        },
        {
            id: 'esp32', name: 'ESP32 / Arduino', role: 'Embedded Control', partner: 'Espressif Systems',
            description: 'The cortex of every unit.', layer: 'communication',
            gridSpan: 4, heightRatio: 1.2, color: 'rgba(0, 100, 240, 0.2)', displayOrder: 6
        },
        {
            id: 'mqtt', name: 'MQTT', role: 'Messaging', partner: 'HiveMQ',
            description: 'Lightweight machine-to-machine messaging.', layer: 'communication',
            gridSpan: 4, heightRatio: 1.2, color: 'rgba(0, 120, 255, 0.15)', displayOrder: 7
        },
        {
            id: 'llm', name: 'LLM / AI Praetor', role: 'Cognitive Core', partner: 'Local LLaMA / OpenAI',
            description: 'The judicial and administrative mind.', layer: 'logic',
            gridSpan: 12, heightRatio: 1.8, color: 'rgba(147, 51, 234, 0.25)', textColor: '#e9d5ff', displayOrder: 8
        },
        {
            id: 'evm', name: 'EVM Smart Contracts', role: 'Governance Logic', partner: 'Polygon / Ethereum',
            description: 'The programmable law. Manages property rights.', layer: 'logic',
            gridSpan: 8, heightRatio: 1.5, color: 'rgba(79, 70, 229, 0.2)', displayOrder: 9
        },
        {
            id: 'stablecoins', name: 'Stablecoins', role: 'Currency', partner: 'USDC / USDT',
            description: 'Digital dollar-pegged currency.', layer: 'logic',
            gridSpan: 4, heightRatio: 1.5, color: 'rgba(5, 150, 105, 0.2)', displayOrder: 10
        },
        {
            id: 'blockchain', name: 'Blockchain Ledger', role: 'Immutable Foundation', partner: 'Juvantia L2',
            description: 'The bedrock of Juvantia. Securely records every transaction.', layer: 'fundamental',
            gridSpan: 12, heightRatio: 2.2, color: 'rgba(15, 23, 42, 0.6)', displayOrder: 11
        }
    ];

    try {
        await prisma.techStackItem.deleteMany({});
        const created = await Promise.all(defaults.map(item => prisma.techStackItem.create({ data: item })));
        res.json(created);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to initialize tech stack' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Backend restarted for Drag and Drop');
});

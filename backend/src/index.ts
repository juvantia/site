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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

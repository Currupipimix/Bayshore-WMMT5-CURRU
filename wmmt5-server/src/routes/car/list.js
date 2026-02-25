import { prisma } from "../../index.js";

export default async function carList(req, res) {
    try {
        const { userId } = req.body;

        const cars = await prisma.car.findMany({
            where: { userId: Number(userId) }
        });

        let xml = "";
        for (const car of cars) {
            xml += `
                <car>
                    <car_id>${car.id}</car_id>
                    <model>${car.name}</model>
                    <power>${car.power}</power>
                    <handling>${car.handling}</handling>
                    <dressup_level>${car.dressup_level || 0}</dressup_level>
                </car>
            `;
        }

        res.set("Content-Type", "application/xml");
        return res.send(`
            <response>
                <status>OK</status>
                <cars>
                    ${xml}
                </cars>
            </response>
        `);

    } catch (err) {
        console.error("carList error:", err);
        res.status(500).send("<response><status>ERROR</status></response>");
    }
}

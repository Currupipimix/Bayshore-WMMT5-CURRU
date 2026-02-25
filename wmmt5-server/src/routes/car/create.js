import { prisma } from "../../index.js";

export default async function carCreate(req, res) {
    try {
        const { userId, model } = req.body;

        const car = await prisma.car.create({
            data: {
                userId: Number(userId),
                name: model,
                power: 600,
                handling: 600,
                dressup_level: 0
            }
        });

        res.set("Content-Type", "application/xml");
        return res.send(`
            <response>
                <status>OK</status>
                <car_id>${car.id}</car_id>
            </response>
        `);

    } catch (err) {
        console.error("carCreate error:", err);
        res.status(500).send("<response><status>ERROR</status></response>");
    }
}

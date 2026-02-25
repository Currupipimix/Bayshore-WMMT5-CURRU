import { prisma } from "../../index.js";

export default async function carTune(req, res) {
    try {
        const { carId } = req.body;

        const car = await prisma.car.update({
            where: { id: Number(carId) },
            data: {
                power: { increment: 10 },
                handling: { increment: 10 }
            }
        });

        res.set("Content-Type", "application/xml");
        return res.send(`
            <response>
                <status>OK</status>
                <power>${car.power}</power>
                <handling>${car.handling}</handling>
            </response>
        `);

    } catch (err) {
        console.error("carTune error:", err);
        res.status(500).send("<response><status>ERROR</status></response>");
    }
}
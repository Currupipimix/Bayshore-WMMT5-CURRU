import { prisma } from "../../index.js";

export default async function ghostBattleStart(req, res) {
    try {
        const { userId, courseId } = req.body;
        const uid = Number(userId);

        // Buscar ghosts de otros jugadores
        const ghosts = await prisma.ghost.findMany({
            where: {
                user_id: { not: uid },
                course_id: Number(courseId)
            },
            orderBy: { created_at: "desc" }
        });

        let rival = null;

        if (ghosts.length > 0) {
            rival = ghosts[Math.floor(Math.random() * ghosts.length)];
        }

        // Si no hay rival → dummy
        if (!rival) {
            res.set("Content-Type", "application/xml");
            return res.send(`
                <response>
                    <status>OK</status>
                    <rival_name>CPU</rival_name>
                    <rival_car>R34 GT-R</rival_car>
                    <time_ms>120000</time_ms>
                    <ghost_blob>AAECAwQFBgcICQ==</ghost_blob>
                </response>
            `);
        }

        const rivalUser = await prisma.user.findUnique({
            where: { id: rival.user_id }
        });

        const rivalCar = await prisma.car.findFirst({
            where: { userId: rival.user_id }
        });

        res.set("Content-Type", "application/xml");
        return res.send(`
            <response>
                <status>OK</status>
                <rival_name>${rivalUser.username}</rival_name>
                <rival_car>${rivalCar?.name || "Unknown"}</rival_car>
                <time_ms>${rival.time_ms}</time_ms>
                <ghost_blob>${rival.ghost_blob.toString("base64")}</ghost_blob>
            </response>
        `);

    } catch (err) {
        console.error("ghostBattleStart error:", err);
        res.status(500).send("<response><status>ERROR</status></response>");
    }
}
import { prisma } from "../../index.js";

export default async function ghostBattleResult(req, res) {
    try {
        const { userId, courseId, result, time_ms, ghost_blob } = req.body;
        const uid = Number(userId);

        // Guardar ghost del jugador
        await prisma.ghost.create({
            data: {
                user_id: uid,
                course_id: Number(courseId),
                time_ms: Number(time_ms),
                ghost_blob: Buffer.from(ghost_blob, "base64")
            }
        });

        // Registrar batalla
        await prisma.ghost_battle.create({
            data: {
                user_id: uid,
                course_id: Number(courseId),
                result: result,
                time_ms: Number(time_ms)
            }
        });

        // Si pierde → no hay recompensas
        if (result !== "win") {
            res.set("Content-Type", "application/xml");
            return res.send(`
                <response>
                    <status>LOSE</status>
                </response>
            `);
        }

        // Recompensa básica WMMT5
        await prisma.user.update({
            where: { id: uid },
            data: { maxiGold: { increment: 50 } }
        });

        res.set("Content-Type", "application/xml");
        return res.send(`
            <response>
                <status>WIN</status>
                <reward_gold>50</reward_gold>
            </response>
        `);

    } catch (err) {
        console.error("ghostBattleResult error:", err);
        res.status(500).send("<response><status>ERROR</status></response>");
    }
}
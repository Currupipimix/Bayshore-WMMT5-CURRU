import { prisma } from "../../index.js";

export default async function ghostBattleRanking(req, res) {
    try {
        const ranking = await prisma.$queryRaw`
            SELECT 
                user_id,
                COUNT(*) AS wins
            FROM ghost_battle
            WHERE result = 'win'
            GROUP BY user_id
            ORDER BY wins DESC
            LIMIT 50;
        `;

        let xml = "";

        for (let i = 0; i < ranking.length; i++) {
            const user = await prisma.user.findUnique({
                where: { id: ranking[i].user_id }
            });

            xml += `
                <entry>
                    <position>${i + 1}</position>
                    <username>${user.username}</username>
                    <wins>${ranking[i].wins}</wins>
                </entry>
            `;
        }

        res.set("Content-Type", "application/xml");
        return res.send(`
            <response>
                <status>OK</status>
                <ranking>
                    ${xml}
                </ranking>
            </response>
        `);

    } catch (err) {
        console.error("ghostBattleRanking error:", err);
        res.status(500).send("<response><status>ERROR</status></response>");
    }
}
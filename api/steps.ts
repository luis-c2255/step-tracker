import { createClient } from '@libsql/client'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const result = await db.execute('SELECT * FROM steps ORDER BY date ASC')
      const rows = result.rows.map(r => ({
        id: r.id,
        date: r.date,
        steps: Number(r.steps),
        exchangedSteps: Number(r.exchanged_steps),
        coinsEarned: Number(r.coins_earned),
        activeCalories: Number(r.active_calories),
        floorsClimbed: Number(r.floors_climbed),
      }))
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { id, date, steps, exchangedSteps, coinsEarned, activeCalories, floorsClimbed } = req.body
      await db.execute({
        sql: `INSERT INTO steps (id, date, steps, exchanged_steps, coins_earned, active_calories, floors_climbed) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [id, date, steps, exchangedSteps, coinsEarned, activeCalories, floorsClimbed],
      })
      return res.status(201).json({ success: true })
    }

    if (req.method === 'PUT') {
      const { id, date, steps, exchangedSteps, coinsEarned, activeCalories, floorsClimbed } = req.body
      await db.execute({
        sql: `UPDATE steps SET date = ?, steps = ?, exchanged_steps = ?, coins_earned = ?, active_calories = ?, floors_climbed = ? WHERE id = ?`,
        args: [date, steps, exchangedSteps, coinsEarned, activeCalories, floorsClimbed, id],
      })
      return res.status(200).json({ success: true })
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      await db.execute({
        sql: `DELETE FROM steps WHERE id = ?`,
        args: [id as string],
      })
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
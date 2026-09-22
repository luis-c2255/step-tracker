import { createClient } from '@libsql/client'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const result = await db.execute('SELECT * FROM activities ORDER BY date DESC')
      const rows = result.rows.map(r => ({
        id: r.id,
        date: r.date,
        activityName: r.activity_name,
        coinsEarned: Number(r.coins_earned),
      }))
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { id, date, activityName, coinsEarned } = req.body
      await db.execute({
        sql: `INSERT INTO activities (id, date, activity_name, coins_earned) VALUES (?, ?, ?, ?)`,
        args: [id, date, activityName, coinsEarned],
      })
      return res.status(201).json({ success: true })
    }

    if (req.method === 'PUT') {
      const { id, date, activityName, coinsEarned } = req.body
      await db.execute({
        sql: `UPDATE activities SET date = ?, activity_name = ?, coins_earned = ? WHERE id = ?`,
        args: [date, activityName, coinsEarned, id],
      })
      return res.status(200).json({ success: true })
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      await db.execute({
        sql: `DELETE FROM activities WHERE id = ?`,
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
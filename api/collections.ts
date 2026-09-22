import { createClient } from '@libsql/client'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const result = await db.execute('SELECT * FROM collections')
      const rows = result.rows.map(r => ({
        id: r.id,
        region: r.region,
        name: r.name,
        cards: JSON.parse(r.cards as string),
        imageUrl: r.image_url ?? undefined,
      }))
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { id, region, name, cards, imageUrl } = req.body
      await db.execute({
        sql: `INSERT INTO collections (id, region, name, cards, image_url) VALUES (?, ?, ?, ?, ?)`,
        args: [id, region, name, JSON.stringify(cards), imageUrl ?? null],
      })
      return res.status(201).json({ success: true })
    }

    if (req.method === 'PUT') {
      const { id, region, name, cards, imageUrl } = req.body
      await db.execute({
        sql: `UPDATE collections SET region = ?, name = ?, cards = ?, image_url = ? WHERE id = ?`,
        args: [region, name, JSON.stringify(cards), imageUrl ?? null, id],
      })
      return res.status(200).json({ success: true })
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      await db.execute({
        sql: `DELETE FROM collections WHERE id = ?`,
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
const express = require('express')
const router = express.Router()
const Match = require('../models/Match')

// GET /api/matches — historique
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 })
    res.json(matches)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/matches/:id — détail d'un match
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
    if (!match) return res.status(404).json({ error: 'Match introuvable' })
    res.json(match)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/matches — sauvegarder un match
router.post('/', async (req, res) => {
  try {
    const match = new Match(req.body)
    const saved = await match.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router

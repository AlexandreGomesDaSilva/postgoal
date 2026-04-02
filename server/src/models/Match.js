const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
  player: { type: String, required: true },
  team: { type: String, enum: ['A', 'B'], required: true },
  minute: { type: Number, required: true }
})

const matchSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    duration: { type: String, required: true },
    teamA: [{ type: String }],
    teamB: [{ type: String }],
    scoreA: { type: Number, default: 0 },
    scoreB: { type: Number, default: 0 },
    goals: [goalSchema]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Match', matchSchema)

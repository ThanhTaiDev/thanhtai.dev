import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Helper function to format timestamp
function formatTimestamp(createdAt) {
  const now = new Date()
  const diffMs = now - new Date(createdAt)
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
  
  return new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// GET all comments (sorted: pinned first, then by newest)
router.get('/', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: [
        { isPinned: 'desc' }, // Pinned first
        { createdAt: 'desc' }, // Then newest first
      ],
    })

    // Format comments with timestamp
    const formattedComments = comments.map(comment => ({
      id: comment.id,
      name: comment.name,
      message: comment.message,
      timestamp: formatTimestamp(comment.createdAt),
      isPinned: comment.isPinned,
      profilePhoto: comment.profilePhoto,
    }))

    res.json(formattedComments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    res.status(500).json({ error: 'Failed to fetch comments' })
  }
})

// POST new comment
router.post('/', async (req, res) => {
  try {
    const { name, message, profilePhoto, isPinned } = req.body

    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' })
    }

    // profilePhoto should be a Cloudinary URL if provided
    const newComment = await prisma.comment.create({
      data: {
        name: name.trim(),
        message: message.trim(),
        profilePhoto: profilePhoto || null, // Cloudinary URL
        isPinned: isPinned || false,
      },
    })

    res.status(201).json({
      id: newComment.id,
      name: newComment.name,
      message: newComment.message,
      timestamp: formatTimestamp(newComment.createdAt),
      isPinned: newComment.isPinned,
      profilePhoto: newComment.profilePhoto,
    })
  } catch (error) {
    console.error('Error creating comment:', error)
    res.status(500).json({ error: 'Failed to create comment' })
  }
})

export default router


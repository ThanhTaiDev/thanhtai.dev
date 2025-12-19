const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export interface Comment {
  id: string
  name: string
  message: string
  timestamp: string
  isPinned?: boolean
  profilePhoto?: string | null
}

export interface CommentInput {
  name: string
  message: string
  profilePhoto?: string | null
  isPinned?: boolean
}

// Fetch all comments
export async function fetchComments(): Promise<Comment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`)
    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

// Upload image to Cloudinary via backend
export async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error('Failed to upload image')
    }
    
    const data = await response.json()
    return data.url // Return Cloudinary URL
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

// Create a new comment
export async function createComment(comment: CommentInput): Promise<Comment> {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
    if (!response.ok) {
      throw new Error('Failed to create comment')
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating comment:', error)
    throw error
  }
}


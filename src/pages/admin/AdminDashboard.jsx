import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialPost = {
  title: '',
  excerpt: '',
  image_url: '',
  published_at: '',
}

const initialUser = {
  name: '',
  email: '',
  role: 'user',
}

function formatDateInput(value) {
  if (!value) return ''
  const date = new Date(value)
  const iso = date.toISOString()
  return iso.slice(0, 16)
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState(['user', 'admin'])
  const [postForm, setPostForm] = useState(initialPost)
  const [editingPostId, setEditingPostId] = useState(null)
  const [userForm, setUserForm] = useState(initialUser)
  const [editingUserId, setEditingUserId] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [status, setStatus] = useState('')
  const [authChecked, setAuthChecked] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    async function verifyAdmin() {
      try {
        const response = await fetch('/api/me', { credentials: 'include' })
        if (!response.ok) {
          if (!cancelled) {
            window.dispatchEvent(new Event('omega-auth-changed'))
            navigate('/login', { replace: true })
          }
          return
        }

        const data = await response.json()
        const role = String(data?.user?.role || '').toLowerCase()
        if (!data.user || role !== 'admin') {
          if (!cancelled) {
            window.dispatchEvent(new Event('omega-auth-changed'))
            navigate('/login', { replace: true })
          }
          return
        }

        if (!cancelled) setAuthChecked(true)
      } catch {
        if (!cancelled) {
          window.dispatchEvent(new Event('omega-auth-changed'))
          navigate('/login', { replace: true })
        }
      }
    }

    verifyAdmin()
    return () => {
      cancelled = true
    }
  }, [navigate])

  const loadPosts = useCallback(async () => {
    try {
      const response = await fetch('/api/posts', { credentials: 'include' })
      const result = await response.json()
      if (response.ok) {
        setPosts(result.posts)
      }
    } catch (error) {
      setStatus(error.message)
    }
  }, [])

  const loadUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/users', { credentials: 'include' })
      if (response.status === 401 || response.status === 403) {
        window.dispatchEvent(new Event('omega-auth-changed'))
        navigate('/login', { replace: true })
        return
      }
      const result = await response.json()
      if (response.ok) {
        setUsers(result.users)
      }
    } catch (error) {
      setStatus(error.message)
    }
  }, [navigate])

  const loadRoles = useCallback(async () => {
    try {
      const response = await fetch('/api/roles', { credentials: 'include' })
      if (response.status === 401 || response.status === 403) {
        window.dispatchEvent(new Event('omega-auth-changed'))
        navigate('/login', { replace: true })
        return
      }
      const result = await response.json()
      if (response.ok) {
        setRoles(result.roles.map((role) => role.name))
      }
    } catch {
      setRoles(['user', 'admin'])
    }
  }, [navigate])

  const refreshData = useCallback(async () => {
    await Promise.all([loadPosts(), loadUsers(), loadRoles()])
  }, [loadPosts, loadUsers, loadRoles])

  useEffect(() => {
    if (!authChecked) return
    void refreshData()
  }, [authChecked, refreshData])

  useEffect(() => {
    if (!editingUserId) return
    const selected = users.find((user) => user.id === editingUserId)
    if (selected) {
      setUserForm({ name: selected.name, email: selected.email, role: selected.role })
      setStatus(`Editing user: ${selected.name}`)
    }
  }, [editingUserId, users])

  const handlePostChange = (event) => {
    const { id, value } = event.target
    setPostForm((current) => ({ ...current, [id]: value }))
  }

  const parseJsonResponse = async (response) => {
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      const text = await response.text()
      throw new Error(text || 'Server returned a non-JSON response.')
    }
    return response.json()
  }

  const handlePostSubmit = async (event) => {
    event.preventDefault()
    setStatus('Saving post...')

    try {
      const method = editingPostId ? 'PUT' : 'POST'
      const url = editingPostId ? `/api/posts/${editingPostId}` : '/api/posts'
      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...postForm,
          published_at: postForm.published_at || new Date().toISOString(),
        }),
      })
      if (response.status === 401 || response.status === 403) {
        window.dispatchEvent(new Event('omega-auth-changed'))
        navigate('/login', { replace: true })
        return
      }
      const result = await parseJsonResponse(response)
      if (!response.ok) throw new Error(result.error || 'Unable to save post.')
      setStatus(result.message)
      setPostForm(initialPost)
      setEditingPostId(null)
      await loadPosts()
    } catch (error) {
      setStatus(error.message)
    }
  }

  const handlePostEdit = (post) => {
    setEditingPostId(post.id)
    setPostForm({
      title: post.title,
      excerpt: post.excerpt,
      image_url: post.image_url || '',
      published_at: formatDateInput(post.published_at || post.created_at),
    })
    setStatus('Editing post')
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setUploadError('')
    setStatus('Uploading image...')

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      if (response.status === 401 || response.status === 403) {
        window.dispatchEvent(new Event('omega-auth-changed'))
        navigate('/login', { replace: true })
        return
      }

      let result
      try {
        result = await parseJsonResponse(response)
      } catch (parseError) {
        throw new Error(parseError.message)
      }

      if (!response.ok) {
        throw new Error(result.error || 'Image upload failed.')
      }

      setPostForm((current) => ({ ...current, image_url: result.image_url }))
      setStatus(result.message || 'Image uploaded successfully.')
    } catch (error) {
      setUploadError(error.message)
      setStatus(error.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const handlePostDelete = async (postId) => {
    setStatus('Deleting post...')
    try {
      const response = await fetch(`/api/posts/${postId}`, { method: 'DELETE', credentials: 'include' })
      if (response.status === 401 || response.status === 403) {
        window.dispatchEvent(new Event('omega-auth-changed'))
        navigate('/login', { replace: true })
        return
      }
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to delete post.')
      setStatus(result.message)
      await loadPosts()
    } catch (error) {
      setStatus(error.message)
    }
  }

  const handleUserChange = (event) => {
    const { id, value } = event.target
    setUserForm((current) => ({ ...current, [id]: value }))
  }

  const handleUserEdit = (user) => {
    setEditingUserId(user.id)
    setUserForm({ name: user.name, email: user.email, role: user.role })
    setStatus(`Editing user: ${user.name}`)
    const formTop = document.getElementById('user-edit-form')
    if (formTop) {
      formTop.scrollIntoView({ behavior: 'smooth', block: 'center' })
      const input = formTop.querySelector('#name')
      input?.focus()
    }
  }

  const handleUserCancel = () => {
    setEditingUserId(null)
    setUserForm(initialUser)
    setStatus('User edit canceled.')
  }

  const handleUserSave = async (event) => {
    event.preventDefault()
    if (!editingUserId) {
      setStatus('Please select a user first.')
      return
    }
    setStatus('Saving user...')

    try {
      const response = await fetch(`/api/users/${editingUserId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm),
      })
      if (response.status === 401 || response.status === 403) {
        window.dispatchEvent(new Event('omega-auth-changed'))
        navigate('/login', { replace: true })
        return
      }
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to update user.')
      setStatus(result.message)
      setEditingUserId(null)
      setUserForm(initialUser)
      await loadUsers()
    } catch (error) {
      setStatus(error.message)
    }
  }

  const handleUserDelete = async (userId) => {
    setStatus('Deleting user...')
    try {
      const response = await fetch(`/api/users/${userId}`, { method: 'DELETE', credentials: 'include' })
      if (response.status === 401 || response.status === 403) {
        window.dispatchEvent(new Event('omega-auth-changed'))
        navigate('/login', { replace: true })
        return
      }
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to delete user.')
      setStatus(result.message)
      await loadUsers()
    } catch (error) {
      setStatus(error.message)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    } finally {
      window.dispatchEvent(new Event('omega-auth-changed'))
      navigate('/', { replace: true })
    }
  }

  if (!authChecked) {
    return (
      <section className="admin-page admin-loading">
        <div className="site-container">
          <p>Verifying admin access...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="admin-page">
      <div className="site-container admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage blog posts and user accounts from one interface.</p>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-grid">
        <div className="admin-panel">
          <h2>Post editor</h2>
          <form className="admin-form" onSubmit={handlePostSubmit}>
            <label htmlFor="title">Title</label>
            <input id="title" value={postForm.title} onChange={handlePostChange} required />

            <label htmlFor="excerpt">Excerpt</label>
            <textarea id="excerpt" value={postForm.excerpt} onChange={handlePostChange} required rows="4" />

            <label htmlFor="image_url">Image URL</label>
            <input id="image_url" value={postForm.image_url} onChange={handlePostChange} placeholder="Paste a direct image URL" />

            <label htmlFor="image_upload">Upload image</label>
            <input id="image_upload" type="file" accept="image/*" onChange={handleImageUpload} />
            {uploadingImage && <p className="field-note">Uploading image…</p>}
            {uploadError && <p className="field-error">{uploadError}</p>}

            <label htmlFor="published_at">Publish date</label>
            <input id="published_at" type="datetime-local" value={postForm.published_at} onChange={handlePostChange} />

            <button className="btn btn-primary" type="submit">
              {editingPostId ? 'Update Post' : 'Create Post'}
            </button>
          </form>

          <div className="admin-panel admin-list">
            <h2>Posts</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{new Date(post.published_at).toLocaleDateString()}</td>
                    <td>
                      <button type="button" onClick={() => handlePostEdit(post)}>
                        Edit
                      </button>
                      <button type="button" onClick={() => handlePostDelete(post.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-panel">
          <h2>Users</h2>
          {editingUserId && (
            <form id="user-edit-form" className="admin-form" onSubmit={handleUserSave}>
              <div className="admin-form-header">
                <h3>Editing {userForm.name || 'user'}</h3>
                <button type="button" className="btn btn-secondary" onClick={handleUserCancel}>
                  Cancel
                </button>
              </div>

              <label htmlFor="name">Name</label>
              <input id="name" value={userForm.name} onChange={handleUserChange} required />

              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={userForm.email} onChange={handleUserChange} required />

              <label htmlFor="role">Role</label>
              <select id="role" value={userForm.role} onChange={handleUserChange}>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <button className="btn btn-primary" type="submit">
                Update User
              </button>
            </form>
          )}

          <div className="admin-panel admin-list">
            <h3>Registered users</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button type="button" onClick={() => handleUserEdit(user)}>
                        Edit
                      </button>
                      <button type="button" onClick={() => handleUserDelete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {status && <p className="admin-status">{status}</p>}
    </section>
  )
}


import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

const initialPost = {
  title: '',
  excerpt: '',
  image_url: '',
  published_at: '',
}

const initialUser = {
  name: '',
  email: '',
  password: '',
  role: 'user',
}

const initialCreateUser = {
  name: '',
  email: '',
  password: '',
  role: 'user',
}

const initialMemberForm = {
  company: '',
  website: '',
  logo: '',
  status: 'Active',
  addedOn: '2025-05-28',
}

const initialMembers = [
  {
    id: 1,
    company: 'Unilever',
    website: 'https://www.unilever.com',
    imageName: 'unilever.png',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 2,
    company: 'Haleeb',
    website: 'https://haleebfoods.com/',
    imageName: 'haleeb.jpeg',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 3,
    company: 'Pakola',
    website: 'https://pakola.com.pk/',
    imageName: 'pakola.png',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 4,
    company: 'Nestle',
    website: 'https://www.nestle.pk/',
    imageName: 'nestle.png',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 5,
    company: 'Dalda',
    website: 'https://www.daldafoods.com/',
    imageName: 'dalda.png',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 6,
    company: 'Gourmet Foods',
    website: 'https://www.gourmetfoods.pk/',
    imageName: 'gourment.png',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 7,
    company: "Adam's",
    website: 'https://www.adams.pk/',
    imageName: 'adams.jpeg',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 8,
    company: 'Fauji Foods',
    website: 'https://www.faujifoods.com',
    imageName: 'fauji.png',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 9,
    company: 'Dairyland',
    website: 'https://www.dairylandltd.com/',
    imageName: 'dairyland.jpeg',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 10,
    company: 'FrieslandCampina',
    website: 'https://www.frieslandcampina.com/pk/',
    imageName: 'fries.png',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 11,
    company: 'Tetra Pak',
    website: 'https://www.tetrapak.com/en-pk',
    imageName: 'tetra.jpeg',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
  {
    id: 12,
    company: 'Shakarganj',
    website: 'https://shakarganjfood.com/',
    imageName: 'shak.png',
    logo: '',
    status: 'Active',
    addedOn: '2025-05-28',
  },
]

function resolveMemberLogoSrc(member, imageUrls) {
  const logo = String(member?.logo || '').trim()
  if (!logo) return ''
  if (/^(data:|https?:\/\/|\/uploads\/)/i.test(logo)) return logo
  return imageUrls[logo] || ''
}

function formatDateInput(value) {
  if (!value) return ''
  const date = new Date(value)
  const iso = date.toISOString()
  return iso.slice(0, 16)
}

function formatDateShort(value) {
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}

function formatMemberDate(value) {
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}

function normalizeUrl(value) {
  if (!value) return ''
  return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

function formatMemberWebsite(value) {
  return normalizeUrl(value).replace(/^https?:\/\//i, '')
}

function getInitials(value) {
  return String(value || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function buildCsv(users) {
  const escapeCell = (value) => {
    const safe = String(value ?? '')
    if (/[",\n]/.test(safe)) return `"${safe.replaceAll('"', '""')}"`
    return safe
  }

  const header = ['Name', 'Email', 'Role', 'Joined']
  const rows = users.map((user) => [
    escapeCell(user.name),
    escapeCell(user.email),
    escapeCell(user.role),
    escapeCell(user.created_at),
  ])
  return [header, ...rows].map((row) => row.join(',')).join('\n')
}

function downloadTextFile(filename, text, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }
  switch (name) {
    case 'users':
      return (
        <svg {...common}>
          <path
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M22 21v-2a4 4 0 0 0-3-3.87"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 3.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'post':
      return (
        <svg {...common}>
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 13h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'member':
      return (
        <svg {...common}>
          <path
            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M18 8h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 6v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'traffic':
      return (
        <svg {...common}>
          <path
            d="M3 3v18h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 14l4-4 3 3 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'search':
      return (
        <svg {...common}>
          <path
            d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...common}>
          <path
            d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.73 21a2 2 0 0 1-3.46 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'edit':
      return (
        <svg {...common}>
          <path
            d="M12 20h9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="m16.5 3.5 4 4L8 20l-5 1 1-5 12.5-12.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'view':
      return (
        <svg {...common}>
          <path
            d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case 'delete':
      return (
        <svg {...common}>
          <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M8 6V4h8v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 6l-1 14H6L5 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 11v5M14 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'external':
      return (
        <svg {...common}>
          <path
            d="M14 4h6v6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 14 20 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'memberCard':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M7.5 10h3M7.5 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16.5" cy="11" r="2.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    default:
      return null
  }
}

function Modal({ title, children, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="admin-modal-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="admin-modal-header">
          <h3>{title}</h3>
          <button type="button" className="admin-icon-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Avatar({ name }) {
  const initials = String(name || 'Admin')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return <span className="admin-avatar">{initials || 'A'}</span>
}

function MemberLogo({ src, name, large = false }) {
  const [failedSrc, setFailedSrc] = useState('')
  const initials = getInitials(name) || 'M'
  const failed = failedSrc === src

  return (
    <div className={`admin-member-logo-wrap ${large ? 'is-large' : ''}`}>
      {src && !failed ? (
        <img className="admin-member-logo" src={src} alt={name} onError={() => setFailedSrc(src)} />
      ) : (
        <span className="admin-member-logo-fallback">{initials}</span>
      )}
    </div>
  )
}

export default function AdminDashboardModern() {
  const imageUrls = useDatabaseImages()
  const [adminUser, setAdminUser] = useState(null)
  const [activeSection, setActiveSection] = useState('users')
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState(['user', 'admin'])
  const [postForm, setPostForm] = useState(initialPost)
  const [editingPostId, setEditingPostId] = useState(null)
  const [userForm, setUserForm] = useState(initialUser)
  const [editingUserId, setEditingUserId] = useState(null)
  const [createUserOpen, setCreateUserOpen] = useState(false)
  const [createUserForm, setCreateUserForm] = useState(initialCreateUser)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [status, setStatus] = useState('')
  const [authChecked, setAuthChecked] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const [userSearch, setUserSearch] = useState('')
  const [userRoleFilter, setUserRoleFilter] = useState('all')
  const [userPage, setUserPage] = useState(1)
  const [userPageSize, setUserPageSize] = useState(10)
  const [members, setMembers] = useState(initialMembers)
  const [memberSearch, setMemberSearch] = useState('')
  const [memberStatusFilter, setMemberStatusFilter] = useState('all')
  const [memberPage, setMemberPage] = useState(1)
  const [memberForm, setMemberForm] = useState(initialMemberForm)
  const [createMemberOpen, setCreateMemberOpen] = useState(false)
  const [editingMemberId, setEditingMemberId] = useState(null)
  const [memberPreview, setMemberPreview] = useState(null)

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

        if (!cancelled) {
          setAdminUser(data.user)
          setAuthChecked(true)
        }
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

  useEffect(() => {
    if (!profileOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setProfileOpen(false)
    }
    const onPointerDown = (event) => {
      const target = event.target
      if (!(target instanceof HTMLElement)) return
      if (target.closest('.admin-profile-wrap')) return
      setProfileOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [profileOpen])

  useEffect(() => {
    if (!editingUserId) return
    const selected = users.find((user) => user.id === editingUserId)
    if (!selected) return
    setUserForm({ name: selected.name, email: selected.email, password: '', role: selected.role })
  }, [editingUserId, users])

  useEffect(() => {
    if (!status) return
    const normalized = String(status).trim()
    if (!normalized) return

    const isLoadingMessage = /(\.\.\.|…)$/.test(normalized)
    if (isLoadingMessage) return

    const timer = window.setTimeout(() => setStatus(''), 2600)
    return () => window.clearTimeout(timer)
  }, [status])

  useEffect(() => {
    setUserPage(1)
  }, [userSearch, userRoleFilter, userPageSize])

  useEffect(() => {
    setMemberPage(1)
  }, [memberSearch, memberStatusFilter])

  useEffect(() => {
    if (!editingMemberId) return
    const selected = members.find((member) => member.id === editingMemberId)
    if (!selected) return
    setMemberForm({
      company: selected.company,
      website: selected.website,
      logo: selected.logo,
      status: selected.status,
      addedOn: selected.addedOn,
    })
  }, [editingMemberId, members])

  const parseJsonResponse = async (response) => {
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      const text = await response.text()
      throw new Error(text || 'Server returned a non-JSON response.')
    }
    return response.json()
  }

  const loadPosts = useCallback(async () => {
    try {
      const response = await fetch('/api/posts', { credentials: 'include' })
      const result = await response.json()
      if (response.ok) setPosts(result.posts)
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
      if (response.ok) setUsers(result.users)
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
      if (response.ok) setRoles(result.roles.map((role) => role.name))
    } catch {
      setRoles(['user', 'admin'])
    }
  }, [navigate])

  const loadMembers = useCallback(async () => {
    try {
      const response = await fetch('/api/members', { credentials: 'include' })
      const result = await response.json()
      if (response.ok) {
        setMembers(
          result.members.map((member) => ({
            id: member.id,
            logo: member.logo,
            company: member.company_name,
            website: member.website_url,
            status: member.status,
            addedOn: member.added_on,
          })),
        )
      }
    } catch (error) {
      setStatus(error.message)
    }
  }, [])

  const refreshData = useCallback(async () => {
    await Promise.all([loadPosts(), loadUsers(), loadRoles(), loadMembers()])
  }, [loadMembers, loadPosts, loadRoles, loadUsers])

  useEffect(() => {
    if (!authChecked) return
    void refreshData()
  }, [authChecked, refreshData])

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    } finally {
      setProfileOpen(false)
      window.dispatchEvent(new Event('omega-auth-changed'))
      navigate('/', { replace: true })
    }
  }

  const handlePostChange = (event) => {
    const { id, value } = event.target
    setPostForm((current) => ({ ...current, [id]: value }))
  }

  const handlePostSubmit = async (event) => {
    event.preventDefault()
    setStatus('Saving post…')

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
    setActiveSection('posts')
    setEditingPostId(post.id)
    setPostForm({
      title: post.title,
      excerpt: post.excerpt,
      image_url: post.image_url || '',
      published_at: formatDateInput(post.published_at || post.created_at),
    })
    setStatus('Editing post')
  }

  const handlePostDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return
    setStatus('Deleting post…')
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

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setUploadError('')

    try {
      const formData = new FormData()
      formData.append('image', file)
      const response = await fetch('/api/upload-image', { method: 'POST', credentials: 'include', body: formData })
      if (response.status === 401 || response.status === 403) {
        window.dispatchEvent(new Event('omega-auth-changed'))
        navigate('/login', { replace: true })
        return
      }
      const result = await parseJsonResponse(response)
      if (!response.ok) throw new Error(result.error || 'Unable to upload image.')
      setPostForm((current) => ({ ...current, image_url: result.image_url }))
      setStatus(result.message)
    } catch (error) {
      setUploadError(error.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleUserChange = (event) => {
    const { id, value } = event.target
    setUserForm((current) => ({ ...current, [id]: value }))
  }

  const handleUserSave = async (event) => {
    event.preventDefault()
    if (!editingUserId) return
    setStatus('Saving user…')

    try {
      const payload = {
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
      }

      const nextPassword = String(userForm.password || '').trim()
      if (nextPassword) payload.password = nextPassword

      const response = await fetch(`/api/users/${editingUserId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    if (!window.confirm('Delete this user?')) return
    setStatus('Deleting user…')
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

  const handleCreateUserChange = (event) => {
    const { id, value } = event.target
    setCreateUserForm((current) => ({ ...current, [id]: value }))
  }

  const handleCreateUser = async (event) => {
    event.preventDefault()
    setStatus('Creating user…')
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createUserForm),
      })
      if (response.status === 401 || response.status === 403) {
        window.dispatchEvent(new Event('omega-auth-changed'))
        navigate('/login', { replace: true })
        return
      }
      const result = await parseJsonResponse(response)
      if (!response.ok) throw new Error(result.error || 'Unable to create user.')
      setStatus(result.message)
      setCreateUserForm(initialCreateUser)
      setCreateUserOpen(false)
      await loadUsers()
    } catch (error) {
      setStatus(error.message)
    }
  }

  const filteredUsers = useMemo(() => {
    const search = userSearch.trim().toLowerCase()
    return users.filter((user) => {
      if (userRoleFilter !== 'all' && String(user.role).toLowerCase() !== userRoleFilter) return false
      if (!search) return true
      return (
        String(user.name).toLowerCase().includes(search) ||
        String(user.email).toLowerCase().includes(search) ||
        String(user.role).toLowerCase().includes(search)
      )
    })
  }, [users, userSearch, userRoleFilter])

  const totalUserPages = Math.max(1, Math.ceil(filteredUsers.length / userPageSize))
  const safeUserPage = Math.min(userPage, totalUserPages)
  const pagedUsers = useMemo(() => {
    const start = (safeUserPage - 1) * userPageSize
    return filteredUsers.slice(start, start + userPageSize)
  }, [filteredUsers, safeUserPage, userPageSize])

  const handleMemberChange = (event) => {
    const { id, value } = event.target
    setMemberForm((current) => ({ ...current, [id]: value }))
  }

  const handleMemberLogoFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setStatus('Please choose an image file for the logo.')
      event.target.value = ''
      return
    }

    setStatus('Uploading logo...')

    try {
      const formData = new FormData()
      formData.append('image', file)
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const result = await parseJsonResponse(response)
      if (!response.ok) throw new Error(result.error || 'Unable to upload logo image.')
      setMemberForm((current) => ({ ...current, logo: result.image_url }))
      setStatus('Logo image added.')
    } catch (error) {
      setStatus(error.message)
    } finally {
      event.target.value = ''
    }
  }

  const handleCreateMember = () => {
    setEditingMemberId(null)
    setMemberForm(initialMemberForm)
    setCreateMemberOpen(true)
  }

  const closeMemberEditor = () => {
    setCreateMemberOpen(false)
    setEditingMemberId(null)
    setMemberForm(initialMemberForm)
  }

  const handleMemberSubmit = (event) => {
    event.preventDefault()
    void (async () => {
      const payload = {
        company_name: memberForm.company.trim(),
        website_url: normalizeUrl(memberForm.website.trim()),
        logo: memberForm.logo.trim(),
        status: memberForm.status,
        added_on: memberForm.addedOn,
      }

      if (!payload.logo) {
        setStatus('Please add a logo image or logo name.')
        return
      }

      setStatus(editingMemberId ? 'Updating member...' : 'Creating member...')

      try {
        const response = await fetch(editingMemberId ? `/api/members/${editingMemberId}` : '/api/members', {
          method: editingMemberId ? 'PUT' : 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const result = await parseJsonResponse(response)
        if (!response.ok) throw new Error(result.error || 'Unable to save member.')
        setStatus(result.message)
        closeMemberEditor()
        await loadMembers()
      } catch (error) {
        setStatus(error.message)
      }
    })()
  }

  const handleMemberEdit = (member) => {
    setCreateMemberOpen(true)
    setEditingMemberId(member.id)
  }

  const handleMemberDelete = async (memberId) => {
    const member = members.find((item) => item.id === memberId)
    if (!member) return
    if (!window.confirm(`Delete ${member.company}?`)) return
    setStatus('Deleting member...')
    try {
      const response = await fetch(`/api/members/${memberId}`, { method: 'DELETE', credentials: 'include' })
      const result = await parseJsonResponse(response)
      if (!response.ok) throw new Error(result.error || 'Unable to delete member.')
      setStatus(result.message)
      await loadMembers()
    } catch (error) {
      setStatus(error.message)
    }
  }

  const filteredMembers = useMemo(() => {
    const search = memberSearch.trim().toLowerCase()
    return members.filter((member) => {
      if (memberStatusFilter !== 'all' && String(member.status).toLowerCase() !== memberStatusFilter) return false
      if (!search) return true
      return (
        String(member.company).toLowerCase().includes(search) ||
        String(member.website).toLowerCase().includes(search) ||
        String(member.status).toLowerCase().includes(search)
      )
    })
  }, [members, memberSearch, memberStatusFilter])

  const totalMemberPages = Math.max(1, Math.ceil(filteredMembers.length / 10))
  const safeMemberPage = Math.min(memberPage, totalMemberPages)
  const pagedMembers = useMemo(() => {
    const start = (safeMemberPage - 1) * 10
    return filteredMembers.slice(start, start + 10)
  }, [filteredMembers, safeMemberPage])

  const metrics = useMemo(() => {
    const totalUsers = users.length
    const adminCount = users.filter((user) => String(user.role).toLowerCase() === 'admin').length
    const now = Date.now()
    const weekAgo = now - 1000 * 60 * 60 * 24 * 7
    const newThisWeek = users.filter((user) => new Date(user.created_at).getTime() >= weekAgo).length
    return { totalUsers, adminCount, newThisWeek, postCount: posts.length }
  }, [users, posts])

  const trafficTrends = useMemo(() => {
    const previousUsers = Math.max(0, metrics.totalUsers - metrics.newThisWeek)
    const rawPercent =
      previousUsers === 0 ? (metrics.newThisWeek > 0 ? 100 : 0) : Math.round((metrics.newThisWeek / previousUsers) * 100)
    const percent = Math.max(0, Math.min(999, rawPercent))
    const usersTrend = metrics.newThisWeek > 0 ? `↑ ${percent}% vs last 7 days` : 'No new users this week'
    const postsTrend = metrics.postCount > 0 ? 'Updated recently' : 'No posts yet'
    return { usersTrend, postsTrend }
  }, [metrics.newThisWeek, metrics.postCount, metrics.totalUsers])

  const weeklySparkline = useMemo(() => {
    const now = new Date()
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now)
      date.setDate(now.getDate() - (6 - i))
      date.setHours(0, 0, 0, 0)
      return date
    })

    const counts = days.map((day) => {
      const next = new Date(day)
      next.setDate(day.getDate() + 1)
      return users.filter((user) => {
        const created = new Date(user.created_at).getTime()
        return created >= day.getTime() && created < next.getTime()
      }).length
    })

    const max = Math.max(1, ...counts)
    const w = 220
    const h = 56
    const pad = 6
    const points = counts
      .map((count, index) => {
        const x = pad + (index * (w - pad * 2)) / (counts.length - 1)
        const y = h - pad - (count / max) * (h - pad * 2)
        return `${x.toFixed(2)},${y.toFixed(2)}`
      })
      .join(' ')

    return { w, h, points }
  }, [users])

  const sectionTitle = useMemo(() => {
    if (activeSection === 'users') return 'Users'
    if (activeSection === 'posts') return 'Posts'
    if (activeSection === 'members') return 'Members'
    if (activeSection === 'traffic') return 'Site Traffic'
    return 'Dashboard'
  }, [activeSection])

  const sectionDescription = useMemo(() => {
    if (activeSection === 'users') return 'Manage and view all registered users.'
    if (activeSection === 'posts') return 'Create, edit, and publish site content.'
    if (activeSection === 'members') return 'Manage our partner members and their logos.'
    if (activeSection === 'traffic') return 'Track growth and monitor admin activity.'
    return 'Manage your content and settings.'
  }, [activeSection])

  if (!authChecked) {
    return (
      <section className="admin-page admin-loading">
        <div className="site-container">
          <p>Verifying admin access…</p>
        </div>
      </section>
    )
  }

  return (
    <section className="admin-page admin-modern">
      <div className="site-container admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <span className="admin-brand-dot" />
            <span>Dashboard</span>
          </div>

          <nav className="admin-nav" aria-label="Admin navigation">
            <button
              type="button"
              className={`admin-nav-btn ${activeSection === 'users' ? 'is-active' : ''}`}
              onClick={() => setActiveSection('users')}
            >
              <Icon name="users" />
              Users
            </button>
            <button
              type="button"
              className={`admin-nav-btn ${activeSection === 'posts' ? 'is-active' : ''}`}
              onClick={() => setActiveSection('posts')}
            >
              <Icon name="post" />
              Add Post
            </button>
            <button
              type="button"
              className={`admin-nav-btn ${activeSection === 'members' ? 'is-active' : ''}`}
              onClick={() => setActiveSection('members')}
            >
              <Icon name="member" />
              Add Member
            </button>
            <button
              type="button"
              className={`admin-nav-btn ${activeSection === 'traffic' ? 'is-active' : ''}`}
              onClick={() => setActiveSection('traffic')}
            >
              <Icon name="traffic" />
              Site Traffic
            </button>
          </nav>

          <div className="admin-sidecard">
            <div className="admin-sidecard-top">
              <p className="admin-sidecard-title">Overview</p>
              <p className="admin-sidecard-sub">Last 7 days</p>
            </div>
            <div className="admin-sidecard-metric">
              <div>
                <p className="admin-sidecard-value">{metrics.totalUsers}</p>
                <p className="admin-sidecard-label">Total users</p>
              </div>
              <div className="admin-sidecard-mini">
                <svg width={weeklySparkline.w} height={weeklySparkline.h} viewBox={`0 0 ${weeklySparkline.w} ${weeklySparkline.h}`}>
                  <polyline
                    points={weeklySparkline.points}
                    fill="none"
                    stroke="rgba(255,255,255,0.88)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="admin-sidecard-grid">
              <div className="admin-sidecard-chip">
                <p className="admin-sidecard-chip-value">{metrics.newThisWeek}</p>
                <p className="admin-sidecard-chip-label">New</p>
              </div>
              <div className="admin-sidecard-chip">
                <p className="admin-sidecard-chip-value">{metrics.adminCount}</p>
                <p className="admin-sidecard-chip-label">Admins</p>
              </div>
              <div className="admin-sidecard-chip">
                <p className="admin-sidecard-chip-value">{metrics.postCount}</p>
                <p className="admin-sidecard-chip-label">Posts</p>
              </div>
              <div className="admin-sidecard-chip">
                <p className="admin-sidecard-chip-value">{userPageSize}</p>
                <p className="admin-sidecard-chip-label">Per page</p>
              </div>
            </div>
          </div>

          <button type="button" className="admin-logout" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="admin-main">
          <div className="admin-topbar">
            <div className="admin-topbar-title">
              <h1>{sectionTitle}</h1>
              <p>{sectionDescription}</p>
            </div>

            <div className="admin-topbar-actions">
              <button type="button" className="admin-icon-btn" aria-label="Notifications">
                <Icon name="bell" />
              </button>

              <div className="admin-profile-wrap">
                <button
                  type="button"
                  className="admin-profile"
                  aria-haspopup="dialog"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((open) => !open)}
                >
                  <Avatar name={adminUser?.name || 'Muzammil Admin'} />
                  <div className="admin-profile-meta">
                    <p className="admin-profile-name">{adminUser?.name || 'Muzammil Admin'}</p>
                    <p className="admin-profile-role">Admin</p>
                  </div>
                </button>

                {profileOpen && (
                  <div className="admin-profile-card" role="dialog" aria-label="Profile">
                    <div className="admin-profile-card-top">
                      <Avatar name={adminUser?.name || 'Muzammil Admin'} />
                      <div className="admin-profile-card-meta">
                        <p className="admin-profile-card-name">{adminUser?.name || 'Muzammil Admin'}</p>
                        <p className="admin-profile-card-role">Admin</p>
                      </div>
                    </div>
                    <div className="admin-profile-card-body">
                      <div className="admin-profile-row">
                        <span className="admin-profile-key">Email</span>
                        <span className="admin-profile-value">{adminUser?.email || '—'}</span>
                      </div>
                      <div className="admin-profile-row">
                        <span className="admin-profile-key">User ID</span>
                        <span className="admin-profile-value">{adminUser?.id ?? '—'}</span>
                      </div>
                    </div>
                    <div className="admin-profile-card-actions">
                      <button type="button" className="btn btn-secondary admin-btn" onClick={() => setProfileOpen(false)}>
                        Close
                      </button>
                      <button type="button" className="btn btn-primary admin-btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {activeSection === 'users' && (
            <div className="admin-content">
              <div className="admin-card">
                <div className="admin-card-header">
                  <div className="admin-card-header-left">
                    <h2>All Users</h2>
                    <p>Manage and view all registered users.</p>
                  </div>
                  <div className="admin-card-header-right">
                    <button type="button" className="btn btn-primary admin-btn" onClick={() => setCreateUserOpen(true)}>
                      + Add User
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary admin-btn"
                      onClick={() => {
                        const csv = buildCsv(filteredUsers)
                        downloadTextFile(`users-${new Date().toISOString().slice(0, 10)}.csv`, csv, 'text/csv;charset=utf-8')
                      }}
                    >
                      Export
                    </button>
                  </div>
                </div>

                <div className="admin-toolbar">
                  <label className="admin-search">
                    <span className="admin-search-icon">
                      <Icon name="search" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                    />
                  </label>

                  <label className="admin-select">
                    <span>Role</span>
                    <select value={userRoleFilter} onChange={(e) => setUserRoleFilter(e.target.value)}>
                      <option value="all">All roles</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="admin-select">
                    <span>Rows</span>
                    <select value={userPageSize} onChange={(e) => setUserPageSize(Number(e.target.value))}>
                      {[5, 10, 20, 50].map((size) => (
                        <option key={size} value={size}>
                          {size} / page
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-modern-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th className="admin-actions-col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedUsers.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className="admin-usercell">
                              <Avatar name={user.name} />
                              <span className="admin-usercell-name">{user.name}</span>
                            </div>
                          </td>
                          <td className="admin-muted">{user.email}</td>
                          <td>
                            <span className={`admin-pill admin-pill-role admin-pill-${String(user.role).toLowerCase()}`}>
                              {String(user.role).charAt(0).toUpperCase() + String(user.role).slice(1)}
                            </span>
                          </td>
                          <td>
                            <span className="admin-pill admin-pill-status admin-pill-active">Active</span>
                          </td>
                          <td className="admin-muted">{formatDateShort(user.created_at)}</td>
                          <td className="admin-actions-col">
                            <details className="admin-actions">
                              <summary className="admin-actions-trigger" aria-label="User actions">
                                ⋯
                              </summary>
                              <div className="admin-actions-menu">
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.currentTarget.closest('details')?.removeAttribute('open')
                                    setEditingUserId(user.id)
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="is-danger"
                                  onClick={(event) => {
                                    event.currentTarget.closest('details')?.removeAttribute('open')
                                    handleUserDelete(user.id)
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </details>
                          </td>
                        </tr>
                      ))}
                      {pagedUsers.length === 0 && (
                        <tr>
                          <td colSpan={6} className="admin-empty">
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="admin-pagination">
                  <p className="admin-muted">
                    Showing {(safeUserPage - 1) * userPageSize + (pagedUsers.length ? 1 : 0)} to{' '}
                    {(safeUserPage - 1) * userPageSize + pagedUsers.length} of {filteredUsers.length} users
                  </p>
                  <div className="admin-pagination-controls">
                    <button
                      type="button"
                      className="admin-page-btn"
                      onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                      disabled={safeUserPage <= 1}
                    >
                      Prev
                    </button>
                    <span className="admin-page-indicator">
                      {safeUserPage} / {totalUserPages}
                    </span>
                    <button
                      type="button"
                      className="admin-page-btn"
                      onClick={() => setUserPage((p) => Math.min(totalUserPages, p + 1))}
                      disabled={safeUserPage >= totalUserPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'posts' && (
            <div className="admin-content admin-content-grid">
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h2>Post Editor</h2>
                    <p>Create and update blog posts.</p>
                  </div>
                </div>

                <form className="admin-modern-form" onSubmit={handlePostSubmit}>
                  <label>
                    <span>Title</span>
                    <input id="title" value={postForm.title} onChange={handlePostChange} required />
                  </label>

                  <label>
                    <span>Excerpt</span>
                    <textarea id="excerpt" value={postForm.excerpt} onChange={handlePostChange} required rows={5} />
                  </label>

                  <div className="admin-form-2col">
                    <label>
                      <span>Image URL</span>
                      <input
                        id="image_url"
                        value={postForm.image_url}
                        onChange={handlePostChange}
                        placeholder="Paste a direct image URL"
                      />
                    </label>

                    <label>
                      <span>Upload image</span>
                      <input id="image_upload" type="file" accept="image/*" onChange={handleImageUpload} />
                      {uploadingImage && <p className="admin-note">Uploading image…</p>}
                      {uploadError && <p className="admin-error">{uploadError}</p>}
                    </label>
                  </div>

                  <label>
                    <span>Publish date</span>
                    <input id="published_at" type="datetime-local" value={postForm.published_at} onChange={handlePostChange} />
                  </label>

                  <div className="admin-form-actions">
                    <button className="btn btn-primary admin-btn" type="submit">
                      {editingPostId ? 'Update Post' : 'Create Post'}
                    </button>
                    {editingPostId && (
                      <button
                        type="button"
                        className="btn btn-secondary admin-btn"
                        onClick={() => {
                          setEditingPostId(null)
                          setPostForm(initialPost)
                          setStatus('Post edit canceled.')
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h2>Posts</h2>
                    <p>Latest posts first.</p>
                  </div>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-modern-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Published</th>
                        <th className="admin-actions-col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td>{post.title}</td>
                          <td className="admin-muted">{formatDateShort(post.published_at)}</td>
                          <td className="admin-actions-col">
                            <details className="admin-actions">
                              <summary className="admin-actions-trigger" aria-label="Actions">
                                ⋯
                              </summary>
                              <div className="admin-actions-menu">
                                <button type="button" onClick={() => handlePostEdit(post)}>
                                  Edit
                                </button>
                                <button type="button" className="is-danger" onClick={() => handlePostDelete(post.id)}>
                                  Delete
                                </button>
                              </div>
                            </details>
                          </td>
                        </tr>
                      ))}
                      {posts.length === 0 && (
                        <tr>
                          <td colSpan={3} className="admin-empty">
                            No posts yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'members' && (
            <div className="admin-content">
              <div className="admin-card admin-members-banner">
                <div className="admin-members-banner-icon" aria-hidden="true">
                  <Icon name="memberCard" />
                </div>
                <div className="admin-members-banner-copy">
                  <p className="admin-members-banner-eyebrow">Our Members</p>
                  <p className="admin-members-banner-text">
                    Add and manage the companies and organizations we are partnered with. Their logos appear in the
                    website&apos;s members section.
                  </p>
                </div>
                <button type="button" className="btn btn-primary admin-btn" onClick={handleCreateMember}>
                  Add New Member
                </button>
              </div>

              <div className="admin-card">
                <div className="admin-card-header admin-card-header-members">
                  <div>
                    <h2>All Members</h2>
                    <p>{filteredMembers.length} total partner records</p>
                  </div>

                  <div className="admin-members-filters">
                    <label className="admin-search admin-members-search">
                      <span className="admin-search-icon">
                        <Icon name="search" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search members..."
                        value={memberSearch}
                        onChange={(e) => setMemberSearch(e.target.value)}
                      />
                    </label>

                    <label className="admin-select admin-members-select">
                      <select value={memberStatusFilter} onChange={(e) => setMemberStatusFilter(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="admin-table-wrap">
                  <table className="admin-modern-table">
                    <thead>
                      <tr>
                        <th>Logo</th>
                        <th>Company Name</th>
                        <th>Website</th>
                        <th>Status</th>
                        <th>Added On</th>
                        <th className="admin-actions-col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedMembers.map((member) => (
                        <tr key={member.id}>
                          <td>
                            <MemberLogo src={resolveMemberLogoSrc(member, imageUrls)} name={member.company} />
                          </td>
                          <td className="admin-member-company">{member.company}</td>
                          <td>
                            <a className="admin-member-link" href={member.website} target="_blank" rel="noopener noreferrer">
                              <span>{formatMemberWebsite(member.website)}</span>
                              <Icon name="external" />
                            </a>
                          </td>
                          <td>
                            <span
                              className={`admin-pill admin-pill-status ${
                                String(member.status).toLowerCase() === 'active' ? 'admin-pill-active' : 'admin-pill-inactive'
                              }`}
                            >
                              {member.status}
                            </span>
                          </td>
                          <td className="admin-muted">{formatMemberDate(member.addedOn)}</td>
                          <td className="admin-actions-col">
                            <div className="admin-inline-actions">
                              <button
                                type="button"
                                className="admin-table-icon-btn"
                                aria-label={`View ${member.company}`}
                                onClick={() => setMemberPreview(member)}
                              >
                                <Icon name="view" />
                              </button>
                              <button
                                type="button"
                                className="admin-table-icon-btn"
                                aria-label={`Edit ${member.company}`}
                                onClick={() => handleMemberEdit(member)}
                              >
                                <Icon name="edit" />
                              </button>
                              <button
                                type="button"
                                className="admin-table-icon-btn is-danger"
                                aria-label={`Delete ${member.company}`}
                                onClick={() => handleMemberDelete(member.id)}
                              >
                                <Icon name="delete" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {pagedMembers.length === 0 && (
                        <tr>
                          <td colSpan={6} className="admin-empty">
                            No members found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="admin-pagination">
                  <p className="admin-muted">
                    Showing {(safeMemberPage - 1) * 10 + (pagedMembers.length ? 1 : 0)} to{' '}
                    {(safeMemberPage - 1) * 10 + pagedMembers.length} of {filteredMembers.length} members
                  </p>
                  <div className="admin-pagination-controls">
                    <button
                      type="button"
                      className="admin-page-btn"
                      onClick={() => setMemberPage((page) => Math.max(1, page - 1))}
                      disabled={safeMemberPage <= 1}
                    >
                      Previous
                    </button>
                    <span className="admin-page-indicator">{safeMemberPage}</span>
                    <button
                      type="button"
                      className="admin-page-btn"
                      onClick={() => setMemberPage((page) => Math.min(totalMemberPages, page + 1))}
                      disabled={safeMemberPage >= totalMemberPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeSection === 'traffic' && (
            <div className="admin-content">
              <div className="admin-card">
                <div className="admin-traffic-hero">
                  <div className="admin-traffic-hero-left">
                    <h2>Site Traffic</h2>
                    <p>This UI is ready; connect real analytics when you’re ready.</p>
                  </div>
                  <div className="admin-traffic-hero-right" aria-hidden="true">
                    <div className="admin-traffic-illu">
                      <div className="admin-traffic-illu-top" />
                      <div className="admin-traffic-illu-chart" />
                      <div className="admin-traffic-illu-card" />
                    </div>
                  </div>
                </div>

                <div className="admin-traffic-metrics">
                  <div className="admin-metric-card is-purple">
                    <div className="admin-metric-top">
                      <span className="admin-metric-icon" aria-hidden="true">
                        <Icon name="users" />
                      </span>
                      <p className="admin-metric-label">Total users</p>
                    </div>
                    <p className="admin-metric-value">{metrics.totalUsers}</p>
                    <p className="admin-metric-sub is-positive">{trafficTrends.usersTrend}</p>
                  </div>

                  <div className="admin-metric-card is-blue">
                    <div className="admin-metric-top">
                      <span className="admin-metric-icon" aria-hidden="true">
                        <Icon name="traffic" />
                      </span>
                      <p className="admin-metric-label">New this week</p>
                    </div>
                    <p className="admin-metric-value">{metrics.newThisWeek}</p>
                    <p className="admin-metric-sub is-positive">{trafficTrends.usersTrend}</p>
                  </div>

                  <div className="admin-metric-card is-green">
                    <div className="admin-metric-top">
                      <span className="admin-metric-icon" aria-hidden="true">
                        <Icon name="post" />
                      </span>
                      <p className="admin-metric-label">Posts</p>
                    </div>
                    <p className="admin-metric-value">{metrics.postCount}</p>
                    <p className="admin-metric-sub">{trafficTrends.postsTrend}</p>
                  </div>
                </div>

                <div className="admin-traffic-connect">
                  <div>
                    <p className="admin-traffic-connect-title">Analytics not connected</p>
                    <p className="admin-muted">Connect a real analytics service to see detailed insights and growth.</p>
                  </div>
                  <button type="button" className="btn btn-secondary admin-btn" onClick={() => setStatus('Connect Analytics: coming soon.')}>
                    Connect Analytics
                  </button>
                </div>
              </div>
            </div>
          )}

          {status && <p className="admin-toast">{status}</p>}
        </main>
      </div>

      {createUserOpen && (
        <Modal
          title="Add User"
          onClose={() => {
            setCreateUserOpen(false)
            setCreateUserForm(initialCreateUser)
          }}
        >
          <form className="admin-modern-form" onSubmit={handleCreateUser}>
            <label>
              <span>Name</span>
              <input id="name" value={createUserForm.name} onChange={handleCreateUserChange} required />
            </label>
            <label>
              <span>Email</span>
              <input id="email" type="email" value={createUserForm.email} onChange={handleCreateUserChange} required />
            </label>
            <label>
              <span>Password</span>
              <input
                id="password"
                type="password"
                value={createUserForm.password}
                onChange={handleCreateUserChange}
                required
                autoComplete="new-password"
              />
            </label>
            <label>
              <span>Role</span>
              <select id="role" value={createUserForm.role} onChange={handleCreateUserChange}>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
            <div className="admin-form-actions">
              <button className="btn btn-primary admin-btn" type="submit">
                Create User
              </button>
              <button type="button" className="btn btn-secondary admin-btn" onClick={() => setCreateUserOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {editingUserId && (
        <Modal
          title="Edit User"
          onClose={() => {
            setEditingUserId(null)
            setUserForm(initialUser)
          }}
        >
          <form className="admin-modern-form" onSubmit={handleUserSave}>
            <label>
              <span>Name</span>
              <input id="name" value={userForm.name} onChange={handleUserChange} required />
            </label>
            <label>
              <span>Email</span>
              <input id="email" type="email" value={userForm.email} onChange={handleUserChange} required />
            </label>
            <label>
              <span>Password</span>
              <input
                id="password"
                type="password"
                value={userForm.password}
                onChange={handleUserChange}
                placeholder="Leave blank to keep current password"
                autoComplete="new-password"
              />
            </label>
            <label>
              <span>Role</span>
              <select id="role" value={userForm.role} onChange={handleUserChange}>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
            <div className="admin-form-actions">
              <button className="btn btn-primary admin-btn" type="submit">
                Update User
              </button>
              <button
                type="button"
                className="btn btn-secondary admin-btn"
                onClick={() => {
                  setEditingUserId(null)
                  setUserForm(initialUser)
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {createMemberOpen && (
        <Modal title={editingMemberId ? 'Edit Member' : 'Add Member'} onClose={closeMemberEditor}>
          <form className="admin-modern-form" onSubmit={handleMemberSubmit}>
            <label>
              <span>Company Name</span>
              <input id="company" value={memberForm.company} onChange={handleMemberChange} required />
            </label>
            <div className="admin-form-2col">
              <label>
                <span>Website</span>
                <input id="website" value={memberForm.website} onChange={handleMemberChange} placeholder="https://example.com" required />
              </label>
              <label>
                <span>Status</span>
                <select id="status" value={memberForm.status} onChange={handleMemberChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>
            <label>
              <span>Logo URL</span>
              <input id="logo" value={memberForm.logo} onChange={handleMemberChange} placeholder="Paste a logo URL or use image upload below" />
            </label>
            <label>
              <span>Upload Logo Image</span>
              <input type="file" accept="image/*" onChange={handleMemberLogoFileChange} />
              <p className="admin-note">Choose an image from your computer and we&apos;ll upload it to the server.</p>
            </label>
            <label>
              <span>Added On</span>
              <input id="addedOn" type="date" value={memberForm.addedOn} onChange={handleMemberChange} required />
            </label>
            <div className="admin-form-actions">
              <button className="btn btn-primary admin-btn" type="submit">
                {editingMemberId ? 'Update Member' : 'Create Member'}
              </button>
              <button type="button" className="btn btn-secondary admin-btn" onClick={closeMemberEditor}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {memberPreview && (
        <Modal title="Member Details" onClose={() => setMemberPreview(null)}>
          <div className="admin-member-preview">
            <div className="admin-member-preview-top">
              <MemberLogo src={resolveMemberLogoSrc(memberPreview, imageUrls)} name={memberPreview.company} large />
              <div>
                <h3>{memberPreview.company}</h3>
                <p className="admin-muted">Partner member</p>
              </div>
            </div>
            <div className="admin-member-preview-grid">
              <div className="admin-profile-row">
                <span className="admin-profile-key">Website</span>
                <a className="admin-member-link" href={memberPreview.website} target="_blank" rel="noopener noreferrer">
                  <span>{formatMemberWebsite(memberPreview.website)}</span>
                  <Icon name="external" />
                </a>
              </div>
              <div className="admin-profile-row">
                <span className="admin-profile-key">Status</span>
                <span
                  className={`admin-pill admin-pill-status ${
                    String(memberPreview.status).toLowerCase() === 'active' ? 'admin-pill-active' : 'admin-pill-inactive'
                  }`}
                >
                  {memberPreview.status}
                </span>
              </div>
              <div className="admin-profile-row">
                <span className="admin-profile-key">Added On</span>
                <span className="admin-profile-value">{formatMemberDate(memberPreview.addedOn)}</span>
              </div>
            </div>
            <div className="admin-form-actions">
              <button type="button" className="btn btn-secondary admin-btn" onClick={() => setMemberPreview(null)}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary admin-btn"
                onClick={() => {
                  setMemberPreview(null)
                  handleMemberEdit(memberPreview)
                }}
              >
                Edit Member
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
}




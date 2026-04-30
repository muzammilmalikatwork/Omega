import React, { useState } from 'react';

const initialMembers = [
  {
    id: 1,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Unilever_Logo.svg',
    company: 'Unilever',
    website: 'https://www.unilever.com',
    status: 'Active',
    addedOn: 'May 28, 2025',
  },
  {
    id: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Haleeb_Foods_logo.png',
    company: 'Haleeb Foods',
    website: 'https://www.haleebfoods.com',
    status: 'Active',
    addedOn: 'May 28, 2025',
  },
  // ...add more sample members as needed
];

export default function AdminAddMember() {
  const [members] = useState(initialMembers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.company.toLowerCase().includes(search.toLowerCase()) ||
      member.website.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="admin-page">
      <div className="site-container admin-header">
        <h1>Members</h1>
        <p>Manage our partner members and their logos.</p>
        <button className="btn btn-primary" style={{ float: 'right' }}>Add New Member</button>
      </div>
      <div className="admin-panel" style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 240, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Company Name</th>
              <th>Website</th>
              <th>Status</th>
              <th>Added On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <img src={member.logo} alt={member.company} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                </td>
                <td>{member.company}</td>
                <td>
                  <a href={member.website} target="_blank" rel="noopener noreferrer">
                    {member.website}
                  </a>
                </td>
                <td>
                  <span style={{ color: member.status === 'Active' ? '#22c55e' : '#f87171', fontWeight: 600 }}>
                    {member.status}
                  </span>
                </td>
                <td>{member.addedOn}</td>
                <td>
                  <button title="Edit" style={{ marginRight: 8 }}>✏️</button>
                  <button title="View" style={{ marginRight: 8 }}>👁️</button>
                  <button title="Delete" style={{ color: '#f87171' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button className="btn btn-secondary">Previous</button>
          <button className="btn btn-secondary">Next</button>
        </div>
      </div>
    </section>
  );
}


'use client';
import { useState } from 'react';
import { addTeacher, deleteTeacher, updateTeacher } from '@/lib/actions';
import FileUpload from '@/components/FileUpload';

export default function TeachersClient({ initialData }) {
  const [teachers, setTeachers] = useState(initialData || []);
  const [formData, setFormData] = useState({ name: '', designation: '', subject: '', photo_url: '' });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', designation: '', subject: '', photo_url: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTeacher(formData);
      window.location.reload();
    } catch (error) {
      alert('Error adding teacher');
      setLoading(false);
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher.id);
    setEditFormData({
      name: teacher.name,
      designation: teacher.designation,
      subject: teacher.subject,
      photo_url: teacher.photo_url || ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTeacher(editingId, editFormData);
      setEditingId(null);
      window.location.reload();
    } catch (error) {
      alert('Error updating teacher');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete?')) return;
    try {
      await deleteTeacher(id);
      setTeachers(teachers.filter(t => t.id !== id));
    } catch (error) {
      alert('Error deleting teacher');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem', color: '#2d3436' }}>Manage Teachers</h1>

      {/* Edit Form */}
      {editingId && (
        <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '2px solid #56ab2f', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#2b8a3e' }}>Update Teacher Information</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <FileUpload 
              bucket="photos" 
              accept="image/*" 
              label="Upload new photo (Optional)" 
              onUploadSuccess={(url) => setEditFormData({...editFormData, photo_url: url})} 
            />
          </div>

          <form onSubmit={handleUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="Name" required value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
            <input type="text" placeholder="Designation" required value={editFormData.designation} onChange={e => setEditFormData({...editFormData, designation: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
            <input type="text" placeholder="Subject" required value={editFormData.subject} onChange={e => setEditFormData({...editFormData, subject: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={loading} style={{ flex: 1, padding: '0.75rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => setEditingId(null)} style={{ padding: '0.75rem 1.5rem', background: '#dee2e6', color: '#495057', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Form */}
      {!editingId && (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Add New Teacher</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <FileUpload 
              bucket="photos" 
              accept="image/*" 
              label="Upload teacher photo (Optional)" 
              onUploadSuccess={(url) => setFormData({...formData, photo_url: url})} 
            />
            {formData.photo_url && (
              <div style={{ marginTop: '0.5rem', color: '#56ab2f', fontSize: '0.9rem' }}>✓ Photo uploaded successfully</div>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
            <input type="text" placeholder="Designation (e.g. Assistant Teacher)" required value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
            <input type="text" placeholder="Subject" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
            
            <button type="submit" disabled={loading} style={{ padding: '0.75rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {loading ? 'Adding...' : 'Add Teacher'}
            </button>
          </form>
        </div>
      )}

      {/* List */}
      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e9ecef', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
              <th style={{ padding: '1rem' }}>Photo</th>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Designation & Subject</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id} style={{ borderBottom: '1px solid #e9ecef', background: editingId === teacher.id ? '#f1f3f5' : 'transparent' }}>
                <td style={{ padding: '1rem' }}>
                  {teacher.photo_url ? (
                    <img src={teacher.photo_url} alt={teacher.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👨‍🏫</div>
                  )}
                </td>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{teacher.name}</td>
                <td style={{ padding: '1rem', color: '#666' }}>{teacher.designation}<br/><small>{teacher.subject}</small></td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => handleEdit(teacher)} 
                      style={{ padding: '0.4rem 0.8rem', background: 'rgba(86, 171, 47, 0.1)', color: '#56ab2f', border: '1px solid #56ab2f', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(teacher.id)} 
                      style={{ padding: '0.4rem 0.8rem', background: '#ffe3e3', color: '#fa5252', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#868e96' }}>No teachers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

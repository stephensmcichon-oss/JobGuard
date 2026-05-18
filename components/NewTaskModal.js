'use client';
import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import styles from './NewTaskModal.module.css';

export default function NewTaskModal() {
  const { isNewTaskModalOpen, closeNewTaskModal, addTask } = useTaskContext();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'TO DO',
    assignee: 'Alex R.',
    dueDate: '',
    priority: 'NORMAL',
  });

  if (!isNewTaskModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Auto-generate initials from assignee name
    const initials = formData.assignee.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    addTask({
      ...formData,
      assigneeInitials: initials,
      assignees: [{ initials }]
    });
    
    setFormData({
      name: '',
      description: '',
      status: 'TO DO',
      assignee: 'Alex R.',
      dueDate: '',
      priority: 'NORMAL',
    });
    closeNewTaskModal();
  };

  return (
    <div className={styles.overlay} onClick={closeNewTaskModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Create New Task</h2>
          <button className={styles.closeBtn} onClick={closeNewTaskModal}>×</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Task Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="e.g. Design landing page"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Add more details..."
              rows={3}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="BACKLOG">Backlog</option>
                <option value="TO DO">To Do</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="REVIEW">Review</option>
                <option value="DONE">Done</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="NORMAL">Normal</option>
                <option value="LOW">Low</option>
                <option value="BUG">Bug</option>
                <option value="FEATURE">Feature</option>
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Assignee</label>
              <select name="assignee" value={formData.assignee} onChange={handleChange}>
                <option value="Alex R.">Alex R.</option>
                <option value="Sarah J.">Sarah J.</option>
                <option value="Marcus T.">Marcus T.</option>
                <option value="Kevin L.">Kevin L.</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Due Date</label>
              <input 
                type="text" 
                name="dueDate" 
                value={formData.dueDate} 
                onChange={handleChange}
                placeholder="e.g. Next Friday"
              />
            </div>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={closeNewTaskModal}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

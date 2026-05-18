/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

const initialTasks = [
  {
    id: 'TASK-102',
    name: 'Implement User Authentication',
    description: 'High priority security module',
    status: 'TO DO',
    assignee: 'Alex R.',
    assigneeInitials: 'AR',
    assignees: [{ initials: 'AR' }],
    dueDate: 'Oct 12, 2023',
    priority: 'URGENT',
    timeLogged: 0
  },
  {
    id: 'DOC-44',
    name: 'Design System Documentation',
    description: 'Updating component library',
    status: 'TO DO',
    assignee: 'Sarah J.',
    assigneeInitials: 'SJ',
    assignees: [{ initials: 'SJ' }],
    dueDate: 'Oct 14, 2023',
    priority: 'NORMAL',
    timeLogged: 0
  },
  {
    id: 'CORE-01',
    name: 'Refactor Data Grid Engine',
    description: 'Optimizing rendering speed',
    status: 'IN PROGRESS',
    assignee: 'Marcus T.',
    assigneeInitials: 'MT',
    assignees: [{ initials: 'MT' }],
    dueDate: 'Today',
    priority: 'HIGH',
    timeLogged: 9912
  },
  {
    id: 'BACK-88',
    name: 'API Endpoint Optimization',
    description: 'Latency reduction complete',
    status: 'REVIEW',
    assignee: 'Kevin L.',
    assigneeInitials: 'KL',
    assignees: [{ initials: 'KL' }],
    dueDate: 'Yesterday',
    priority: 'LOW',
    timeLogged: 29520
  },
  {
    id: 'BUG-12',
    name: 'Memory leak in WebGL renderer on mobile devices',
    description: 'Crashing on iPhone',
    status: 'BACKLOG',
    assignee: 'Alex R.',
    assigneeInitials: 'AR',
    assignees: [{ initials: 'AR' }],
    dueDate: 'Next Week',
    priority: 'BUG',
    timeLogged: 0
  },
  {
    id: 'FEAT-99',
    name: 'Implement dark mode toggle for workspace settings',
    description: 'User preference',
    status: 'BACKLOG',
    assignee: 'Sarah J.',
    assigneeInitials: 'SJ',
    assignees: [{ initials: 'SJ' }, { initials: 'MT' }],
    dueDate: 'Nov 1, 2023',
    priority: 'FEATURE',
    timeLogged: 5400
  },
  {
    id: 'FEAT-100',
    name: 'Integration with Third-party API for Billing',
    description: 'Stripe integration',
    status: 'TO DO',
    assignee: 'Kevin L.',
    assigneeInitials: 'KL',
    assignees: [{ initials: 'KL' }],
    dueDate: 'Nov 5, 2023',
    priority: 'FEATURE',
    timeLogged: 0
  },
  {
    id: 'SEC-01',
    name: 'End-to-end encryption for team messaging module',
    description: 'Security compliance',
    status: 'IN PROGRESS',
    assignee: 'Alex R.',
    assigneeInitials: 'AR',
    assignees: [{ initials: 'AR' }],
    dueDate: 'Oct 20, 2023',
    priority: 'SECURITY',
    timeLogged: 44640
  },
  {
    id: 'REF-02',
    name: 'Update Redux store to Toolkit structure',
    description: 'Technical debt',
    status: 'IN PROGRESS',
    assignee: 'Marcus T.',
    assigneeInitials: 'MT',
    assignees: [{ initials: 'MT' }],
    dueDate: 'Oct 25, 2023',
    priority: 'REFACTOR',
    timeLogged: 15120
  }
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('taskflow-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        setTasks(initialTasks);
      }
    } else {
      setTasks(initialTasks);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  useEffect(() => {
    let interval = null;
    if (isTracking && activeTrackingId) {
      interval = setInterval(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === activeTrackingId
              ? { ...task, timeLogged: task.timeLogged + 1 }
              : task
          )
        );
      }, 1000);
    } else if (!isTracking && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking, activeTrackingId]);

  const addTask = (newTask) => {
    setTasks([{...newTask, timeLogged: 0, id: `TASK-${Math.floor(Math.random() * 1000)}`}, ...tasks]);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (activeTrackingId === id) {
      setIsTracking(false);
      setActiveTrackingId(null);
    }
  };

  const startTracking = (id) => {
    setActiveTrackingId(id);
    setIsTracking(true);
  };

  const pauseTracking = () => {
    setIsTracking(false);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setActiveTrackingId(null);
  };

  const openNewTaskModal = () => setIsNewTaskModalOpen(true);
  const closeNewTaskModal = () => setIsNewTaskModalOpen(false);

  return (
    <TaskContext.Provider value={{
      tasks,
      activeTrackingId,
      isTracking,
      isNewTaskModalOpen,
      addTask,
      updateTaskStatus,
      deleteTask,
      startTracking,
      pauseTracking,
      stopTracking,
      openNewTaskModal,
      closeNewTaskModal,
      isLoaded
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}

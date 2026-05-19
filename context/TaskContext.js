/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterAssignee, setFilterAssignee] = useState('ALL');
  const [sortBy, setSortBy] = useState('DEFAULT');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('ALL');
  const [initialColumnStatus, setInitialColumnStatus] = useState('TO DO');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [theme, setThemeState] = useState('dark');

  // Fetch initial data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tasks
        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (tasksError) throw tasksError;
        if (tasksData) {
          // Map snake_case from DB to camelCase for UI
          const formattedTasks = tasksData.map(t => ({
            id: t.id,
            name: t.name,
            description: t.description,
            status: t.status,
            assignee: t.assignee,
            assigneeInitials: t.assignee_initials,
            dueDate: t.due_date,
            priority: t.priority,
            timeLogged: t.time_logged
          }));
          setTasks(formattedTasks);
        }

        // Fetch employees
        const { data: employeesData, error: empError } = await supabase
          .from('employees')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (empError) throw empError;
        if (employeesData) {
          const formattedEmp = employeesData.map(e => ({
            id: e.id,
            fullName: e.full_name,
            email: e.email,
            initials: e.initials,
            status: e.status,
            password: e.password
          }));
          setEmployees(formattedEmp);
        }
      } catch (err) {
        console.error('Error fetching from Supabase:', err);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();

    // Load Local User Session & Theme
    const savedUser = localStorage.getItem('taskflow-user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        setCurrentUser(null);
      }
    }

    const savedTheme = localStorage.getItem('daisyui-theme') || localStorage.getItem('supabase-theme') || 'dark';
    setThemeState(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Timer Effect
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

  // Sync Timer to Supabase when stopped/paused
  const syncTimeLoggedToDB = async (taskId, currentTasks) => {
    const taskToSync = currentTasks.find(t => t.id === taskId);
    if (taskToSync) {
      await supabase.from('tasks').update({ time_logged: taskToSync.timeLogged }).eq('id', taskId);
    }
  };

  const addEmployee = async ({ fullName, email, password }) => {
    const nameParts = fullName.trim().split(' ');
    let initials = 'EM';
    if (nameParts.length > 1) {
      initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else if (nameParts[0]) {
      initials = nameParts[0].slice(0, 2).toUpperCase();
    }

    const newEmp = {
      full_name: fullName.trim(),
      email: email.trim(),
      initials,
      status: 'Active',
      password: password
    };

    // Optimistic UI (We wait for DB response to get the UUID)
    const { data, error } = await supabase.from('employees').insert([newEmp]).select();
    
    if (error) {
      alert(`Database Error: ${error.message}`);
      return null;
    }

    if (data && data.length > 0) {
      const inserted = data[0];
      const uiEmp = {
        id: inserted.id,
        fullName: inserted.full_name,
        email: inserted.email,
        initials: inserted.initials,
        status: inserted.status,
        password: inserted.password
      };
      setEmployees(prev => [...prev, uiEmp]);
      return uiEmp;
    }
    return null;
  };

  const updateEmployee = async (id, newEmail, newPassword) => {
    // Optimistic UI update
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, email: newEmail, password: newPassword } : emp));
    
    // DB update
    await supabase.from('employees').update({ email: newEmail, password: newPassword }).eq('id', id);
  };

  const login = (username, password) => {
    const cleanUser = username.trim().toLowerCase();
    if (cleanUser === 'admin' && password === 'admin') {
      const userObj = { username: 'admin', role: 'admin', name: 'Administrator' };
      setCurrentUser(userObj);
      localStorage.setItem('taskflow-user', JSON.stringify(userObj));
      return true;
    } else if (cleanUser === 'employee' && password === 'employee') {
      const userObj = { username: 'employee', role: 'employee', name: 'Employee Portal' };
      setCurrentUser(userObj);
      localStorage.setItem('taskflow-user', JSON.stringify(userObj));
      return true;
    } else {
      // Dynamic auth against Supabase employees
      const matchedEmp = employees.find(emp => emp.email.toLowerCase() === cleanUser);
      if (matchedEmp && (matchedEmp.password === password || password === 'employee')) {
        const userObj = { username: cleanUser, role: 'employee', name: matchedEmp.fullName, initials: matchedEmp.initials };
        setCurrentUser(userObj);
        localStorage.setItem('taskflow-user', JSON.stringify(userObj));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('taskflow-user');
    if (isTracking) {
      syncTimeLoggedToDB(activeTrackingId, tasks);
      setIsTracking(false);
      setActiveTrackingId(null);
    }
  };

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('daisyui-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const addTask = async (newTask) => {
    const taskId = `TASK-${Math.floor(Math.random() * 1000)}`;
    const uiTask = { ...newTask, timeLogged: 0, id: taskId };
    
    // Optimistic update
    setTasks([uiTask, ...tasks]);

    // DB Insert
    await supabase.from('tasks').insert([{
      id: taskId,
      name: newTask.name,
      description: newTask.description,
      status: newTask.status,
      assignee: newTask.assignee,
      assignee_initials: newTask.assigneeInitials,
      due_date: newTask.dueDate,
      priority: newTask.priority,
      time_logged: 0
    }]);
  };

  const updateTaskStatus = async (id, newStatus) => {
    const isAdmin = currentUser?.role === 'admin';
    const currentTask = tasks.find(t => t.id === id);
    if (!currentTask) return;

    if (!isAdmin) {
      // Employee: only "IN PROGRESS" -> "DONE" (or back)
      if (currentTask.status !== 'IN PROGRESS' && currentTask.status !== 'DONE' && newStatus !== 'IN PROGRESS' && newStatus !== 'DONE') {
        alert('Permission Denied: Employees can only change status between "IN PROGRESS" and "DONE".');
        return;
      }
      if (newStatus !== 'IN PROGRESS' && newStatus !== 'DONE') {
        alert('Permission Denied: Employees can only change status between "IN PROGRESS" and "DONE".');
        return;
      }
    }

    // Optimistic update
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
    
    // DB Update
    await supabase.from('tasks').update({ status: newStatus }).eq('id', id);
  };
  
  const deleteTask = async (id) => {
    // Optimistic update
    setTasks(tasks.filter(task => task.id !== id));
    if (activeTrackingId === id) {
      setIsTracking(false);
      setActiveTrackingId(null);
    }

    // DB Delete
    await supabase.from('tasks').delete().eq('id', id);
  };

  const startTracking = (id) => {
    setActiveTrackingId(id);
    setIsTracking(true);
  };

  const pauseTracking = () => {
    setIsTracking(false);
    syncTimeLoggedToDB(activeTrackingId, tasks);
  };

  const stopTracking = () => {
    setIsTracking(false);
    syncTimeLoggedToDB(activeTrackingId, tasks);
    setActiveTrackingId(null);
  };

  const openNewTaskModal = (status = 'TO DO') => {
    setInitialColumnStatus(status);
    setIsNewTaskModalOpen(true);
  };
  const closeNewTaskModal = () => setIsNewTaskModalOpen(false);
  const toggleNotifications = () => setIsNotificationsOpen(prev => !prev);

  return (
    <TaskContext.Provider value={{
      tasks,
      employees,
      currentUser,
      login,
      logout,
      addEmployee,
      updateEmployee,
      activeTrackingId,
      isTracking,
      isNewTaskModalOpen,
      searchQuery,
      setSearchQuery,
      filterPriority,
      setFilterPriority,
      filterAssignee,
      setFilterAssignee,
      sortBy,
      setSortBy,
      isNotificationsOpen,
      toggleNotifications,
      selectedProject,
      setSelectedProject,
      initialColumnStatus,
      isSearchModalOpen,
      setIsSearchModalOpen,
      theme,
      setTheme,
      toggleTheme,
      addTask,
      updateTaskStatus,
      deleteTask,
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

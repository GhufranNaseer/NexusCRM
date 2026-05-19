import React, { useState } from 'react';
import { useCRMStore } from '../store/useCRMStore';
import {
  CheckSquare,
  Plus,
  Trash2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  UserCheck,
  Tag
} from 'lucide-react';

export default function Tasks() {
  const tasks = useCRMStore((state) => state.tasks);
  const team = useCRMStore((state) => state.team);
  const addTask = useCRMStore((state) => state.addTask);
  const toggleTask = useCRMStore((state) => state.toggleTask);
  const deleteTask = useCRMStore((state) => state.deleteTask);

  const [showAddForm, setShowAddForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskAssignee, setTaskAssignee] = useState(team[0]?.name || 'Amna Malik');

  const pendingTasks = tasks.filter((t) => t.status === 'Pending');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDueDate) return;

    const chosenAssigneeObj = team.find((t) => t.name === taskAssignee) || {
      name: taskAssignee,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${taskAssignee}&backgroundColor=3b82f6`
    };

    addTask({
      title: taskTitle,
      description: taskDesc,
      priority: taskPriority,
      dueDate: taskDueDate,
      assigneeName: chosenAssigneeObj.name,
      assigneeAvatar: chosenAssigneeObj.avatar
    });

    setTaskTitle('');

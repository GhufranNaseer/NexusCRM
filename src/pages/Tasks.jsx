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
    setTaskDesc('');
    setTaskDueDate('');
    setShowAddForm(false);
  };

  const getPriorityStyle = (p) => {
    switch (p) {
      case 'High': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Task Management</h2>
          <p className="text-slate-400 text-xs mt-0.5">Assign, schedule, and track representative duties. Toggling high-priority tasks generates timeline notes.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 text-white transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Grid: Pending vs Completed Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Pending Tasks Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-indigo-400" />
              <span>Pending Duties</span>
            </h3>
            <span className="text-[10px] font-bold bg-indigo-600/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/15">
              {pendingTasks.length} active
            </span>
          </div>

          <div className="space-y-3.5 max-h-[65vh] overflow-y-auto pr-1">
            {pendingTasks.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl text-slate-600 text-xs">
                Hurrah! All tasks completed.
              </div>
            ) : (
              pendingTasks.map((task) => (
                <div key={task.id} className="glass-card p-4 flex gap-4 items-start relative hover:border-slate-700 transition-all animate-page-fade">
                  {/* Custom Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 w-4.5 h-4.5 rounded border border-slate-700 flex items-center justify-center hover:border-indigo-500 text-transparent hover:text-indigo-400 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <div className="flex-1 min-w-0 space-y-2 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-200 leading-snug">{task.title}</h4>
                      {task.description && <p className="text-slate-400 mt-1 leading-relaxed">{task.description}</p>}
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[9px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Due: {task.dueDate}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-bold border uppercase tracking-wider ${getPriorityStyle(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>

                    {/* Assignee info */}
                    <div className="pt-2 border-t border-slate-850 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={task.assigneeAvatar}
                          alt={task.assigneeName}
                          className="w-5 h-5 rounded-full border border-slate-850 bg-slate-900"
                        />
                        <span className="text-[10px] text-slate-400 font-semibold">{task.assigneeName}</span>
                      </div>
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Completed Tasks Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Completed Archives</span>
            </h3>
            <span className="text-[10px] font-bold bg-emerald-600/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/15">
              {completedTasks.length} history
            </span>
          </div>

          <div className="space-y-3.5 max-h-[65vh] overflow-y-auto pr-1">
            {completedTasks.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl text-slate-600 text-xs">
                No archived tasks found in this session.
              </div>
            ) : (
              completedTasks.map((task) => (
                <div key={task.id} className="glass-card p-4 flex gap-4 items-start relative opacity-60 hover:opacity-100 transition-all animate-page-fade">
                  {/* Checked Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 w-4.5 h-4.5 rounded border border-emerald-500/30 flex items-center justify-center text-emerald-400 bg-emerald-500/10"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex-1 min-w-0 space-y-2 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-400 line-through leading-snug">{task.title}</h4>
                      {task.description && <p className="text-slate-500 mt-1 line-through">{task.description}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[9px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Completed audit</span>
                      </div>
                    </div>

                    {/* Assignee info */}
                    <div className="pt-2 border-t border-slate-850 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={task.assigneeAvatar}
                          alt={task.assigneeName}
                          className="w-5 h-5 rounded-full border border-slate-850 bg-slate-900"
                        />
                        <span className="text-[10px] text-slate-500">{task.assigneeName}</span>
                      </div>
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-rose-450 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Add Task Modal overlay */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 relative glow-indigo animate-page-fade">
            <h3 className="text-lg font-bold text-white mb-2">Schedule Custom Task</h3>
            <p className="text-xs text-slate-400 mb-5">Assign actionable goals to staff representatives.</p>
            
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule licensing sync"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Discuss Q3 tier scaling plans..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Due Date</label>
                  <input
                    type="date"
                    required
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Assignee</label>
                <select
                  value={taskAssignee}
                  onChange={(e) => setTaskAssignee(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {team.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-3 justify-end text-xs">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-lg border border-slate-850 bg-transparent hover:bg-slate-900 text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                >
                  Schedule Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

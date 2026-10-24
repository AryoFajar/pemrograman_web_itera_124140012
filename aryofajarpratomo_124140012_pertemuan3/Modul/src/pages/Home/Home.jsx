import React from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import Card from '../../components/Card/Card';
import { useTasks } from '../../context/TaskContext';
import useWindowSize from '../../hooks/useWindowSize';
import './Home.css';

function Home() {
  // Panggil context langsung tanpa menerima props dari App!
  const { tasks, addTask, deleteTask, toggleComplete, clearTasks, stats } = useTasks();
  // Latihan Mandiri (Custom Hook): badge mode layar
  const { width } = useWindowSize();

  // Latihan Mandiri (State & Hooks): konfirmasi sebelum menghapus semua tugas
  const handleClearAll = () => {
    if (window.confirm('Yakin ingin menghapus semua tugas?')) {
      clearTasks();
    }
  };

  return (
    <div className="home">
      <Header title="React Task Manager" description="State Global dengan Context API" />
      <main className="container">
        <span className={`screen-badge ${width < 768 ? 'mobile' : 'desktop'}`}>
          {width < 768 ? 'Mode Layar Mobile' : 'Mode Layar Desktop'}
        </span>

        <div className="stats-row">
          <div className="stats">
            <p>Total: {stats.total}</p>
            <p>Selesai: {stats.completed}</p>
            <p>Sisa: {stats.remaining}</p>
            <p>Progress: {stats.completionRate.toFixed(0)}%</p>
          </div>
          <button className="clear-btn" onClick={handleClearAll} disabled={tasks.length === 0}>
            Hapus Semua Tugas
          </button>
        </div>

        {/* Latihan Mandiri (Components & Props): TaskForm dibungkus Card */}
        <Card title="Tambah Tugas">
          <TaskForm onAddTask={addTask} />
        </Card>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">Belum ada tugas. Tambahkan tugas pertama Anda!</p>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;

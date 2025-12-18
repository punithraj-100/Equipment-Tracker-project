import React from 'react';
import Navbar from './components/Navbar';
import EquipmentList from './components/EquipmentList';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <EquipmentList />
      </main>
      <footer className="border-t border-slate-900 py-6 px-6 text-center">
        <p className="text-slate-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} Equipment Tracker System. Built for Engineering Excellence.
        </p>
      </footer>
    </div>
  );
}

export default App;

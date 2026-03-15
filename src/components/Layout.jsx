import { Outlet } from 'react-router';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Section 1 - Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Section 10 - Footer */}
      <Footer />
    </div>
  );
}

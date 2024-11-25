import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';
import Login from './components/Login';
function App() {
  return (
    <Router>
      {/* Navbar is placed outside Routes to make it persistent across pages */}
      <Navbar />
      <div className="min-h-[81vh]">
        <Routes>
          {/* Define the routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manager" element={<Manager />} />
        </Routes>
      </div>
      {/* Footer is also persistent */}
      <Footer />
    </Router>
  );
}

export default App;

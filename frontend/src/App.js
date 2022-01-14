import { Outlet } from "react-router-dom";

import './App.css';
import NavbarComponent from './components/Navbar.component';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Outlet />
    </div>
  );
}

export default App;

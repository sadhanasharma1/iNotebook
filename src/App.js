import './App.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          <Route exact path="/about" element={<About />}>
          </Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;

import './App.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About' 
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
function App() {
  return (
    //NoteSatte me wrap krne ke baad NoteState me jitne bhi state
    //variable h vo sbb is andar wale compnents koa ccessible ho jaega.
    // So no any prop drill needed just a dtrect talk between the component and the context
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}>
          </Route>
          <Route exact path="/about" element={<About/>}>
          </Route>
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;

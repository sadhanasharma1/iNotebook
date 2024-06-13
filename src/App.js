import './App.css';
import { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import Alert from './Components/Alert'
import Login from './Components/Login'
import Signup from './Components/Signup'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }

  return (
    //NoteSatte me wrap krne ke baad NoteState me jitne bhi state
    //variable h vo sbb is andar wale compnents koa ccessible ho jaega.
    // So no any prop drill needed just a dtrect talk between the component and the context
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}>
              </Route>
              <Route exact path="/about" element={<About />}>
              </Route>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}>
              </Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

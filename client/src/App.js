import './App.css';
import Main from './views/Main';
import Details from "./components/Detail";
import Update from './components/Update';
import Form from './components/ItemForm';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <div className='nav-bar'>
        <li><Link to={"/"} className="tabs">Home</Link></li>
      </div>
      <h1>Note Wall</h1>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/note" element={<Form/>}></Route>
        <Route path="/note/:id" element={<Details />}></Route>
        <Route path="/note/:id/edit" element={<Update />}></Route>
      </Routes>
    </div>
  );
}

export default App;

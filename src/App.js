import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Main from './Main/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/main' element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

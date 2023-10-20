import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './Main/Main';
import LectureListPage from './Lecture/LectureListPage';
import LectureDetailPage from './Lecture/LectureDetailPage';
import LectureSearchList from './Lecture/LectureSearchList';
import SocialLogin from './Member/Login/SocialLogin';
import Join from './Member/Join/Join';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route index element={<LectureListPage/>}/>
          <Route path='lecture/detail/*' element={<LectureDetailPage/>}/>
          <Route path='search' element={<LectureSearchList/>}/>
        </Route>
        <Route path='socialLogin' element={<SocialLogin/>}/>
        <Route path='join' element={<Join/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

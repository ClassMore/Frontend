import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './Main/Main';
import LectureListPage from './Lecture/LectureListPage';
import LectureDetailPage from './Lecture/LectureDetailPage';
import SocialLogin from './Member/Login/SocialLogin';
import Join from './Member/Join/Join';
import Mypage from './Member/Mypage/Mypage';
import LectureSearchPage from './Lecture/LectureSearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route index element={<LectureListPage/>}/>
          <Route path='lecture/detail/*' element={<LectureDetailPage/>}/>
          <Route path='search' element={<LectureSearchPage/>}/>
          <Route path='mypage' element={<Mypage/>}/>
        </Route>
        <Route path='socialLogin' element={<SocialLogin/>}/>
        <Route path='join' element={<Join/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

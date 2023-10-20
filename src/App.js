import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './Main/Main';
import SocialLogin from './Member/SocialLogin';
import LectureListPage from './Lecture/LectureListPage';
import LectureDetailPage from './Lecture/LectureDetailPage';
import LectureSearchList from './Lecture/LectureSearchList';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

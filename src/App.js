import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Fragment, useState} from "react";
import Main from './Main/Main';
import LectureListPage from './Lecture/LectureListPage';
import LectureDetailPage from './Lecture/LectureDetailPage';
import LectureSearchList from './Lecture/LectureSearchList';
import SocialLogin from './Member/Login/SocialLogin';
import Join from './Member/Join/Join';
import Mypage from "./Member/Mypage/Mypage";
import Header from "./CartBtn/components/Layout/Header";
import Cart from "./CartBtn/components/Cart/Cart";
import CartProvider from "./CartBtn/store/CartProvider";


function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const     hideCartHandler = () => {
        setCartIsShown(false);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main/>}>
                    <Route index element={<LectureListPage/>}/>
                    <Route path='lecture/detail/*' element={<LectureDetailPage/>}/>
                    <Route path='search' element={<LectureSearchList/>}/>
                    <Route path='mypage' element={<Mypage/>}/>
                </Route>
                <Route path='socialLogin' element={<SocialLogin/>}/>
                <Route path='join' element={<Join/>}/>
            </Routes>

                <CartProvider>
                    {cartIsShown && <Cart onClose={hideCartHandler}/>}
                    <Header onShowCart={showCartHandler}/>
                </CartProvider>

        </BrowserRouter>


);
}

export default App;


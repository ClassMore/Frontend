import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Cart = ({lectureId}) => {
        const [classname, setclassname] = useState('')
        const url = process.env.REACT_APP_DEFAULT_URL;

        // useEffect(() => {
        //     axios.get(`${url}user/basketList`,
        //         {headers: {Authorization: `${localStorage.getItem('token')}`}}
        //     )
        //         .then(res => {
        //             const httpStatus = res.status;
        //             if(httpStatus === 200)
        //             {
        //                 setclassname('active')
        //             }
        //             else setclassname('');
        //         })
        // }, [lectureId])
        //
        // useEffect(() => {
        //
        // }, [classname])

        const clickHandler = () => {
            axios.post(`${url}user/cart/${lectureId}`,
                {},
                {headers: {Authorization: `${localStorage.getItem('token')}`}}
            )
                .then(res => {
                    const isCarted = res.data.isCarted;

                    console.log(res);
                    console.log(isCarted);
                    if(isCarted)setclassname('active')
                    else setclassname('');
                })
        }


        return (lectureId &&
            <button className={`cart-switch ${classname}`} onClick={() => clickHandler()}>
                <svg className='cart' width="30px" height="28px" viewBox="0 0 20 20" stroke='currentColor' xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                          strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        )
    }

    export default Cart

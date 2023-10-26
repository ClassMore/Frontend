import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Filter from './Filter'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AutoComplete.css'

const AutoComplete = () => {
  const [keyword, setkeyword] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)
  const [type, settype] = useState(localStorage.getItem('type') ? localStorage.getItem('type') : 'instructor');
  const [dropDownList, setdropDownList] = useState([])
  const [keywords, setkeywords] = useState([])
  const nav = useNavigate()

  const getKeywords = async () => {
    console.log(type + ": " + keyword)
    const query =
    {
      "suggest": {
        "search_suggest": {
          "prefix": `${keyword}`,
          "completion": {
            "field": `${type}`,
            "size": 10000,
          },
        }
      }
    }

    await axios.post(
      'https://search-classmoa-uofe4bd5kkz5loqmz7wk4dpiqa.ap-northeast-2.es.amazonaws.com/search/_search',
      query,
      {
        headers: {
          'Content-type': 'application/json'
        },
        auth: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD
        }
      }
    ).then(res => {
      // const source = res.data.suggest.search_suggest[0].options
      const source = res.data;
      setdropDownList(source);
      const result = new Set(source.suggest.search_suggest[0].options.map(data => data.text))
      setkeywords(k => [...result])
    });
  }

  const showDropDownList = () => {
    if (keyword === '') {
      setIsHaveInputValue(false)
      setdropDownList([])
    } else {
      setdropDownList(keywords);
    }
  }

  const changeInputValue = event => {
    setkeyword(event.target.value)
    setIsHaveInputValue(true)
  }

  const clickDropDownItem = clickedItem => {
    setkeyword(clickedItem)
    setIsHaveInputValue(false)
  }

  const handleDropDownKey = event => {
    //input에 값이 있을때만 작동
      if (
        event.keyCode === 40 &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }

      if (event.keyCode === 38 && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1)
      if (event.keyCode === 13) {
        localStorage.setItem('keyword', keyword);
        localStorage.setItem('type', type)
        console.log(type + ": " + keyword);
        if (!window.location.href.includes('search')) nav('/search');
        else window.location.reload();
        // if (localStorage.getItem('keyword')) setkeyword(localStorage.getItem('keyword'))
      }
    
  }

  useEffect(() => {
    showDropDownList()
  }, [keyword])

  useEffect(() => {
    getKeywords();
  }, [keyword])

  return (
    <>
      <div className="app-content-actions" style={{flexDirection: "row"}} isHaveInputValue={isHaveInputValue}>
        <Filter type={settype} />
        <InputBox>
        <input
          style={{ marginLeft: "0.1rem" }}
          className="search-bar"
          placeholder="Search..."
          type='text'
          value={keyword}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
        />
        <DeleteButton style={{ color: "white", marginLeft: "-1.5rem", zIndex: "1" }} onClick={() => setkeyword('')}>&times;</DeleteButton>
        </InputBox>
        {isHaveInputValue && (
          <DropDownBox className='autocomplete'>
            {dropDownList.length === 0 && (
              <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
            )}
            {keywords.map((dropDownItem, dropDownIndex) => {
              return (
                <DropDownItem
                  key={dropDownIndex}
                  onClick={() => clickDropDownItem(dropDownItem)}
                  onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                  className={
                    dropDownItemIndex === dropDownIndex ? 'selected' : ''
                  }
                >
                  {dropDownItem}
                </DropDownItem>
              )
            })}
          </DropDownBox>

        )}
        <div className="app-content-actions-wrapper">
        </div>
      </div>
    </>
  )
}

const activeBorderRadius = '16px 16px 0 0'
const inactiveBorderRadius = '16px 16px 16px 16px'

const WholeBox = styled.div`
  padding: 10px;
`

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border-radius: ${props =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`

const DeleteButton = styled.div`
  cursor: pointer;
  caret-color: transparent;
`

const DropDownBox = styled.ul`
  display: block;
  block-size: 5rem;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0 0 10px 10px;
  max-height: 10rem;
  overflow-y: scroll;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 100;
  margin-top: 8.5rem;
  margin-left: 6rem;
  
`

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: lightgray;
  }
`

export default AutoComplete
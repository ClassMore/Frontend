import React, { useEffect } from 'react'
import $ from 'jquery'

const Search = () => {

  useEffect(() => {
    $(".search-bar input")
    .focus(function () {
      $(".header").addClass("wide");
    })
    .blur(function () {
      $(".header").removeClass("wide");
    });
  })

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search"/>
    </div>
  )
}

export default Search
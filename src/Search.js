import React from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import *  as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf'

class Search extends React.Component {
    
  state = {
    query: "",
    activeBooks: [],
  }


  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))

    if(query === ""){
      this.setState(() => ({
        activeBooks: []
      }))
      return
    }
    this.updateSearch(query)
  }

  async updateSearch(q){
    let res = await BooksAPI.search(q)

    if (res.error || res===undefined){
      this.setState(() => ({
        activeBooks: []
      }))
    }
    else {
      this.setState(() => ({
        activeBooks: res
      }))
      }
    }

    
  

  render() {
    const { query } = this.state
    const { onUpdateShelf} = this.props
    return (
<div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
              <button className="close-search" >Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)} 
                        placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
            <BookShelf title="Search Results" books={this.state.activeBooks} onUpdateShelf={this.props.onUpdateShelf.bind(this)}/> 
              <ol className="books-grid"></ol>
            </div>
          </div>
    )
  }}
  export default Search
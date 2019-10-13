import React from 'react'
import { PropTypes } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'
import *  as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  
  state = {
    showSearchPage: false,
    books: [],
  }

  async getData(){
    let myBooks = await BooksAPI.getAll()

    this.setState(() => ({
      books: myBooks
    }))
  }

  componentDidMount(){
    this.getData();
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
         <Search />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <BookShelf title="Currently Reading" books={this.state.books.filter((book) => {return book.shelf === 'currentlyReading'})}/>
              <BookShelf title="Want to Read" books={this.state.books.filter((book) => {return book.shelf ==='wantToRead'})}/> 
              <BookShelf title= "Read" books={this.state.books.filter((book) => {return book.shelf ==='read'})}/> 
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

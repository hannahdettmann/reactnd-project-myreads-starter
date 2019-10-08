import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    curr_books :[1, 3, 5],
    want_books: [2, 6],
    read_books: [10, 12],
  }

  render() {
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
              <BookShelf title="Currently Reading" books={this.state.curr_books}/>
              <BookShelf title="Want to Read" books={this.state.want_books}/> 
              <BookShelf title= "Read" books={this.state.read_books} />
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

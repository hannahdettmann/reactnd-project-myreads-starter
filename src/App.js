import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import Search from './Search'
import *  as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  
  state = {
    books: [],
  }

  updateShelf(id, shelf){
    console.log(id)
    console.log(shelf)
    let myBook = this.state.books.filter((book) => {return book.id === id})
    
    myBook[0].shelf = shelf
    
    this.setState((currentState) => ({
      books: currentState.books.filter((b) => {
        return b.id !== id
      })
    }))
    
    console.log('removed book')
    console.log(this.state.books)
    console.log(myBook)
    
    this.setState((currentState) => ({
      books: currentState.books.concat([myBook[0]])
    }))
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
    //console.log(this.state.books)
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <BookShelf title="Currently Reading" 
                          books={this.state.books.filter((book) => {return book.shelf === 'currentlyReading'})}
                          onUpdateShelf={this.updateShelf.bind(this)} />
              <BookShelf  title= "Read" 
                          books={this.state.books.filter((book) => {return book.shelf ==='read'})}
                          onUpdateShelf={this.updateShelf.bind(this)} /> 
              <BookShelf  title="Want to Read" 
                          books={this.state.books.filter((book) => {return book.shelf ==='wantToRead'})}
                          onUpdateShelf={this.updateShelf.bind(this)} /> 
              </div>
            </div>
            <div className="open-search">
              <Link to="/Search">
              <button>Add a book</button>
              </Link>
            </div>
          </div>
        )} />
        <Route exact path='/search' render={({ history }) => (
            <Search onUpdateShelf={this.updateShelf.bind(this)}/>
              )} />
      </div>
    )
  }
}

export default BooksApp

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

  async updateShelf(id, shelf){
    let myBook = this.state.books.filter((book) => {return book.id === id})
    
    if(myBook[0] === undefined){
      myBook = await BooksAPI.get(id)
    } else{
      myBook = myBook[0]
      this.setState((currentState) => ({
        books: currentState.books.filter((b) => {
          return b.id !== id
        })
      }))
    }
    
    myBook.shelf = shelf
      
    this.setState((currentState) => ({
      books: currentState.books.concat([myBook])
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

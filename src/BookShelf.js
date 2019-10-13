import React from 'react'
import Book from './Book'
import *  as BooksAPI from './BooksAPI';

class BookShelf extends React.Component{
    render()    {
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {this.props.books.map((book) => 
                    //myBook = 
                      <li>
                          <Book title={book.title} author={book.author} url={book.url}/>
                      </li>
                  )}
              </ol>
            </div>
          </div>
        )

    }
}

export default BookShelf;
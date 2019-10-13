import React, {Component} from 'react';
import './App.css'
import *  as BooksAPI from './BooksAPI';

class Book extends Component{  

  async updateBook(id, val){
    let b = await BooksAPI.update(id, val)
    console.log(b)
  }

  handleChange(e) {
    let { value} = e.target;
    this.updateBook(this.props.myBook.id, value)
    }
    
    render()  {
      
        return (
        <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${this.props.myBook.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select onChange={this.handleChange.bind(this)} value={this.props.myBook.shelf} >
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.myBook.title}</div>
            <div className="book-authors">{this.props.myBook.authors.map((a) => <p key={a}>{a}</p>)}</div>
            </div>
        )
    }
}

export default Book;
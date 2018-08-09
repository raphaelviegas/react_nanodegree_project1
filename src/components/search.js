import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
//import components
import Book from '../components/book'

class Search extends Component {

    static propTypes = {
      booksOnShelf: PropTypes.array.isRequired,
      onMoveBook: PropTypes.func.isRequired
    }

    state = {
      query: '',
      searchedBooks: []
    }

    updateQuery = (query) => {
      this.setState({query})
      if (query !== "") {
        BooksAPI.search(query).then(searchedBooks => {
          this.setState({searchedBooks})
        })
      } else {
        this.setState({searchedBooks: []})
      }
    }

    render(){
      //filter the searcg result by title and author
      let showingBooks
      if (this.state.searchedBooks.length > 0 && this.state.query !=="") {
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
        showingBooks = this.state.searchedBooks.filter((book) => match.test(book.title, book.authors))
      } else {
        showingBooks=[]
      }
      console.log(this.state.searchedBooks)
      console.log(this.state.searchedBooks.error)

      //message to show if the query returns nothing
      let error
      if (this.state.searchedBooks.error === 'empty query') {
        error = <div className="error-div"><h3 className="error-message">No Results to show</h3></div>
      } else {
        error = ""
      }

      return (
        <div className="search-books">
          <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input 
                type="text" 
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            {//show error message
              error
            }
            <ol className="books-grid"> 
            { // List books
              showingBooks.map((book) => {
                //check if the book has smallThumbnail link
                let smallThumbnail
                if (book.imageLinks !== undefined) {
                  smallThumbnail=book.imageLinks.smallThumbnail
                } else {
                  smallThumbnail="http://placehold.jp/ebebeb/d90f38/128x192.png?text=Cover%20Not%20Available"
                }
                return (
                  <li key={book.id}>
                    <Book
                      id={book.id}
                      coverUrl={smallThumbnail}
                      selectedOption='none'
                      title={book.title}
                      authors={book.authors}
                      onMove={this.props.onMoveBook}
                    />
                  </li>
                )
              })
            }
            </ol>
          </div>
        </div>
      )
    }
}

export default Search
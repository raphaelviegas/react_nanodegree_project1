import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
//import components
import Book from '../components/book'

class Search extends Component {

  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onSearchMoveBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (query !== "") {
      BooksAPI.search(query).then(searchedBooks => {
        this.setState({ searchedBooks })
      })
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  render() {
    
    const {query, searchedBooks} = this.state
    const {booksOnShelf} = this.props

    //filter the search result by title and author
    let showingBooks
    if (searchedBooks.length > 0 && query !== "") {
      showingBooks = searchedBooks.map(searchedBook =>
        booksOnShelf.find(
          bookOnShelf => bookOnShelf.id === searchedBook.id)
        || { ...searchedBook, shelf: 'none' }
      )
    } else {
      showingBooks = []
    }

    //message to show if the query returns nothing
    let error
    if (searchedBooks.error === 'empty query') {
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
              value={query}
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
              showingBooks.map((b) => {
                //check if the book has smallThumbnail link
                let smallThumbnail
                if (b.imageLinks !== undefined) {
                  smallThumbnail = b.imageLinks.smallThumbnail
                } else {
                  smallThumbnail = "http://placehold.jp/ebebeb/d90f38/128x192.png?text=Cover%20Not%20Available"
                }
                return (
                  <li key={b.id}>
                    <Book
                      coverUrl={smallThumbnail}
                      selectedOption={b.shelf}
                      onMove={this.props.onSearchMoveBook}
                      bookInfo={b}
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
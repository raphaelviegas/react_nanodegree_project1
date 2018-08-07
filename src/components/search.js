import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
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
      this.setState({query: query.trim()}) 
    }

    render(){
        
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
              <ol className="books-grid"> 
              
              </ol>
            </div>
          </div>
        )
    }
}

export default Search
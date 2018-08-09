import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from '../components/book'

class Bookshelf extends Component {

    static propTypes = {
      books: PropTypes.array.isRequired,
      title: PropTypes.string.isRequired,
      shelfId: PropTypes.string.isRequired,
      onMoveBook: PropTypes.func.isRequired
    }
    render(){
        const { books } = this.props
        return (
            <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { books.map((book) => {
                        //check if the book has smallThumbnail link
                        let smallThumbnail
                        if (book.imageLinks.smallThumbnail) {
                          smallThumbnail=book.imageLinks.smallThumbnail
                        } else {
                          smallThumbnail="http://placehold.jp/ebebeb/d90f38/128x192.png?text=Cover%20Not%20Available"
                        }
                        
                        return (
                          <li key={book.id}>
                            <Book
                              id={book.id}
                              coverUrl={smallThumbnail}
                              selectedOption={this.props.shelfId}
                              title={book.title}
                              authors={book.authors}
                              onMove={this.props.onMoveBook}
                            />
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                </div>
            </div>
        )
    }
}

export default Bookshelf
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from '../components/book'

class Bookshelf extends Component {

    static propTypes = {
      books: PropTypes.array.isRequired,
      title: PropTypes.string.isRequired,
      shelfId: PropTypes.string.isRequired
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
                          smallThumbnail="http://via.placeholder.com/128X193"
                        }
                        
                        return (
                          <li key={book.id}>
                            <Book
                              id={book.id}
                              coverUrl={smallThumbnail}
                              selectedOption={this.props.shelfId}
                              title={book.title}
                              authors={book.authors}
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
import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom' //depois remover e importar no componente se for o caso
import * as BooksAPI from './BooksAPI'
import './App.css'
//import components
import Search from './components/search'
import Bookshelf from './components/bookshelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount (){
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  moveBook = (book, shelf) => {
    let bookToUpdate ={
      id: book
    }
    BooksAPI.update(bookToUpdate, shelf).then((res) => {
      //The setState is called inside of .then() so it's sure that the call was sucessful
      this.setState(state => {
        let books = this.state.books.map(item => {
          if(bookToUpdate.id === item.id)
          item.shelf = shelf;
          return item;
        })
        return {
          books: books
        }
      })
    })
  }

  render() {
    const shelves = [
      { title: "Currently Reading", id: "currentlyReading"},
      { title: "Want to Read", id: "wantToRead"},
      { title: "Read", id: "read"},
    ]
    
    return (
      <div className="app">
        
        <Route path="/search" render={() => (
          <Search 
            booksOnShelf={this.state.books}
          />
        )}
        />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {shelves.map((shelf) => {
                //filter books to the current shelf
                let shelfBooks = this.state.books.filter((book) => book.shelf === shelf.id)
                
                return (
                  <Bookshelf 
                    key={shelf.id}
                    books={shelfBooks}
                    title={shelf.title}
                    shelfId={shelf.id}
                    onMoveBook={this.moveBook}
                  />
                )

              })}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}
        />
      </div>
    )
  }
}

export default BooksApp

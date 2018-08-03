import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom' //depois remover e importar no componente se for o caso
// import * as BooksAPI from './BooksAPI'
import './App.css'
//import components
import Search from './components/search'
import Bookshelf from './components/bookshelf'

class BooksApp extends React.Component {
  state = {}

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search />
        )}
        />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf />
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

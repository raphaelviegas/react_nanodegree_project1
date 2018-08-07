import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        coverUrl: PropTypes.string,
        selectedOption: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired,
    }
    render() {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" 
                    style={{ backgroundImage: `url(${this.props.coverUrl})` }}>
                </div>
                <div className="book-shelf-changer">
                    <select>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read" >Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                {this.props.authors.map((author,index) => (
                    <div className="book-authors" key={index}>{author}</div>
                ))}
            </div>
        )
    }
}

export default Book
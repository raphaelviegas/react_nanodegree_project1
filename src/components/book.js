import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        coverUrl: PropTypes.string,
        selectedOption: PropTypes.string.isRequired,
        onMove: PropTypes.func.isRequired,
        bookInfo: PropTypes.object
    }

    handleSelectChange = (event) => {
        this.props.onMove(this.props.bookInfo, event.target.value)
    }

    render() {
        const {bookInfo, coverUrl, selectedOption} = this.props
        
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{ backgroundImage: `url(${coverUrl})` }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select defaultValue={selectedOption} onChange={this.handleSelectChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookInfo.title}</div>
                {bookInfo.authors && bookInfo.authors.map((author, index) => (
                    <div className="book-authors" key={index}>{author}</div>
                ))}
            </div>
        )
    }
}

export default Book
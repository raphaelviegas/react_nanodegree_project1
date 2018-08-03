import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    render() {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
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
                <div className="book-title">Component Book is working</div>
                <div className="book-authors">Harper Lee</div>
            </div>
        )
    }
}

export default Book
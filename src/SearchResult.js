import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookStatus: {}
    };
  }

  // Method to update book shelf
  updateShelf = (book, shelf) => {
    if (shelf !== "none") {
      BooksAPI.update(book, shelf).then(res => {
        this.setState({ bookStatus: { book: book, shelf: shelf } });
      });
    }
  };

  render() {
    return (
      <div>
        {Array.isArray(this.props.searchArray) === true ? (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.props.searchArray.map(a => (
                <li key={a.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            a.imageLinks
                              ? a.imageLinks.smallThumbnail
                              : "undefined"
                          })`
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select
                          onChange={e => this.updateShelf(a, e.target.value)}
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{a.title}</div>
                    <div className="book-authors">
                      {a.authors ? a.authors : "no author"}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="not-found"> Not Found ... </div>
        )}
      </div>
    );
  }
}

export default SearchResult;

import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
// import Background from './img/book'
// import { url} from 'url'

class SearchResult extends Component {
  Background;

  constructor(props) {
    super(props);

    this.state = {
      bookStatus: {}
    };

    this.Background =
      "https://epi-rsc.rsc-cdn.org/globalassets/00-sitewide/media/icons/download-bl.png?version=3f1b941e";
  }

  // Method to update book shelf
  updateShelf = (book, shelf) => {
    if (shelf !== "") {
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
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundImage: `url(${
                            a.imageLinks
                              ? a.imageLinks.smallThumbnail
                              : this.Background
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
                          <option value="" selected></option>
                          <option
                            value="currentlyReading"
                            selected={a.shelf === "currentlyReading"}
                          >
                            Currently Reading
                          </option>
                          <option
                            value="wantToRead"
                            selected={a.shelf === "wantToRead"}
                          >
                            Want to Read
                          </option>
                          <option value="read" selected={a.shelf === "read"}>
                            Read
                          </option>
                          <option value="none" selected={a.shelf === "none"}>
                            None
                          </option>
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

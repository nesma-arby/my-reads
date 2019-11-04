import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListBooks extends Component {
  
  Background;

  constructor(props) {
    super(props);

    this.Background =
      "https://epi-rsc.rsc-cdn.org/globalassets/00-sitewide/media/icons/download-bl.png?version=3f1b941e";
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          {this.props.booksList.length > 0 ? (
            this.props.booksList.map(b => (
              <div key={b} className="bookshelf">
                <h2 className="bookshelf-title"> {b[0]} </h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {b[1].map(a => (
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
                                defaultValue={a.shelf}
                                onChange={e =>
                                  this.props.updateShelf(a, e.target.value)
                                }
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
                          <div className="book-authors">{a.authors}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))
          ) : (
            <div> Loading ... </div>
          )}
        </div>

        <div className="open-search">
          <Link className="btn-add" to="/search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;

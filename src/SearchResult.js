import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class SearchResult extends Component {
  Background;
  searchObj;

  constructor(props) {
    super(props);

    this.state = {
      query: "",
      searchArray: []
    };

    this.Background =
      "https://epi-rsc.rsc-cdn.org/globalassets/00-sitewide/media/icons/download-bl.png?version=3f1b941e";
    this.searchObj = {};
  }

  // Method to update state with the entered query and call search method
  handleInputChange = query => {
    this.setState(
      {
        query: query
      },
      () => {
        if (this.state.query.length > 0) {
          this.setState({ searchArray: [] });
          this.searchObj = {};
          this.getInfo();
        } else {
          this.setState(() => ({ searchArray: [] }));
        }
      }
    );
  };

  // Method search and return all books that matches the query
  getInfo = () => {
    BooksAPI.search(this.state.query)
      .then(result => {
        result.map(s => (s.shelf = "none"));
        result.map(s => (this.searchObj[s.id] = s));

        this.props.books.map(
          b =>
            (typeof this.searchObj[b.id] === "object") === true &&
            (this.searchObj[b.id].shelf = b.shelf)
        );

        this.setState({ searchArray: Object.values(this.searchObj) });
      })
      .catch(error => {
        // console.log("Error searching data", error);
      });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.handleInputChange(event.target.value)}
            />
          </div>
        </div>

        {Array.isArray(this.state.searchArray) === true &&
        this.state.searchArray.length > 0 ? (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.searchArray.map(a => (
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
                    <div className="book-authors">
                      {a.authors ? a.authors : "no author"}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="not-found"> </div>
        )}
      </div>
    );
  }
}

export default SearchResult;

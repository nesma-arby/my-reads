import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchResult from "./SearchResult";
import ListBooks from "./ListBooks";
import { Link, Route } from "react-router-dom";


class BooksApp extends React.Component {
  booksObject;
  searchObj;

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      query: "",
      booksList: [],
      searchArray: []
    };

    this.booksObject = {};
    this.searchObj = {};
  }

  // Method to get all books first time
  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({ books }));
        this.getCategory(this.state.books);
      })
      .catch(error => {
        console.log("Error fetching data", error);
      });
  }
  // Method to return array of categories
  getCategory = books => {
    books.map(b =>
      this.booksObject.hasOwnProperty(b.shelf)
        ? this.booksObject[b.shelf].push(b)
        : (this.booksObject[b.shelf] = [b])
    );
    this.setState({ booksList: Object.entries(this.booksObject) });
    return this.state.booksList;
  };

  // Method to update state with the entered query and call search method
  handleInputChange = query => {
    this.setState(
      {
        query: query
      },
      () => {
        if (this.state.query && this.state.query.length > 0) {
          this.getInfo();
        } else {
          this.setState(() => ({ searchArray: [] }));
        }
      }
    );
  };

  // Method search and return all books that matches the query
  getInfo = () => {
    this.setState({ searchArray: [] });
    BooksAPI.search(this.state.query)
      .then(result => {
        result.map(s => (this.searchObj[s.id] = s));
        this.state.books.map(b =>
          (typeof this.searchObj[b.id] === "object") === true
            ? (this.searchObj[b.id].shelf = b.shelf)
            : console.log("error")
        );
        this.setState({ searchArray: Object.values(this.searchObj) });
      })
      .catch(error => {
        console.log("Error searching data", error);
      });
  };

  render() {
    return (
      <div className="app">
        {/* Draw the html of the 3 categories with their books */}
        <Route
          exact
          path="/"
          render={() => <ListBooks booksList={this.state.booksList} />}
        />

        <div className="open-search">
          <Link className="btn-add" to="/search">
            Add a book
          </Link>
        </div>
        {/* Draw html for the search page */}
        <Route
          path="/search"
          render={() => (
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
                    onChange={event =>
                      this.handleInputChange(event.target.value)
                    }
                  />
                </div>
              </div>
              <SearchResult searchArray={this.state.searchArray} />
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchResult from "./SearchResult";
import ListBooks from "./ListBooks";
import { Route } from "react-router-dom";
import { Switch } from "react-router";

class BooksApp extends React.Component {
  
  // this object to categorize the returned result from get all api
  // handel data to be key : [{ } , { } ] then convert this object to array to can do loop
  booksObject;
  books;

  constructor(props) {
    super(props);

    this.state = {
      booksList: []
    };

    this.books = [];
    this.booksObject = {};
  }

  // Method to get all books first time
  fillBooksState() {
    BooksAPI.getAll()
      .then(books => {
        this.books = books;
        this.booksObject = {};
        this.getCategory(this.books);
      })
      .catch(error => {
        console.log("Error fetching data", error);
      });
  }

  // Method to return array of categories with their array of objects
  getCategory = books => {
    books.map(b =>
      this.booksObject.hasOwnProperty(b.shelf)
        ? this.booksObject[b.shelf].push(b)
        : (this.booksObject[b.shelf] = [b])
    );
    this.setState(() => ({ booksList: Object.entries(this.booksObject) }));
  };

  componentDidMount() {
    this.fillBooksState();
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fillBooksState();
    });
  };

  render() {
    return (
      <div className="app">
        {/* Draw the html for the 3 categories with their books */}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ListBooks
                booksList={this.state.booksList}
                updateShelf={this.updateShelf}
              />
            )}
          />

          {/* Draw html for the search page */}
          <Route
            path="/search"
            render={() => (
              <SearchResult books={this.books} updateShelf={this.updateShelf} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;

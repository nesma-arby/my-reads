import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchResult from "./SearchResult";
import ListBooks from "./ListBooks";
import { Route } from "react-router-dom";
import { Switch } from "react-router";

class BooksApp extends React.Component {
  booksObject;

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      booksList: []
    };

    this.booksObject = {};
  }

  // Method to get all books first time
  fillBooksState() {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({ books }));
        // console.log( 'books' , this.state.books);
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
    // console.log( 'booksobject' , this.booksObject);
    this.setState({ booksList: Object.entries(this.booksObject) });
    // console.log( 'bookslist' , this.state.booksList);
    return this.state.booksList;
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
        {/* Draw the html of the 3 categories with their books */}
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
              <SearchResult
                books={this.state.books}
                updateShelf={this.updateShelf}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;

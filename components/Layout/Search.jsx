import "babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../src/SearchBar';

const SearchBar = React.createClass({

  onChange(input, resolve) {
    // Simulate AJAX request
    setTimeout(() => {
      const suggestions = matches[Object.keys(matches).find((partial) => {
          return input.match(new RegExp(partial), 'i');
        })] || ['macbook', 'macbook air', 'macbook pro'];

      resolve(suggestions.filter((suggestion) =>
        suggestion.match(new RegExp('^' + input.replace(/\W\s/g, ''), 'i'))
      ));
    }, 25);
  },
  onSearch(input) {
    if (!input) return;
    console.info(`Searching "${input}"`);
  },
  render() {
    return (
      <SearchBar
        placeholder="search 'mac'"
        onChange={this.onChange}
        onSearch={this.onSearch} />
    );
  }
});

ReactDOM.render(<SearchBar />, document.getElementById('root'));

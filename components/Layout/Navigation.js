/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';
import SearchBar from 'react-search-bar';
import axios from 'axios';

const matches = {
  'lamb r': [
    'lamb ribs grilled',
    'lamb ribs slow cooked',
    'lamb ribs marinated'
  ],
  'lamb s': [
    'lamb shanks roast',
    'lamb shanks grilled',
    'lamb shanks baked'
  ]
};

const helpers = {

  searchMovie: (movieTitle) => axios.get(`https://146t1qwsu4.execute-api.ap-southeast-2.amazonaws.com/dev/movies/${movieTitle}`)
    .then(function (result) {

      let lambdaResponse =  {
        movieTitle: result.data["Item"]["Title"],
        lambdaStatus: result.status,
        lambdaStatusText: result.statusText
      };

      console.log("Lambda Response", lambdaResponse);
      return lambdaResponse
    })

};

class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movieTitle: 'unknown',
      lambdaStatus: 'unknown',
      lambdaStatusText: 'unknown'
    };

  }

  onChange(input, resolve) {
    // Simulate AJAX request
    setTimeout(() => {
      const suggestions = matches[Object.keys(matches).find((partial) => {
          return input.match(new RegExp(partial), 'i');
        })] || ['lambda', 'lamb ribs', 'lamb shanks', 'lamborghini'];

      resolve(suggestions.filter((suggestion) =>
        suggestion.match(new RegExp('^' + input.replace(/\W\s/g, ''), 'i'))
      ));
    }, 25);
  }

  onSearch(input) {
    if (!input) return;
    console.info(`Searching "${input}"`);
  }

  componentDidMount() {

    helpers.searchMovie('Scream').then(lambdaResponse => this.setState(
      {
        movieTitle: lambdaResponse.movieTitle.toString(),
        lambdaStatus: lambdaResponse.lambdaStatus.toString(),
        lambdaStatusText: lambdaResponse.lambdaStatusText.toString()
      }));
    window.componentHandler.upgradeElement(this.root);

  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <nav className="mdl-navigation" ref={node => (this.root = node)}>
        <div> Lambda State: {this.state.lambdaStatusText}. <br />
              Movie Details: {this.state.movieTitle}.
        </div>
        <SearchBar
          placeholder="search 'lam'"
          onChange={this.onChange}
          onSearch={this.onSearch}
        />

        <Link className="mdl-navigation__link" to="/">Home</Link>
        <Link className="mdl-navigation__link" to="/about">About</Link>

      </nav>

  );
  }

}

export default Navigation;

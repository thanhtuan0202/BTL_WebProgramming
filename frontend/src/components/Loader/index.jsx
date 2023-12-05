import React, { Component } from 'react';
import "./style.css";

export default class Loader extends Component {
  render() {
    return (
        <div class="loader">
            <div class="inner one"></div>
            <div class="inner two"></div>
            <div class="inner three"></div>
        </div>
    )
  }
}

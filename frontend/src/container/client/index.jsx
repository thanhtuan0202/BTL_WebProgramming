import React from 'react';
import Header from '../../components/Header/Header';
import FooterClient from '../../components/FooterClient';
import {Navigate } from 'react-router-dom';
function LayoutHome(props) {
    return (
      <div className="App">
        <Header />
        {props.children}
        <FooterClient />
      </div>
    );
    
  }
export default LayoutHome

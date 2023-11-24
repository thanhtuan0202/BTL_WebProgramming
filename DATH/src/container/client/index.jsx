import React from 'react';
import Header from '../../components/Header/Header';
import FooterClient from '../../components/FooterClient';
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

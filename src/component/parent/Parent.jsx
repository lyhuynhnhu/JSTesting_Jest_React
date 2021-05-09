import React from 'react';
import Header from '../header/Header';
import Main from '../main/Main'
import Footer from '../footer/Footer';

import './Parent.scss';

const Parent = () => {
  return (
    <div className="container"> 
      <Header />
      <Main />
      <Footer />
    </div>
  )
};

export default Parent;
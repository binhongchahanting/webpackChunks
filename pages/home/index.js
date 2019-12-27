// require('./index.less');
import '../css/index.less';
import React from 'react';
import ReactDom from 'react-dom';
// import './demo01';
import Header from '../../components/header';

const App = () => {
  console.log('---1212');
  const handleClick = () => {
    window.location.href = 'about.html';
  }
  return (<div>
    1212home
    <Header />
    <button onClick={handleClick}>跳转到about</button>
  </div>)
}
ReactDom.render(<App />, document.getElementById('root'));
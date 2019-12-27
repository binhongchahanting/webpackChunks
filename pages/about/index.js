import '../css/index.less';
import './index.less';
import React from 'react';
import ReactDom from 'react-dom';
import Container from './demo01';
import Header from '../../components/header';
const App = () => {
  const handleClick = () => {
    window.location.href = 'home.html';
  }
  return (<div>
    <h2>APP</h2>
    <Header />
    <button onClick={handleClick}>跳转到home</button>
  </div>)
}
ReactDom.render(<App />, document.getElementById('root'));
console.log('---about');
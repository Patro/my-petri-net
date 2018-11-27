import React, { Component } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar'
import Topbar from './Topbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <Layout className="outer_layout">
          <Sidebar />
          <Layout>
            <Topbar />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default App;

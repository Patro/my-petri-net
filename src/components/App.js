import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import EditorContainer from '../containers/EditorContainer';
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
            <Route path="/:id/edit" component={EditorContainer} />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default App;

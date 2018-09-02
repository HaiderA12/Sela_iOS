import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import homePage from './modules/home/scenes/Home';
import uploadPage from './modules/home/scenes/Uploadpage';
import retrievePage from './modules/home/scenes/Retrieve';
import imageHashes from './modules/home/scenes/Hashes';




export default class App extends Component {
  render() {
    return (
      <Router hideNavBar= "true">
        <Scene key="root">
          
  
          <Scene key="homepage" component={homePage} hideNavBar = {false} initial={true}  />
          <Scene key="uploadpage" component={uploadPage} hideNavBar = {false} initial={false}  />
          <Scene key="retrievepage" component={retrievePage} hideNavBar = {false} initial={false}  />
          <Scene key="imagehashes" component={imageHashes} hideNavBar = {false} initial={false}  />


        </Scene>
      </Router>
    )
  }
}

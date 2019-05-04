/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, { Component } from 'react';
import SwitchNav from './views/Navigation';


interface IAppProps { }

interface IAppState {
  fontsAreLoaded: boolean;
}

export default class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      fontsAreLoaded: false
    };
  }

  componentDidMount() {

  }



  render() {
    return (
      <SwitchNav />
    );


  }
}


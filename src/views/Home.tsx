import React, { Component } from 'react';
import Map from '../components/Map';

interface IHomeProps {}

interface IHomeState {
  someKey: any;
}
export default class HomeComponent extends Component<IHomeProps,IHomeState> {
    constructor(props:IHomeProps) {
        super(props);
        this.state = { someKey: false };
    }

    render() {
        return (
            <Map></Map>
           );
    }

    componentDidMount() {
        this.setState({ someKey: 'otherValue' });
    }
}
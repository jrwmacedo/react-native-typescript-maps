import React, {Component} from 'react';
import {StyleSheet,View, Button } from 'react-native';

interface ILoginProp{
  navigation:any;
}
interface ILoginState{
  someKey:any;
}

class LoginComponent extends Component <ILoginProp,ILoginState>{
  constructor(props:ILoginProp) {
    super(props);
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (<View style={styles.container}>
    <Button title='Go to Home'
    onPress={() => this.props.navigation.navigate('Home')}/>
    </View>);
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default LoginComponent;

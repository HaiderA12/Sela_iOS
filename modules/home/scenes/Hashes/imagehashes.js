import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import retrievePage from '../Retrieve';
import { Container, Content, Footer, FooterTab, Button, Left, Right, Icon, Text } from 'native-base';
import { List, ListItem } from 'react-native-elements'


export default class imageHashes extends Component{
	constructor(props){
		super(props);
		this.state = {
			list: [
				  {
				    name: 'QmnSDAHijfa1291rufudssufdsudf',
				    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
				  },
				  {
				    name: 'Qmfej23r88f9hefJHIqdHwdewef8923',
				    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
				  },
				]
		}
	}

	render(){
		return(
			<Container>
				<Content>
				<List containerStyle={{marginBottom: 20}}>
					  {
					    this.state.list.map((l) => (
					      <ListItem
					        
					        avatar={{uri:l.avatar_url}}
					        title={l.name}
					      />
					    ))
					  }
					</List>
				</Content>
			</Container>
			)
	}
}
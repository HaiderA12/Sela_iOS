import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Left, Right, Icon, Text } from 'native-base';
import { AppRegistry, View, Image, TextInput,TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Badge} from 'react-native-elements'
import styles from "./style";
import ImagePicker from 'react-native-image-picker';


export default class retrievePage extends Component {
	constructor(props) {
    	super(props);
	    this.state = {
	        searchLabel: "",
	        image_base64:[],
	        image_hashes:[],
    	};
    }	


    onPressBtn(){
    	this.setState({image_base64:[]})
    	const url = "http://54.153.95.254:8080/getfilehashes?label="+this.state.searchLabel
    	console.log("Obtaining hashes for key '"+this.state.searchLabel+"'")
    	console.log(url)
        fetch(url, {
        	method: 'GET'
	    })
	    .then((response) =>  {
	    	console.log(response)

	    	if (response.status===200){
		      	const hash_urls = JSON.parse(response._bodyInit)['hashes']
		      	if(hash_urls.length === 0){
		      		Alert.alert('Sorry', 'No Images for the key you entered',
		      			[
		      				{text:'OK', onPress:()=>console.log('OK Pressed')}
		      			])
		      	}
		      	this.setState({image_hashes:hash_urls})
//		      	console.log(this.state.image_hashes)
	      		this.hashtobase64(hash_urls)
	    	}else{
		    	Alert.alert('Oops!','Something went wrong. Please try again.',
	          	[
	            	{text: 'OK', onPress: () => console.log('OK Pressed')},
	          	],
	          	{ cancelable: false }
		        )
	    	}

      	})
        .catch((error) =>{
	      	console.error(error);
        })

    }

    onPressAllBtn(){
    	this.setState({image_base64:[]})
    	const url = 'http://54.153.95.254:8080/getallhashes'
    	console.log("Obtaining hashes for All Images")
    	console.log(url)
        fetch(url, {
        	method: 'GET'
	    })
	    .then((response) =>  {
	    	if (response.status===200){
		      	const hash_urls = JSON.parse(response._bodyInit)['hashes']
		      	this.setState({image_hashes:hash_urls})
//		      	console.log(this.state.image_hashes)
	      		this.hashtobase64(hash_urls)
	    	}else{
		    	Alert.alert('Oops!','Something went wrong. Please try again.',
	          	[
	            	{text: 'OK', onPress: () => console.log('OK Pressed')},
	          	],
	          	{ cancelable: false }
		        )
	    	}

      	})
        .catch((error) =>{
	      	console.error(error);
        })

    }

    hashtobase64(hash_urls){
		if(hash_urls.length > 0) {
			hash_urls.forEach(data => {
				const ipfs_url = 'https://ipfs.io/ipfs/' + data
				console.log("Getting base64 image data from")
				console.log(ipfs_url)
				fetch(ipfs_url, { method: 'GET' })
					.then((response) => {
						const image = 'data:image/png;base64,' + response._bodyInit
						this.setState(prevState => ({
							image_base64: [...prevState.image_base64, image]
						}))
					}).catch((error) => {
						console.error(error)
					})
			})
		} else {
			this.setState({ image_base64: [] })
		}
	}

    imagerender() {
    	return this.state.image_base64.map((data2,keyy2)=>{
	    	return (
    			<View key={keyy2} style={styles.viewstyle}>
					<Image style={styles.ImageContainer} source={{uri: data2}} />
					<Badge containerStyle={{ backgroundColor: 'white', borderWidth:1, marginTop:5}}>
					  <Text>{this.state.image_hashes[keyy2]}</Text>
					</Badge>
				</View>
			)
    	})
	}

	render(){ 
    return (
    <Container>
        <Content padder>
        <View>
         <TextInput style={styles.textbox}
           underlineColorAndroid = "transparent"
           placeholder = "Add Label to Search..."
           placeholderTextColor = "#9E9E9E"
           autoCapitalize = "none"
           onChangeText={(text) => this.setState({
                searchLabel: text
            })}                    
           />

         <Button block raised style={styles.mt1} onPress={this.onPressBtn.bind(this)} >
           <Text>Retrieve</Text>
         </Button>
 	     <Button block raised style={styles.mt1} onPress={this.onPressAllBtn.bind(this)} >
           <Text>Get all Images</Text>
         </Button>
         </View>
	      <View style={{justifyContent: "center"}}>
		      { this.state.image_base64 === null ? <View style={{marginTop:50, alignItems:"center"}}><Text>No Files to {"\n"}  Display</Text></View>: this.imagerender() }
	      </View>
   	     <Button block raised style={styles.mt1} onPress= {() => {Actions.imagehashes(); }} >
           <Text>Get Images with Hashes</Text>
         </Button>


    </Content>
    </Container>
    );
  }
}


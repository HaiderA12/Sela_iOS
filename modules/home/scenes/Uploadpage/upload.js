
import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Left, Right, Icon, Text } from 'native-base';
import { AppRegistry, View, Image, TextInput,TouchableOpacity, Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "./style";
import ImagePicker from 'react-native-image-picker';

export default class uploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Label: "",
        ImageSource: null,
        File: null
    };
  }
  selectImage() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
        skipBackup: true
        }
      };
  
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          //console.log(response);
          const source = { uri: response.uri };
          this.setState({
            File: response,
            ImageSource: source
          });
        }
      });
    }

  onSubmit(){

    if(this.state.Label && this.state.File !== null){
      fetch('http://54.153.95.254:8080/submitfile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "filename": this.state.File.fileName,
          "data": this.state.File.data,
          "label": this.state.Label,
        }),
        })
        .then((response) => {
          console.log(response)
          Alert.alert('Successful','Label and Image saved to IPFS',
            [
              {text: 'OK', onPress: () => this.setState({Label:"", File:null, ImageSource:null})},
            ],
            { cancelable: false }
          )
        }).catch((error) => {
          console.error(error)
        })
      }else{
        console.log('no data')
        Alert.alert('Insufficient Inputs','Please Complete the Form',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }

  };
  render(){
    return (
      <Container>
        <Content style={styles.container} padder>
          <Container style={styles.subcontainer}>
            
            <TouchableOpacity onPress={this.selectImage.bind(this)}>
            <View style={styles.ImageContainer}>
              { this.state.ImageSource === null ? <Text style={{color: '#9E9E9E'}}>Select File to {"\n"}  Upload . . .</Text> :
                <Image style={styles.ImageContainer} source={this.state.ImageSource} />
              }
            </View>
            </TouchableOpacity>

            <TextInput style={styles.textbox}
               underlineColorAndroid = "transparent"
               placeholder = "Add Label..."
               placeholderTextColor = "#9E9E9E"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({
                    Label: text
                })}                    
               />
          </Container>

          <Container>
          <Button block raised style={styles.mt1} onPress={this.onSubmit.bind(this)}>
           <Text>Upload</Text>
          </Button>

          </Container>

        </Content>

      </Container>
    );
  }
}
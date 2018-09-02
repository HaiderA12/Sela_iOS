
import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Left, Right, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from "./style";
import {Card} from 'react-native-elements';

export default class homePage extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content padder>

          <Button block style={styles.mt1} onPress= {() => {Actions.uploadpage(); }}>
            <Text>Upload</Text>
          </Button>

          <Button block warning style={styles.mt2} onPress= {() => {Actions.retrievepage(); }}>
            <Text>Retrieve</Text>
          </Button>
          <Card
              title='NEW FROM'
              image={require('../../../../resources/images/Selalogo.png')}
              >
              <Text style={{marginBottom: 10}}>
              Sela-Labs is proud to announce....
              </Text>
              <Button
                icon={{name: 'code'}}
                backgroundColor='#03A9F4'
                fontFamily='Lato'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW NOW' />
            </Card>
        </Content>

        <Footer>
          <FooterTab>
            <Button raised vertical>
              <Icon name="home"/>
              <Text>Home</Text>
            </Button>
            <Button raised vertical>
              <Icon name="book" />
              <Text>History</Text>
            </Button>

            <Button vertical>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>



          </FooterTab>
        </Footer>

      </Container>
    );
  }
}
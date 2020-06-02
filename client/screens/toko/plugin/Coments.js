import React, { Component } from 'react';
import { Image, Text} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';

export default class CardShowcaseExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isReady: false,
        };
      }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://img.icons8.com/plasticine/2x/user.png'}} />
                <Body>
                  <Text style={{fontWeight: 'bold'}}>Supariasa</Text>
                  <Text style={{color: 'grey'}}>20 Jan 2019</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Sangat puas dengan pelayanan dan barang dalam kondisi yang bagus
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
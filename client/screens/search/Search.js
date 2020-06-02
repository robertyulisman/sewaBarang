import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, SafeAreaView, Keyboard, Button, Image, Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import Slider from "react-native-slider";
import {LinearGradient} from 'expo-linear-gradient'
import { MaterialCommunityIcons, AntDesign, Ionicons, FontAwesome, Feather} from 'react-native-vector-icons';
import * as Animatable from 'react-native-animatable';
import ToggleButton from './ToggleButton';
import ToggleButtonColor from './ToogleButtonColor';
// import SearchCard from './searchCard';

const {height, width} = Dimensions.get('window');
export default class Search extends Component {
  constructor(props) {
    super(props);
      this.state = {
        Value: 1,
        text: '',
        searchBarFocused: false,
        opendModal: '',
        bounceValue: new Animated.Value(5000),
        searchModal: new Animated.Value(-5000),
        blackBackOpcity: new Animated.Value(-5000)
      }
      this.animatedValue = new Animated.Value(0);
  }

  updateChoice(type) {
		let newState = { ...this.state };
		newState[type] = !newState[type];
		this.setState(newState);
	}
	_openModal() {
		Animated.sequence([
			Animated.timing(
				this.state.blackBackOpcity,
				{
					toValue: 0,
					velocity: 3,
					tension: 2,
					friction: 8,
					duration: 300
				}
			).start(),
			Animated.timing(
				this.state.bounceValue,
				{
					toValue: 0,
					velocity: 3,
					tension: 2,
					friction: 8,
				}
			).start(),

		])

		this.setState({ opendModal: 'filter' })
	}
	_hideModal() {
		Animated.sequence([
			Animated.timing(
				this.state.blackBackOpcity,
				{
					toValue: -height,
					velocity: 3,
					tension: 2,
					friction: 8,
					duration: 300
				}
			).start(),
			Animated.timing(
				this.state.bounceValue,
				{
					toValue: height,
					velocity: 3,
					tension: 2,
					friction: 8,
				}
			).start(),
		])

      this.setState({ opendModal: '' })
    }
    _handelClose() {
      console.log(this.state.opendModal)
      if (this.state.opendModal == 'search') {
        this._closeModalSearch();
      }
      // }else if(this.state.opendModal == 'filter'){
      // 	this._hideModal()
      // }
    }
    componentDidMount() {
      this.animatedValue.setValue(0)
      // apply scroll to top animation to search card
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad)
        }
      ).start()
    }

    componentDidMount(){
      setTimeout(() => {
      Keyboard.dismiss();
      }, 5000);
    }

    submitAndClear = () => {
      this.props.writeText(this.state.text)
  
      this.setState({
        text: ''
      })
    }

  render() {
    const marginTop = this.animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [260, 0]
		})
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', height: 90, backgroundColor: 'blue', justifyContent: 'center', paddingHorizontal: 5}}>
          <Animatable.View animation="slideInRight" duration={800} style={{right: 30, borderRadius: 10, height: 50, width: '80%', backgroundColor: 'white', marginTop: 30, alignItems: 'center', padding: 5, flexDirection: 'row'}}>
            <Animatable.View animation={this.state.searchBarFocused ? "fadeInLeft" : "fadeInRight"}>
              <Feather 
                name={this.state.searchBarFocused ? "arrow-left" : "search"} size={24} color={'grey'}
              />
            </Animatable.View>
            <TextInput
              style={{fontSize: 15, marginLeft: 15, flex: 1}}
              underlineColorAndroid="transparent"
              placeholder="Cari Produk"
              autoFocus={true} 
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              clearButtonMode="always"
              clearTextOnFocus
            />
          </Animatable.View>
          <TouchableOpacity onPress={() => { this._openModal() }} style={{position: 'absolute', right: 15, top: 35, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50}}>
            <Feather 
              name="filter" size={24} color={'white'}
            />
          </TouchableOpacity>
        </View>


        
        <ScrollView style={{flex: 1}}>
        <Animated.View
					style={[styles.subView,
					{ transform: [{ translateX: this.state.bounceValue }] }]}
				>
					<Text style={{  color: '#333333', fontSize: 20, marginLeft: 10, marginTop: 30, fontWeight: 'bold'}}>Filter</Text>
					<View style={{ marginBottom: 30 }}>
						<Text style={{  color: '#333333', fontSize: 14, marginLeft: 10, marginBottom: 20 }}>Kategori</Text>
						<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
							<ToggleButton label='Sports' onPress={() => { this.updateChoice('sports') }} selected={this.state.sports} />
							<ToggleButton label='Exclusive' onPress={() => { this.updateChoice('exclusive') }} selected={this.state.exclusive} />
							<ToggleButton label='SUV' onPress={() => { this.updateChoice('suv') }} selected={this.state.suv} />
							<ToggleButton label='Sports' onPress={() => { this.updateChoice('sports') }} selected={this.state.sports} />
							<ToggleButton label='Exclusive' onPress={() => { this.updateChoice('exclusive') }} selected={this.state.exclusive} />
							<ToggleButton label='SUV' onPress={() => { this.updateChoice('suv') }} selected={this.state.suv} />
						</ScrollView>
					</View>
					<View style={{ marginBottom: 30 }}>
						<Text style={{  color: '#333333', fontSize: 14, marginLeft: 10, marginBottom: 20 }}>Merek</Text>
						<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
							<ToggleButton label='BMW' onPress={() => { this.updateChoice('bmw') }} selected={this.state.bmw} />
							<ToggleButton label='Chevy' onPress={() => { this.updateChoice('chevy') }} selected={this.state.chevy} />
							<ToggleButton label='Lexus' onPress={() => { this.updateChoice('lexus') }} selected={this.state.lexus} />
							<ToggleButton label='BMW' onPress={() => { this.updateChoice('bmw') }} selected={this.state.bmw} />
							<ToggleButton label='Chevy' onPress={() => { this.updateChoice('chevy') }} selected={this.state.chevy} />
							<ToggleButton label='Lexus' onPress={() => { this.updateChoice('lexus') }} selected={this.state.lexus} />
						</ScrollView>
					</View>
					<View style={{ marginBottom: 30 }}>
						<Text style={{  color: '#333333', fontSize: 14, marginLeft: 10, marginBottom: 20 }}>Kapasitas</Text>
						<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
							<ToggleButton label='<2000 CC' onPress={() => { this.updateChoice('cc2000') }} selected={this.state.cc2000} />
							<ToggleButton label='2500 CC' onPress={() => { this.updateChoice('cc2500') }} selected={this.state.cc2500} />
							<ToggleButton label='3000 CC' onPress={() => { this.updateChoice('cc3500') }} selected={this.state.cc3500} />
							<ToggleButton label='<2000 CC' onPress={() => { this.updateChoice('cc2000') }} selected={this.state.cc2000} />
							<ToggleButton label='2500 CC' onPress={() => { this.updateChoice('cc2500') }} selected={this.state.cc2500} />
							<ToggleButton label='3000 CC' onPress={() => { this.updateChoice('cc3500') }} selected={this.state.cc3500} />
						</ScrollView>
					</View>
					<View style={{ marginBottom: 30 }}>
						<Text style={{ color: '#333333', fontSize: 14, marginLeft: 10, marginBottom: 20 }}>Color</Text>
						<ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{ alignItems: 'center' }}>
							<ToggleButtonColor color={'#FF4E3A'} onPress={() => { this.updateChoice('color1') }} selected={this.state.color1} />
							<ToggleButtonColor color={'#FFE138'} onPress={() => { this.updateChoice('color2') }} selected={this.state.color2} />
							<ToggleButtonColor color={'#3E4EB8'} onPress={() => { this.updateChoice('color3') }} selected={this.state.color3} />
							<ToggleButtonColor color={'#9D1BB2'} onPress={() => { this.updateChoice('color4') }} selected={this.state.color4} />
							<ToggleButtonColor color={'#1194F6'} onPress={() => { this.updateChoice('color5') }} selected={this.state.color5} />
							<ToggleButtonColor color={'#47B04B'} onPress={() => { this.updateChoice('color6') }} selected={this.state.color7} />
							<ToggleButtonColor color={'#484848'} onPress={() => { this.updateChoice('color7') }} selected={this.state.color7} />
						</ScrollView>
					</View>
					<View style={{ marginBottom: 30, }}>
						<Text style={{ color: '#333333', fontSize: 14, marginLeft: 10, marginBottom: 20 }}>Price Range</Text>
						<View style={{ paddingHorizontal: 10 }}>
							<Slider
								style={{ marginBottom: 20, }}
								minimumValue={1}
								maximumValue={100}
								step={1}
								customMinimumTrack={(
									<LinearGradient
										start={{ x: .74, y: .26 }}
										end={{ x: 0, y: .77 }}
										colors={['#343333', '#BFBFBF']}
										style={{
											width: '100%',
											height: '100%',
										}}
									/>
								)}
								customMaximumTrack={(
									<LinearGradient
										start={{ x: .74, y: .26 }}
										end={{ x: 0, y: .77 }}
										colors={['#343333', '#BFBFBF']}
										style={{
											width: '100%',
											height: '100%',
										}}
									/>
								)}
								customThumb={(
									<LinearGradient
										start={{ x: .74, y: .26 }}
										end={{ x: 0, y: .77 }}
										colors={['#333333', '#333333']}
										style={{
											width: 36,
											height: 36,
											margin: 2,
											borderRadius: 36 / 2,
											borderWidth: 4,
											borderColor: '#fff',
											elevation: 1
										}}
									/>
								)}
								value={this.state.value}
								onValueChange={value => this.setState({ value })}
							/>
							<Text>
								Value: {this.state.value}
							</Text>
						</View>

					</View>
					<View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>
						<TouchableOpacity onPress={() => { this._hideModal() }}
							style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 7, width: '50%' }}
						>
							<Text style={{ color: 'white', fontSize: 14, color: '#000000', fontWeight: 'bold'}}>Reset</Text>
						</TouchableOpacity>
							<TouchableOpacity onPress={() => { this._hideModal() }} style={{backgroundColor: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 7, width: '40%' }}>
								<Text style={{ color: 'white', fontSize: 14, color: '#ffffff', fontWeight: 'bold'}}>Submit</Text>
							</TouchableOpacity>
					</View>
				</Animated.View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    right: 70, 
    top: 25, 
    borderRadius: 10, 
    height: 50, 
    width: '65%', 
    borderColor: '#ddd', 
    borderWidth: 1, 
  },
  // subView: {
	// 	position: "absolute",
	// 	bottom: 0,
	// 	left: 50,
	// 	right: 0,
	// 	top: 0,
	// 	paddingTop: 50,
	// 	paddingLeft: 20,
	// 	backgroundColor: "#ffffff",
	// 	height: height,
	// 	zIndex: 15,
	// },
})
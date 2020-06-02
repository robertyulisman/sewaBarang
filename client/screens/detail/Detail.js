import React, { Component, createRef} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Dimensions, SafeAreaView, Platform, ScrollView, Image, Modal, StyleSheet, Animated, StatusBar } from 'react-native';
import { Header } from 'react-navigation';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { default as NumberFormat } from 'react-number-format';
import NumericInput from 'react-native-numeric-input';
import { MaterialCommunityIcons, AntDesign, Ionicons, FontAwesome, Feather} from 'react-native-vector-icons';
import Swiper from 'react-native-swiper';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiUrl } from '../../config';
import { getCurrentProfileData } from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';
import ActionSheet from "react-native-actions-sheet";

const {height, width} = Dimensions.get('window');
const actionSheetRef = createRef();
class Detail extends Component {
    static navigationOptions = ({ navigation, profile }) => {
        return {
			header: null
        }
	};

	constructor(props) {
		super(props);
		this.state = {
			stok: 0,
			imageHeight: 165,
            marginTop: -50,
            yAxis: 0,
			isModalOpened: false,
			currentImageIndex: 0,
			Default_Rating: 0,
			activeIndex: 0,
			isVisible: false,
            isfetched: false,
			index: 0,
            activeIndex: 0,
			Max_Rating: 5,
			routes: [
                { key: 'first', title: 'Deskripsi' },
                { key: 'second', title: 'Jaminan' },
            ],

		};
		this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
		this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
	}

	_renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'blue'}}
        />
	);
	
	
    getDataUser = () => {
        const id = this.props.auth.user._id;
        axios
            .get(`${apiUrl}/api/user/${id}`)
            .then((res) => {
                // this.setState({
                //     sewaItem: res.data.sewaItem,
                // });
                console.log('res', res.data);
            })
            .catch((err) => console.log('error get by id', err));
    };

    handleSewaButton = () => {
        const idProduct = this.props.navigation.state.params._id;
        const { profile } = this.props.profile;

        // api/sewaitem/assign/product/5e89a8f7e38855338cd10cdc/5e8f40ddfba8b705b0ed8fab

        axios
            .post(
                `${apiUrl}/api/sewaitem/assign/product/${profile._id}/${idProduct}`,
            )
            .then((res) => {
                // this.setState({
                //     profile: res.data,
                // });
                console.log('ini responya ', res.data);
                this.getDataUser();
                this.props.getCurrentProfileData(profile._id);
                this.props.navigation.navigate('Cart', {
                    onNext: () => this.refresh(),
                });
            })
            .catch((err) => console.log('error get by id', err));
        // console.log('id product', idProduct);
        // console.log('id profile', profile._id);

        // this.props.navigation.navigate('Cart');
    };

    stokC = (value) => {
        this.setState({
            stok: value,
        });
    };

	UpdateRating(key) {
        this.setState({ Default_Rating: key });
	}
	
	openModal(index) {
		this.setState({ isModalOpened: true, currentImageIndex: index })
	}

	handleScroll = (event) => {
        const yAxis = event.nativeEvent.contentOffset.y;
        if (yAxis >= 0) {
            imageHeight = 165;
            this.setState({ imageHeight, marginTop: -50 });
        } else if (yAxis < 0) {
            imageHeight = Math.abs(yAxis) + 265;
            this.setState({ imageHeight, marginTop: yAxis - 150 });
        }
        this.setState({ yAxis });
    };

	render() {
		const params = this.props.navigation.state.params;
        console.log('ini params', params);
        const { isfetched } = this.state;
		let React_Native_Rating_Bar = [];
		let actionSheet;
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}
                >
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>,
            );
        }
        const FirstRoute = () => (
                <View style={styles.scene}>
					<ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                    	<Text style={styles.text}>{params.deskripsi}</Text>
					</ScrollView>
                </View>
        );
        const SecondRoute = () => (
            <View style={styles.scene}>
                <Text style={styles.text}>{params.jaminan}</Text>
            </View>
        );
        const images = [params.gambarBarang];
		return (
			<SafeAreaView style={{flex: 1}}>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle={
					this.state.yAxis > 30 ? 'dark-content' : 'light-content'
				}
			/>
			<View
				style={[
					styles.header,
					this.state.yAxis > 50 ? styles.shadow : null,
					{
						backgroundColor: `rgba(255,255,255,${
							this.state.yAxis > 50
								? 1
								: this.state.yAxis / 50
						})`,
					},
				]}
			>
			<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{position: 'absolute', left: 10, top: 30, backgroundColor: this.state.yAxis > 50 ? 'transparent' : 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50}}>
				<Feather 
					name="arrow-left" size={24} color={this.state.yAxis > 50 ? 'grey' : 'white'}
				/>
			</TouchableOpacity>
			<Text style={{left: 48, top: 13, fontSize: 18, fontWeight:'bold', color: this.state.yAxis > 50 ? 'black' : 'transparent' }}>{params.namaBarang}</Text>
			<TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} style={{position: 'absolute', right: 20, top: 30, backgroundColor: this.state.yAxis > 50 ? 'transparent' : 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50}}>
				<Feather 
					name="shopping-cart" size={24} color={this.state.yAxis > 50 ? 'grey' : 'white'}
				/>
			</TouchableOpacity>
			</View>
			
			<ScrollView
				style={styles.container}
				onScroll={this.handleScroll}
				scrollEventThrottle={8}
				showsVerticalScrollIndicator={false}
			>
			    <Swiper style={styles.sliderWrapper} showsButtons={false} showsPagination={false}>
                    <View style={styles.slide} >
                        <TouchableWithoutFeedback onPress={() => { this.openModal(0) }}>
                            <Image source={{uri: params.gambarBarang}} style={{ resizeMode: 'stretch', height: 250, width: width }} />
                        </TouchableWithoutFeedback>
                    </View>
                </Swiper>
				<View style={{flex: 1}}>
					<Text style={{fontWeight: 'bold', fontSize: 15, color: '#000', paddingHorizontal: 10, top: 8}}>{params.namaBarang}</Text>
						<View style={{top: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%'}}>
							<NumberFormat
								value={params.harga}
								displayType={'text'}
								thousandSeparator={true}
								prefix={'Rp.'}
								renderText={(value) => (
									<Text style={{fontSize: 15, fontWeight: 'bold', color: 'green', paddingHorizontal: 10}}>
										{value}/Hari
									</Text>
								)}
							/>
							<TouchableOpacity style={{flexDirection: 'row'}}>
								{React_Native_Rating_Bar}
								<Text style={styles.textStyle}>
									{this.state.Default_Rating}/
									{this.state.Max_Rating}
								</Text>
							</TouchableOpacity>
					</View>

					<Text></Text>
					<Text></Text>
					<View style={{backgroundColor: '#ddd', height: 10, width: width}} />

					<View style={{justifyContent: 'center', alignItems: 'center', height: 50, width: width, backgroundColor: 'blue'}}>
						<View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
							<TouchableOpacity>
								<Feather 
									name="thumbs-up" size={25} color='#fff'
								/>
							</TouchableOpacity>
							<Text style={{color: 'white', fontSize: 15}}>like</Text>
							<TouchableOpacity>
								<Feather 
									name="message-square" size={25} color='#fff'
								/>
							</TouchableOpacity>
							<Text style={{color: 'white', fontSize: 15}}>comment</Text>
							<TouchableOpacity>
								<Feather 
									name="share-2" size={25}  color='#fff'
								/>
							</TouchableOpacity>
							<Text style={{color: 'white', fontSize: 15}}>share</Text>
						</View>
					</View>
					
					<View style={{backgroundColor: '#ddd', height: 10, width: width}} />
					
					<View style={{justifyContent: 'center', alignItems: 'center'}}>
						<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', elevation: 5}}>
							<Text style={{fontSize: 12, fontWeight:'bold', color: 'grey'}}>QTY</Text>
							<Text style={{fontSize: 12, fontWeight:'bold', color: 'grey', left: 40, top: 5}}>STOK</Text>
							<TouchableOpacity onPress={this.handleSewaButton} style={{top: 10, backgroundColor: 'blue', borderRadius: 25, height: 50, width: 100, justifyContent: 'center', alignItems: 'center'}}>
								<Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Sewa</Text>
							</TouchableOpacity>
						</View>
						<View style={{marginTop: -15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', elevation: 5}}>
							<NumericInput
								value={this.state.stok}
								onChange={(value) =>
									this.setState({ value })
								}
								onLimitReached={(isMax, msg) =>
									console.log(isMax, msg)
								}
								totalWidth={100}
								totalHeight={30}
								iconSize={24}
								step={1}
								valueType="real"
								rounded
								textColor="blue"
								iconStyle={{ color: 'white' }}
								rightButtonBackgroundColor="blue"
								leftButtonBackgroundColor="blue"
							/>
							<Text style={{fontWeight:'bold', fontSize: 15, color: '#000', right: 50}}>{params.jml_barang}</Text>
							<Text></Text>
						</View>
						<Text></Text>
					</View>
					
					<View style={{backgroundColor: '#ddd', height: 10, width: width}} />
					
					<Text></Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('LokasiToko')} style={{justifyContent: 'center', alignItems: 'center'}}>
						<Feather name="map" size={25} color={'blue'} />
						<Text style={{paddingHorizontal: 14, fontSize: 15, justifyContent: 'flex-start', textAlign: 'justify', lineHeight: 26}}>{`${params.alamat}, Kabupaten ${params.kabupaten}, ${params.provinsi}`}</Text>
					</TouchableOpacity>
					<Text></Text>

					<View style={{backgroundColor: '#ddd', height: 10, width: width}} />

					<View style={{flex: 1, height: 450, width: width}}>
						<TabView
							renderTabBar={this._renderTabBar}
							navigationState={this.state}
							renderScene={SceneMap({
								first: FirstRoute,
								second: SecondRoute,
							})}
							onIndexChange={(index) =>
								this.setState({ index })
							}
						/>
						<TouchableOpacity onPress={() => {actionSheetRef.current?.setModalVisible(); 
						}} 
						style={{justifyContent: 'center', alignItems: 'center', top: 10}}>
							<Text style={{fontWeight: 'bold', fontSize: 15, color: 'blue'}}>Selengkapnya</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Text></Text>
				<Text></Text>
				<View style={{backgroundColor: '#ddd', height: 10, width: width}} />

				{/* Promosi */}
				<Text></Text>
				<View style={styles.row}>
					<Text style={styles.sub_heading}>Promo</Text>
						<View style={{flexDirection:'row',alignItems:'center'}}>
							<Text style={{
								color:'#cdcdcd',
								fontSize:16,
								fontWeight:'bold',
								marginRight:5
							}}>See All</Text>
						</View>
				</View>   
				{/* Penutup Promosi */}
				
                <Modal
                    visible={this.state.isModalOpened}
                    transparent={true}
                >
                    <ImageViewer
                        imageUrls={images}
                        index={this.state.currentImageIndex}
                        renderHeader={() => {
                            return (
                                <View
                                    style={{ paddingTop: 35, }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ isModalOpened: false })
                                        }}
                                        style={{ zIndex: 5, alignItems: 'center', justifyContent: 'center', right: '40%'}}
                                    >
                                        <Feather
											name="x-circle"
											size={24}
											color={'white'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </Modal>
				<ActionSheet ref={actionSheetRef}>
					<View>
						<Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
					</View>
				</ActionSheet>
			</ScrollView>
		</SafeAreaView>
		);
	}
}

Detail.propTypes = {
    getCurrentProfileData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfileData })(Detail);


const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                marginTop :                  
                (Platform.select == 'ios')
                ? - Header.HEIGHT
                : - Header.HEIGHT - 30,
				overflow: 'hidden',
            },
            android: {
                marginTop : 
                (Platform.select == 'android')
                ? - Header.HEIGHT
				: - Header.HEIGHT - 25,
				flex: 1
            }
        })
    },
    header: {
        ...Platform.select({
            ios: {
                height:
                (Platform.select == 'ios')
                    ? Header.HEIGHT
                    : Header.HEIGHT + 10,
				zIndex: 1,
				top: -20,
                alignItems: 'center',
                flexDirection: 'row',
                overflow: 'hidden'
            },
            android: {
                height:
                (Platform.select == 'android')
                    ? Header.HEIGHT
                    : Header.HEIGHT + 25,
                zIndex: 1,
                alignItems: 'center',
                flexDirection: 'row',
            }
        })
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
	},
    sliderWrapper: { 
        height: 250 
    },
	slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
	StarImage: {
        width: 25,
        height: 25,
        resizeMode: 'stretch',
    },
    textStyle: {
        fontSize: 10,
        color: '#000',
        paddingLeft: 5,
    },
    childView: {
        flexDirection: 'row',
		paddingHorizontal: 14,
		top: 10
	},
	scene: {
		flex: 1,
        backgroundColor: '#fff',
    },
    text: {
		paddingHorizontal: 14, 
		fontSize: 15, 
		justifyContent: 'flex-start', 
		textAlign: 'justify', 
		lineHeight: 26
    },
	row: {
		flexDirection:'row',
		justifyContent:'space-between'
	},
	sub_heading: {
	   fontSize: 20,
	   color:'#000',
	   fontWeight: 'bold'
   },
})
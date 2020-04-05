import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import TouchableScale from 'react-native-touchable-scale';

const widthScreen = Dimensions.get('screen').width

export default class Slider extends React.Component {
    constructor(props){
        super(props),
        this.state={
            activeIndex: 0
        }
    }

    toParent=(uri)=>{
        this.props.imgUri(uri)
    }

    _renderItem ({item, index}) {
        return (
            <Image source={{uri: item}} style={{width: widthScreen - 30, height: 160, backgroundColor: 'rgba(232, 232, 232, 1)'}} />
        );
    }
 
    render () {
        const data = [
            'https://serving.photos.photobox.com/835809569ba98e7d41a64799e0eb4f79cc2feef6daef0a37725a7026f5c4bbb346eb5f3d.jpg',
            'https://serving.photos.photobox.com/72688706c810412debc3a75f5fc098e164b657fe2009773f62238fe4ba7734c0680dc23b.jpg',
            'https://serving.photos.photobox.com/25806125290198617c0875af24ecd27b39567f8b5beffc11bb82e4b9903a5eff34277c7a.jpg',
            'https://serving.photos.photobox.com/4806103321d0fedea6dffc12872e39c5d437e226c53db1c835eedbc0d5f99301e22288c3.jpg'
        ]
        return (
            <>
                <View style={{marginTop: 20}}>
                    <TouchableScale>
                    <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={data}
                            loop
                            autoplay
                            renderItem={this._renderItem}
                            sliderWidth={widthScreen}
                            itemWidth={widthScreen-30}
                            inactiveSlideOpacity={1}
                            onSnapToItem={index=>this.toParent(data[index], this.setState({activeIndex: index}))}
                        />
                    <Pagination
                        dotsLength={data.length} 
                        dotStyle={{width: 25, height: 5, paddingHorizontal: -20}}
                        inactiveDotStyle={{width: 10, height: 10, borderRadius: 5}}
                        activeDotIndex={this.state.activeIndex}
                        containerStyle={{paddingVertical: 10}}
                        dotColor={'rgba(31, 58, 147, 1)'}
                        inactiveDotColor={'rgba(232, 232, 232, 1)'}
                        />
                    </TouchableScale>
                </View>
            </>
        );
    }
}
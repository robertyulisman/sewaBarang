import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const widthScreen = Dimensions.get('screen').width

export default class Slider extends React.Component {
    constructor(props){
        super(props),
        this.state={
            activeIndex: 0,
            isVisible: false,
            isfetched: false,
        }
    }

    toParent=(uri)=>{
        this.props.imgUri(uri)
    }

    _renderItem ({item, index}) {
        return (
            <Image source={{uri: item}} style={{width: widthScreen - 60, height: 110, borderRadius: 10, backgroundColor: 'rgba(232, 232, 232, 1)'}} />
        );
    }

    componentWillMount() {
        setTimeout(() => this.setState({ isfetched: true }), 8000);
    }
 
    render () {
        const { isfetched } = this.state;
        const data = [
            'https://serving.photos.photobox.com/835809569ba98e7d41a64799e0eb4f79cc2feef6daef0a37725a7026f5c4bbb346eb5f3d.jpg',
            'https://serving.photos.photobox.com/72688706c810412debc3a75f5fc098e164b657fe2009773f62238fe4ba7734c0680dc23b.jpg',
            'https://www.gudeg.net/cni-content/uploads/modules/posts/20161102103543.jpg',
            'https://web.kominfo.go.id/sites/default/files/Banner%20Bantu%20Masyarakat%20Tahu%20COVID-19.jpeg',
            'https://1.bp.blogspot.com/-sO5cQb1tAfI/XnAilIcRRoI/AAAAAAAACA0/4OeZpSmGvUc-gxp1eHnRWsVG08dt3XmPACLcBGAsYHQ/s1600/ART%2BWORK%2B5.png'
        ]
        return (
            <>
                <View style={{marginTop: 20}}>
                    <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched} style={{width: widthScreen - 60, height: 100, borderRadius: 10, left: '8%'}}>
                    <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={data}
                            loop
                            autoplay
                            renderItem={this._renderItem}
                            sliderWidth={widthScreen}
                            itemWidth={widthScreen - 60}
                            inactiveSlideOpacity={1}
                            onSnapToItem={index=>this.toParent(data[index], this.setState({activeIndex: index}))}
                        />
                    </ShimmerPlaceHolder>

                    <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched} style={{width: 25, height: 5, borderRadius: 5, left: '45%', top: 10}}>
                    <Pagination
                        dotsLength={data.length} 
                        dotStyle={{width: 25, height: 5}}
                        inactiveDotStyle={{width: 10, height: 10, borderRadius: 5}}
                        activeDotIndex={this.state.activeIndex}
                        containerStyle={{paddingVertical: 10}}
                        delayPressInDot={1}
                        dotColor={'rgba(31, 58, 147, 1)'}
                        inactiveDotColor={'rgba(232, 232, 232, 1)'}
                        />
                    </ShimmerPlaceHolder>
                </View>
            </>
        );
    }
}
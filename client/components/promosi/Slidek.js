import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, Platform} from 'react-native';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import TouchableScale from 'react-native-touchable-scale';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const { width: screenWidth } = Dimensions.get('window')
const entryBorderRadius = 8;

export default class Slidek extends React.Component {
    constructor(props){
        super(props),
        this.state={
            activeIndex: 0,
            isfetched: false,
            isVisible: false,
        }
    }

    // toParent=(uri)=>{
    //     this.props.imgUri(uri)
    // }

    componentWillMount() {
        setTimeout(() => this.setState({ isfetched: true }), 8000);
    }

    _renderItem ({item, index}, parallaxProps, even) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.illustration}}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    fadeDuration={500}
                    {...parallaxProps}
                />
                {/* <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>
                    { item.subtitle }
                </Text> */}
            </View>
        );
    }
    
 
    render () {
        const { isfetched } = this.state;
        const data = [
            {
                title: 'Beautiful and dramatic Antelope Canyon',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                illustration: 'https://binus.ac.id/wp-content/uploads/2020/03/banner-microsite.jpg'
            },
            {
                title: 'Earlier this morning, NYC',
                subtitle: 'Lorem ipsum dolor sit amet',
                illustration: 'https://www.belitungkab.go.id/images/banner-covid19-1.jpeg'
            },
            {
                title: 'White Pocket Sunset',
                subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
                illustration: 'https://website-cms.vivahealth.co.id/specialpromo/15/banner.jpg'
            },
        ]
        return (
            <>
                <View style={{marginTop: 20}}>
                <ShimmerPlaceHolder autoRun={true} visible={isfetched} duration={2000} style={{width: screenWidth - 60, height: screenWidth - 60, borderRadius: 8, left: '8%'}}>
                    <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={data}
                            loop
                            autoplay
                            renderItem={this._renderItem}
                            sliderWidth={screenWidth}
                            sliderHeight={screenWidth}
                            itemWidth={screenWidth - 60}
                            inactiveSlideOpacity={1}
                            hasParallaxImages={true}
                            onSnapToItem={index=> this.setState({activeIndex: index})}
                        />
                    {/* <Pagination
                        dotsLength={data.length} 
                        dotStyle={{width: 25, height: 5}}
                        inactiveDotStyle={{width: 10, height: 10, borderRadius: 5}}
                        activeDotIndex={this.state.activeIndex}
                        containerStyle={{paddingVertical: 10}}
                        dotColor={'rgba(31, 58, 147, 1)'}
                        inactiveDotColor={'rgba(232, 232, 232, 1)'}
                        /> */}
                </ShimmerPlaceHolder>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    item: {
      width: screenWidth - 60,
      height: screenWidth - 60,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    title: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: 'gray',
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: 'black'
    },
  })
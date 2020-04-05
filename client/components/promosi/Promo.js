import React from 'react'
import {
  Text,
  View,
  Image
} from 'react-native'
import Swiper from 'react-native-swiper'
import SwiperFlatList from 'react-native-swiper-flatlist';

var styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000FFF',
    width: 340,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  slide2: {
   flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000FFF',
    width: 340,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000FFF',
    width: 340,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000FFF',
    width: 340,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  slide5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000FFF',
    width: 340,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  slide6: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000FFF',
    width: 340,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  }
}

export default () => <Swiper style={styles.wrapper} autoplay height={150} autoplayDelay={2} autoplayLoop index={2}
dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
activeDot={<View style={{backgroundColor: 'rgba(31, 58, 147, 1)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}>
  <View style={styles.slide1}>
  <Image source={{uri: 'https://www.dianbalicarrental.com/wp-content/uploads/2014/09/banner-mobil.jpg'}}
         style={{height: 150, width: 350, borderRadius: 15}}
  />
  </View>
  <View style={styles.slide2}>
  <Image source={{uri: 'https://cdns.klimg.com/bola.net/library/upload/13/2016/02/harry-kane_7d91c86.jpg'}}
         style={{height: 150, width: 350, borderRadius: 15}}
  />
  </View>
  <View style={styles.slide3}>
  <Image source={{uri: 'https://project-bella-dev.s3.amazonaws.com/spree/images/1492/original/IMG_3860-banner.jpg?1564199608'}}
         style={{height: 150, width: 350, borderRadius: 15}}
  />
  </View>
  <View style={styles.slide4}>
  <Image source={{uri: 'https://artikel.pricearea.com/wp-content/uploads/2016/08/bannerwowonline.jpg'}}
        style={{height: 150, width: 350, borderRadius: 15}}
  />
  </View>
  <View style={styles.slide5}>
  <Image source={{uri: 'https://3.bp.blogspot.com/-ruLc7nTY3Fc/V06ipb8bRmI/AAAAAAAAMP4/vAxnS88_OBYgC7si0aEJRfy1yUi0mfZHQCLcB/s640/Tari%2BWIDYA%2BSARASWATI%2BTari%2BKebesaran%2BDinas%2BPendidikan%2BKabupaten%2BBuleleng%2BMengawali%2BPembukaan%2BPameran%2BBuleleng%2BEducation%2BExpo.jpg'}}
        style={{height: 150, width: 350, borderRadius: 15}}
  />
  </View>
  <View style={styles.slide6}>
  <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSVYoe1byk6MFwOntapkxjaGw8k1tLD2c1PahnSW3J3ax29PCZm'}}
        style={{height: 150, width: 350, borderRadius: 15}}
  />
  </View>
</Swiper>

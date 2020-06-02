import { StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window')
const DEVICE_WIDTH = Dimensions.get('window').width;
const {screenWidth} = Dimensions.get('window')

export  default StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1',
        flex: 1,
    },
    container1: {
        position:'relative',
        flex: 1
    },
    postHolder: {
        alignSelf: 'center',
        height: 250,
        width: width,
        backgroundColor: 'white',
        marginTop: 5,
        borderBottomWidth: 10,
        borderColor: '#ddd',
    },
    iconWrap: {
        width: 20,
        alignItems: 'center',
        padding: 5,
        margin: 10.5,
    },
    postImg: {
        height: 250,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    postContent: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    postUserPic: {
        height: 45,
        width: 45,
        borderRadius: 20,
    },
    postUserName: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    alamat: {
        fontSize: 13,
        color: 'grey',
        paddingLeft: 10,
    },
    hairline: {
        backgroundColor: '#A2A2A2',
        height: 0.5,
        width: width - 23,
        marginTop: 10,
        margin: 11,
    },
    up: {
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'blue',
    },
    safe_area_view: {
        flex: 1
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        backgroundColor: 'blue',
      },
      fake_icon_box: {
        backgroundColor: 'blue',
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      scroll_view: {
        flex: 1,
        top: 5
      },
      fake_post: {
        height: 250,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 8
      },
      personal_card_container: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        zIndex:10,
        elevation: 3,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: '#cccccc',
        marginTop: 5
      },
      image_container: {
        position: 'relative',
        overflow: 'hidden',
      },
      image: {
        flex:1, 
        width:null, 
        height: null
      },
      cta_container: {
        position:'relative'
      },
      text: {
        textAlign: 'center',
        fontSize: 14, 
        fontWeight: 'bold'
      },  
      icon_container: {
        width: 32,
        height: 32,
        borderRadius: 32,
        backgroundColor: 'blue',
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },  
      scroll_view1: {
        flexDirection: 'row',
      },
      fake_card: {
        width: 100,
        height: 170,
        backgroundColor: '#dddddd',
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 16,
      },
      fake_card_ghost: {
        backgroundColor:'white',
        marginLeft: 10,
        borderWidth: 0,
        width: 100,
        height: 170
      },
      cardFeed: {
        alignSelf:"center",
        width: screenWidth - 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      },
      imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
      },
});

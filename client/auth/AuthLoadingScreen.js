import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View, AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from '../redux/actions/authAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setAuthToken from '../utils/setAuthToken';

class AuthLoadingScreen extends Component {
    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        // const decoded = jwt_decode(AsyncStorage.jwtToken);

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        //
        if (jwtToken) {
            const userData = jwt_decode(jwtToken);
            // //console.log('exp', userData.exp);
            // const userData = decoded;
            // set auth token header auth
            setAuthToken(jwtToken);
            // decode token and get user info and exp

            // set user and isAuthenticated
            this.props.setCurrentUser(userData);

            const currentime = Date.now() / 1000;
            // console.warn({
            //   currenttime: `${currentime}`,
            //   expTime: `${userData.exp}`
            // });
            if (userData.exp < currentime) {
                alert('time out, please login again');
                // this.props.logoutUser();
                // this.props.clearCurrentProfile();
                return this.props.navigation.navigate('Login');
            }
            this.props.navigation.navigate('Home');
        } else {
            this.props.navigation.navigate('Login');
        }
    };

    render() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}
            >
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

AuthLoadingScreen.propTypes = {
    setCurrentUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,

    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    setCurrentUser,
    logoutUser,
})(AuthLoadingScreen);

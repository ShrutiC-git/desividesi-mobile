import React from 'react';
import Home from './HomeComponent';
import Catalogue from './CatalogueComponent';
import ItemDetail from './ItemDetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text, ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchItems, fetchComments, fetchPromos, fetchLeaders } from './redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchItems: () => dispatch(fetchItems()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style=
            {styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.jpeg')}
                        style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Deshi Videshi</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);



const CatalogueNavigator = createStackNavigator({
    Catalogue: { screen: Catalogue, },
    ItemDetail: { screen: ItemDetail }
},
    {
        initialRouteName: 'Catalogue',
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#1D1918'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerLeft: () => <Icon name='menu'
                size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />

        })
    });

const HomeNavigator = createStackNavigator({
    Home: { screen: Home },
}, {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#1D1918',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerLeft: () => <Icon name='menu'
                size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    });

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact },
}, {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#1D1918',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerLeft: () => <Icon name='menu'
                size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    });

const AboutNavigator = createStackNavigator({
    About: { screen: About },
}, {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#1D1918'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerLeft: () => <Icon name='menu'
                size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })

    });

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation },
}, {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#1D1918'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerLeft: () => <Icon name='menu'
                size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })

    });

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites },
    ItemDetail: { screen: ItemDetail }
}, {
        initialRouteName: 'Favorites',
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#1D1918'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerLeft: () => <Icon name='menu'
                size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    });

const LoginNavigator = createStackNavigator({
    Login: { screen: Login },

}, {
        initialRouteName: 'Login',
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#1D1918'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerLeft: () => <Icon name='menu'
                size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    });


const MainNavigator = createDrawerNavigator({

    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },

    Home: {
        screen: HomeNavigator,
        navigationOptions: { //we had defaultNavigationOption earlier -- it was not working, so we switched to navigationOptions
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Catalogue: {
        screen: CatalogueNavigator,
        navigationOptions: {
            title: 'Catalogue',
            drawerLabel: 'Catalogue',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },

    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }

    },

    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />

            )
        }
    },

    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve a Spot!',
            drawerLabel: 'Reserve a Spot!',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='location-arrow'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />

            )
        }
    },

    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />

            )
        }
    },


},
    {
        initialRouteName: 'Home',
        drawerBackgroundColor: '#E1B0A6',
        contentComponent: CustomDrawerContentComponent
    });

const Navigator = createAppContainer(MainNavigator);


class Main extends React.Component {


    componentDidMount() {
        this.props.fetchItems();
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromos();
        
        NetInfo.fetch()
            .then((connectionInfo) => {
                ToastAndroid.show('Initial Network Connectivity Type: ' + connectionInfo.type + ', strength: ' + connectionInfo.details.strength + ' is connection available? ' + connectionInfo.isWifiEnabled,
                    ToastAndroid.LONG)
            });

        //NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.addEventListener(this.handleConnectivityChange);
    }

    componentWillUnmount() {
        //NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now on wifi', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to cellular mobile network', ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have an unknown connection', ToastAndroid.LONG);
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <View style={{
                flex: 1, backgroundColor: 'beige', paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <Navigator />
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#ab5c',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { CheckBox, Input, Icon, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';
import { NavigationContainer } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';

class LoginTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            remember: false
        }
    }
    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({ userName: userinfo.userName });
                    this.setState({ passWord: userinfo.passWord });
                    this.setState({ remember: true });
                }
            })
    }
    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    userName: this.state.userName,
                    passWord: this.state.passWord
                })
            )
                .then(console.log('This is stored with the app'))
                .catch((error) => console.log('Could not save user info', error));
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
                .then(console.log('This will not be remembered'))
                .catch((error) => console.log('Could not delete info', error));
        }
    }

    static navigationOptions = {
        title: 'Login',
        //we removed tabBarIcon navigation Option from here, and put it into the tab.screen
    }

    render() {
        return (
            <View style={styles.display}>
                <Input
                    placeholder='Username'
                    leftIcon={{
                        type: 'font-awesome',
                        name: 'user-o',

                    }}
                    onChangeText={(userName) => this.setState({ userName })}
                    value={this.state.userName}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry={true}
                    leftIcon={{
                        type: 'font-awesome',
                        name: 'key',

                    }}
                    onChangeText={(passWord) => this.setState({ passWord })}
                    value={this.state.passWord}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        icon={<Icon name='sign-in' type='font-awesome' color='white' size={24} />}
                        buttonStyle={{
                            backgroundColor: 'lightcoral'
                        }}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title='Register'
                        clear
                        icon={<Icon name='user-plus' type='font-awesome' color='white' size={24} />}
                        titleStyle={{ color: 'white' }}
                        buttonStyle={{
                            backgroundColor: '#FFC300'
                        }}
                    />
                </View>
            </View>
        );
    }
}



class RegisterTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            firstName: '',
            lastName: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.jpeg'
        }
    }

    static navigationOptions = {
        title: 'Register',
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        //const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if (cameraPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3] });
            if (!capturedImage.cancelled) {
                this.processImageCamera(capturedImage.uri)
            }
        }
    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3] });
            if (!capturedImage.cancelled) {
                this.processImageGallery(capturedImage.uri)
            }
        }
    }

    processImageGallery = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                { resize: {width: 400}},
                { rotate: 180 }
            ],
            { format: 'png' }
        );
        this.setState({ imageUrl: processedImage.uri })
    }

    processImageCamera = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                { resize: { width: 400 } },
                { rotate: 90 }
            ],
            { format: 'png' }
        );
        this.setState({ imageUrl: processedImage.uri })
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo',
                JSON.stringify({
                    userName: this.state.userName,
                    passWord: this.state.passWord
                }))
                .catch((error) => console.log('Could not save user info ' + error))
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.display}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: this.state.imageUrl }}
                            loadingIndicatorSource={require('./images/logo.jpeg')}
                            style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                            containerStyle={styles.buttonleft} />
                        <Button 
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                            containerStyle={styles.buttonright}/>
                    </View>
                    <Input
                        placeholder='Username'
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'user-o',
                        }}
                        onChangeText={(userName) => this.setState({ userName })}
                        value={this.state.userName}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder='Password'
                        secureTextEntry={true}
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'key',
                        }}
                        onChangeText={(passWord) => this.setState({ passWord })}
                        value={this.state.passWord}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder='Firstname'
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'user-o'
                        }}
                        onChangeText={(firstName) => this.setState({ firstName: firstName })}
                        value={this.state.firstName}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder='Lastname'
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'user-o'
                        }}
                        onChangeText={(lastName) => this.setState({ lastName: lastName })}
                        value={this.state.lastName}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'envelope-o'
                        }}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={<Icon name='user-plus' type='font-awesome' color='white' size={24} />}
                            buttonStyle={{
                                backgroundColor: 'lightcoral'
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}
/* 
const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
},  
{
    tabBarOptions: {
      activeBackgroundColor: '#F3AC59', 
      inactiveBackgroundColor: '#E8CFB2',
      activeTintColor: 'white',
      inactiveTintColor: 'gray'
    }
}) */

const tab = createBottomTabNavigator();

function Login() {
    return (
        <NavigationContainer>
            <tab.Navigator
                initialRouteName='Login'
                tabBarOptions={{
                    activeBackgroundColor: '#F3AC59',
                    inactiveBackgroundColor: '#E8CFB2',
                    activeTintColor: '#FFFFFF',
                    inactiveTintColor: '#808080'
                }}
            >
                <tab.Screen name="Login" component={LoginTab}
                    options={{
                        tabBarIcon: ({ tintcolor }) => (
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ color: tintcolor }}
                            />
                        )
                    }} />
                <tab.Screen name="Register" component={RegisterTab}
                    options={{
                        tabBarIcon: ({ tintcolor }) => (
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ color: tintcolor }}
                            />
                        )
                    }} />
            </tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    display: {
        alignItems: 'center',
        justifyContent: 'center',
        //margin: 20
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 10,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
        marginLeft: 10,
        width: 80,
        height: 60
    },
    buttonleft:{
        marginLeft: 30
    },
    buttonright:{
        marginLeft: 40
    }
});

export default Login;
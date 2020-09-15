import React from 'react';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ListItem } from 'react-native-elements';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from './redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        items: state.items,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (itemId) => dispatch(deleteFavorite(itemId))
});

class Favorites extends React.Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation


        const renderMenuItem = ({ item, index }) => {

            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite',
                            'Are you sure you want remove ' + item.type + ' from favorites?',
                            [

                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                    onPress: () => console.log(item.type + ' not deleted')
                                },
                                {
                                    text: 'Yes',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                },
                            ],
                            { cancelable: false }
                        );

                    },
                }
            ];

            return (
                <Swipeout
                    right={rightButton}
                    buttonWidth={150}
                >
                    <Animatable.View animation='zoomInDown' duration={3000} delay={1000}>
                        <ListItem
                            key={index}
                            title={item.type}
                            subtitle={item.description}
                            hideChevron={true}
                            onPress={() => navigate('ItemDetail', { itemId: item.id })}
                            leftAvatar={{ source: { uri: baseUrl + item.image } }}
                        />
                    </Animatable.View>
                </Swipeout>

            );
        }

        if (this.props.items.isLoading) {
            return (
                <Loading />
            );
        }

        else if (this.props.items.errMess) {
            return (
                <View>
                    <Text>{this.props.items.isLoading}</Text>
                </View>
            );
        }

        else {
            return (
                <View>
                    <FlatList
                        data={this.props.items.items.filter(item => this.props.favorites.some(ele => ele === item.id))}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    backGround: {
        color: '#AE9CB3',

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
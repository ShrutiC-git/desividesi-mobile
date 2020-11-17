import React from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, TextInput, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from './redux/ActionCreators';
import Stars from 'react-native-stars';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        items: state.items,
        comments: state.comments,
        favorites: state.favorites,
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (itemId) => dispatch(postFavorite(itemId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});


function RenderItem(props) {
    const item = props.item;

    handleViewRef = ref => this.view = ref;

    const recognizeDragLeft = ({ moveX, moveY, dx, dy }) => {
        if (dx > 100) {
            return true;
        }
        else {
            return false;
        }
    };

    const recognizeDragRight = dx => {
        if (dx < -200) {
            return true;
        }
        else {
            return false;
        }
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) => {
            return true;
        },
        onPanResponderEnd: (event, gestureState) => {
            if (recognizeDragLeft(gestureState)) {
                Alert.alert('Add to favorites!', 'Do you want to add ' + item.type + ' to your favorites?',
                    [
                        {
                            text: 'Cancel',
                            type: 'cancel',
                            onPress: () => console.log('Cancelled')
                        },
                        {
                            text: 'Yes',
                            onPress: () => { props.favorite ? console.log('Already added as favorite') : props.onPress() }
                        }
                    ],
                    {
                        cancelable: true
                    })
            }

            else if (recognizeDragRight(gestureState)) {
                props.postComment();
            }
            else {
                return true;
            }


        },
        onPanResponderGrant: () => {
            this.view.pulse(500)
                .then(endState => console.log(endState.finished ? 'finished' : 'Cancelled'))
        },
    });

    const shareItem = (title,message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }


    if (item != null) {
        return (
            <Animatable.View animation="fadeInDown" delay={1000} duration={2000}
                {...panResponder.panHandlers}
                ref={this.handleViewRef}
                useNativeDriver={true}>
                <Card>
                    <Card.Title>{item.type}</Card.Title>
                    <Card.Image source={{ uri: baseUrl + item.image }} />
                    <Text style={{ marginBottom: 10 }}>
                        {item.description}
                    </Text>
                    <View style={styles.row}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already added as favorite') : props.onPress()} />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='purple'
                            onPress={() => props.onModal()}
                        />
                        <Icon 
                            raised
                            reversed
                            name='share'
                            type='font-awesome'
                            color='#45B39D'
                            onPress = {() => shareItem(item.type, item.description, baseUrl+item.image)}
                            />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (
            <View></View>
        );
    }
}

function RenderComments(props) {

    const comments = props.comment;
    const renderCommentItem = ({ item }) => {
        return (
            <View
                style={{ margin: 10 }}
            >
                <Text style={{
                    fontSize: 14
                }}>
                    {item.comment}
                </Text>

                <View style={{
                    backgroundColor: 'gray',
                    alignItems: 'flex-start'
                }}>
                    <Stars
                        display={item.rating}
                        spacing={4}
                        starSize={15}
                        starStyle={
                            color = 'white'
                        }
                    />
                </View>



                <Text style={{ fontSize: 12 }}>
                    {'-- ' + item.author + ', ' + item.date}
                </Text>
            </View>
        );
    }

    return (
        <Animatable.View animation="fadeInUp" delay={1000} duration={2000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>
    );
}


class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            rating: '',
            author: '',
            comment: '',
        }
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
    }

    static navigationOptions = {
        title: 'Item Detail'
    }
    render() {
        const itemId = this.props.navigation.getParam('itemId', '');

        return (
            <ScrollView style={{ backgroundColor: 'gray' }}>
                <RenderItem item={this.props.items.items[+itemId]}
                    favorite={this.props.favorites.some(ele => ele === itemId)}
                    onPress={() => this.markFavorite(itemId)}
                    onModal={() => this.toggleModal()}
                />
                <RenderComments comment={this.props.comments.comments.filter((comment) => comment.dishId === itemId)} />

                <Modal
                    animationType={'fade'}
                    transparent={false}
                    visible={this.state.isModalOpen}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View>
                        <Text style={styles.modalHeader}>Submit your Rating</Text>

                        <Rating
                            type='heart'
                            review={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
                            ratingCount={5}
                            onFinishRating={(rating) => this.setState({ rating: rating })}
                            showRating={true}
                            fractions={0}
                            imageSize={50}
                            startingValue={0}
                        />

                        <View style={styles.modalRow}>
                            <Icon
                                raised
                                name='user'
                                type='font-awesome'
                                color='black'
                            />
                            <TextInput
                                style={styles.fieldHeader}
                                placeholder='Author'
                                onChangeText={(input) => this.setState({ author: input })}
                            />
                        </View>
                        <View style={styles.modalLine} />
                        <View style={styles.modalRow}>
                            <Icon
                                raised
                                name='comment-o'
                                type='font-awesome'
                                color='black'
                            />
                            <TextInput
                                style={styles.fieldHeader}
                                placeholder='Comment'
                                onChangeText={(input) => this.setState({ comment: input })}
                            />
                        </View>
                        <View style={styles.modalLine} />
                        <View style={styles.spaceBottom}></View>
                        <Button
                            color='lightcoral'
                            title='Submit'
                            marginBottom='20'
                            onPress={() => this.handleSubmit(itemId)} />

                        <View style={styles.spaceBottom}></View>
                        <Button
                            onPress={() => this.toggleModal()}
                            color='gray'
                            title='Cancel' />

                    </View>
                </Modal>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },

    modalRow: {
        marginLeft: 5,
        flexDirection: 'row'
    },

    modalHeader: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'lightcoral',
        color: 'white',
        marginBottom: 20
    },

    modalText: {
        fontSize: 20
    },

    modalLine: {
        borderWidth: 0.5,
        borderColor: 'gray',
        marginLeft: 10,
        marginRight: 10
    },
    fieldHeader: {
        color: 'gray',
        marginLeft: 15,
        marginRight: 10
    },
    spaceBottom: {
        marginBottom: 20,

    }


})

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);


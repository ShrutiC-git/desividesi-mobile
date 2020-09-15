import React from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        items: state.items,
    }
}

class Catalogue extends React.Component {

    static navigationOptions = {
        title: 'Catalogue'
    }
    render() {
        const renderCatalogueItem = ({ item, index }) => {
            return (
                <Animatable.View animation='tada' duration={2000} delay={100}>
                    <Tile
                        key={index}
                        title={item.type}
                        caption={item.description}
                        featured
                        onPress={() => navigate('ItemDetail', { itemId: item.id })}
                        imageSrc={{ uri: baseUrl + item.image }}
                    />
                </Animatable.View>
            );
        }

        const { navigate } = this.props.navigation;

        if (this.props.items.isLoading) {
            return (
                <Loading />
            );
        }

        else if (this.props.items.errMess) {
            return (
                <View>
                    <Text>
                        {this.props.items.errMess}
                    </Text>
                </View>
            );
        }

        else {
            return (
                <FlatList
                    data={this.props.items.items}
                    renderItem={renderCatalogueItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }

}

export default connect(mapStateToProps)(Catalogue);
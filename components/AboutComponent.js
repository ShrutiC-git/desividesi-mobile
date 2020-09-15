import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

class About extends React.Component {

    static navigationOptions = {
        title: 'About Us'
    }

    render() {

        const renderLeader = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                />
            );

        };

        if (this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <Card title="Our History">
                        <Text style={{
                            fontFamily: 'Roboto',
                            fontWeight: 'normal',
                        }}>
                            {`Designed in 2020, Deshi Videshi quickly established itself as a shopping-media icon, par excellence in the world. With its unique brand of world fusion and world integration, it enjoys patronage from people all over the world. It brings its patrons cultures from everywhere around the globe.
                \nThe platform traces its humble beginnings to people Shruti met in Michigan. Shruti is very close to the designers listed on the platform.`}
                        </Text>
                    </Card>
                    <Card title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }

        else if (this.props.leaders.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Card title="Our History">
                            <Text style={{
                                fontFamily: 'Roboto',
                                fontWeight: 'normal',
                            }}>
                                {`Designed in 2020, Deshi Videshi quickly established itself as a shopping-media icon, par excellence in the world. With its unique brand of world fusion and world integration, it enjoys patronage from people all over the world. It brings its patrons cultures from everywhere around the globe.
                \nThe platform traces its humble beginnings to people Shruti met in Michigan. Shruti is very close to the designers listed on the platform.`}
                            </Text>
                        </Card>
                        <Card title='Corporate Leadership'>
                            <Text>
                                {this.props.leaders.errMess}
                            </Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {
            return (
                <View style={{
                    flex: 1
                }} >
                    <Animatable.View animation="fadeInDown" delay={1000} duration={2000}>
                    <Card title="Our History">
                        <Text style={{
                            fontFamily: 'Roboto',
                            fontWeight: 'normal',

                        }}>
                            {`Designed in 2020, Deshi Videshi quickly established itself as a shopping-media icon, par excellence in the world. With its unique brand of world fusion and world integration, it enjoys patronage from people all over the world. It brings its patrons cultures from everywhere around the globe.
                    \nThe platform traces its humble beginnings to people Shruti met in Michigan. Shruti is very close to the designers listed on the platform.`}
                        </Text>
                    </Card>
                    </Animatable.View>
                    <View style={{
                        flex: 1,
                        paddingBottom: 100
                    }}>
                        {/* <Animatable.View animation="bounce" delay={1000} duration={2000}> */}
                            <Card title="Corporate Leadership">
                                <FlatList
                                    data={this.props.leaders.leaders}
                                    renderItem={renderLeader}
                                    keyExtractor={item => item.id.toString()} />
                            </Card>
                        {/* </Animatable.View> */}
                    </View>

                </View>
            );
        }
    }

}

export default connect(mapStateToProps)(About);
import React from 'react';
import { ScrollView, Text, View, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        items: state.items,
        promotions: state.promotions,
        leaders: state.leaders,
    }
}

function RenderItem(props) {

    const item = props.item;

    if (props.isLoading) {
        return (
            <Loading />
        );
    }

    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }

    else {
        if (item != null) {
            return (
                /* How WE WERE RENDERING EARLIER!
                    <Card
                    title={item.type}
                    image={{ uri: baseUrl + item.image }}>
                    <Text>{item.description}</Text>
                </Card> */
                <Card title={
                    <View>
                        <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                            {item.type}
                        </Text>
                    </View>
                }
                    image={{ uri: baseUrl + item.image }}
                >
                    <Text>{item.description}</Text>
                </Card>

            );
        }

        else {
            return (
                <View></View>
            );
        }
    }

}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    static navigationOptions = {
        title: 'Home'
    };

    componentDidMount() {
        this.animate();
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 8,
                duration: 15000,
                easing: Easing.linear
            }

        ).start(() => this.animate())
    }

    render() {

        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 7],
            outputRange: [800, 400, 0, -400, -800]
        });
        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 1.5, 3.5, 5.5, 7],
            outputRange: [850, 450, 0, -450, -850]
        });
        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [900, 500, 0, -500, -900]
        });


        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor:'#FF5733' }}>
                {/* <ScrollView style={{
                    backgroundColor: 'gray',
                }}> */}

                <Animated.View style={{ width: '100%', transform: [{ translateY: xpos1 }] }}>
                    <RenderItem
                        item={this.props.items.items.filter((item) => item.featured)[0]}
                        isLoading={this.props.items.isLoading}
                        errMess={this.props.items.errMess}
                    />
                </Animated.View>


                <Animated.View style={{ width: '100%', transform: [{ translateY: xpos2 }] }}>
                    <RenderItem
                        item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                        isLoading={this.props.promotions.isLoading}
                        errMess={this.props.promotions.errMess}
                    />
                </Animated.View>


                <Animated.View style={{ width: '100%', transform: [{ translateY: xpos3 }] }}>
                    <RenderItem
                        item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                        isLoading={this.props.leaders.isLoading}
                        errMess={this.props.leaders.errMess}
                    />
                </Animated.View>

                {/* </ScrollView> */}
            </View>
        );
    }
}

export default connect(mapStateToProps)(Home);
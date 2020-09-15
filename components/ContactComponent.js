import React from 'react';
import { Card, Button, Icon } from 'react-native-elements';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
//import {MailComposer} from 'expo';
import * as MailComposer from 'expo-mail-composer';

class Contact extends React.Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['shrutichaturvedi16.sc@gmail.com'],
            subject: 'Enquiry for Desi Videsi',
            body: 'This is regarding an enquiry for ----- available at Desi Videsi e-store'
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: 'gray', flex: 1 }}>
                <Animatable.View animation="fadeIn" duration={2000}>
                    <Card title="Contact Information">
                        <Text style={{ margin: 10 }}>
                            {`121, Clear Water Bay Road
                    \nClear Water Bay, Kowloon
                    \nHONG KONG
                    \nTel: +852 1234 5678
                    \nFax: +852 8765 4321
                    \nEmail:confusion@food.net`}
                        </Text>
                        <Button
                            title='Send us an enquiry'
                            onPress={() => this.sendMail()}
                            buttonStyle={{backgroundColor:'lightcoral'}}
                            icon={<Icon name='envelope-o' type='font-awesome' color='lightcoral'/>}
                            />
                    </Card>
                </Animatable.View>
            </View>
        );
    }
}

export default Contact;
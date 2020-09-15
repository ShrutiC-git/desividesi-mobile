import React from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Animatable from 'react-native-animatable';
import * as Calendar from 'expo-calendar';

class Reservation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visitors: 1,
            interested: true,
            date: '',
            showModal: false

        }
    }

    static navigationOptions = {
        title: 'Reserve a Spot!'
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    resetForm() {
        this.setState({
            visitors: 1,
            interested: true,
            date: ''
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to ahow notifications');
            }
        }
        return permission;
    }


    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();

        //Notifications.presentLocalNotificationAsync
        Notifications.presentNotificationAsync({
            title: 'Your Visit to Desi Videsi',
            body: 'Visit to Desi Videsi ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: 'lightcoral'

            }
        });
    }



    handleConfirm() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation OK?',
            `Number of Visitors: ${this.state.visitors}
            \nInterested in Buying? ${this.state.interested ? 'Yes' : 'No'}
            \nDate of Visit: ${this.state.date}
            `,
            [
                {
                    text: 'Cancel',
                    type: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.addReservationToCalendar(this.state.date);
                        this.resetForm();
                    }

                },
            ],
            { cancelable: false }
        )

    }

    obtainCalendarPermission = async () => {
        getCalendarPermission = await Permissions.askAsync(Permissions.CALENDAR)
        return getCalendarPermission;
    }

    getDefaultCalendarSource = async () => {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    addReservationToCalendar = async (date) => {
        getCalendarPermission = this.obtainCalendarPermission
        if (getCalendarPermission.status === 'granted') {
            console.log('At step 1, permission obtained')
            const defaultCalendarSource = await this.getDefaultCalendarSource
            
            const newCalendarID = await Calendar.createCalendarAsync({
                title: 'Expo Calendar',
                color: 'blue',
                entityType: Calendar.EntityTypes.EVENT,
                sourceId: defaultCalendarSource.id,
                source: defaultCalendarSource,
                name: 'internalCalendarName',
                ownerAccount: 'personal',
                accessLevel: Calendar.CalendarAccessLevel.OWNER,
            });

            const event = Calendar.createEventAsync(
                newCalendarID,
                {
                    title: 'Desi Videsi Visit',
                    startDate: new Date(Date.parse(date)),
                    endDate: new Date(Date.parse(date)),
                    allDay: false,
                    location: '410 Bellevue Place',
                    timeZone: 'Asia/Hong_Kong'
                }
            )
            
        }
    }

    render() {

        return (
            <ScrollView style={{ backgroundColor: '#DAF7A6' }}>
                <Animatable.View animation="fadeIn" duration={2000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Number of Visitors
                </Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.visitors}
                            onValueChange={(itemValue, itemIndex) => this.setState({ visitors: itemValue })}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Interested in Buying?
                    </Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.interested}
                            trackColor={{
                                true: "green",
                                false: "red"
                            }}
                            onValueChange={(value) => this.setState({ interested: value })}
                        >
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            When are you visiting?
                        </Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            mode='date'
                            format='YYYY-MM-DD'
                            placeholder='select date'
                            minDate='2020-08-09'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 35
                                }
                            }}
                            onDateChange={(date) => this.setState({ date: date })}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            title='Confirm'
                            color='#2196F3'
                            /* onPress={() => this.handleConfirm()} */
                            onPress={() => this.handleConfirm()}
                            accessibilityLabel='Learn more about this button'
                        />
                    </View>
                    <Modal
                        animationType={'fade'}
                        transparent={false}
                        visible={this.state.showModal}
                        onDismiss={() => { this.toggleModal(); this.resetForm() }} //I STILL HAVE TO UNDERSTAND THE USE FOR THIS
                        onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                    >
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}> Your Reservation </Text>
                            <Text style={styles.modalText}>Number of Visitors: {this.state.visitors}</Text>
                            <Text style={styles.modalText}>Interested in Buying? {this.state.interested ? 'Yes' : 'No'}</Text>
                            <Text style={styles.modalText}>Date of Visiting {this.state.date}</Text>
                            <Button onPress={() => { this.toggleModal(); this.resetForm() }}
                                color='lightcoral' title='Close' />
                        </View>
                    </Modal>
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
        fontWeight: 'bold'
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'lightcoral',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 20,
        margin: 10
    }

});



export default Reservation;
import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, FlatList, Image } from "react-native";
import Colors from "../../constants/Colors";
import { customStyles, styles } from "../../constants/styles";
import { Text, Card, Button } from "native-base";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import OrderCard from "../../components/OrderCard";

class OrderScreen extends Component {
    state = {
        activeButton: 'all'
    }
    static navigationOptions = ({ navigation }) => {
        return {
          header: null,
          title: '',
          headerStyle: {
            backgroundColor: Colors.headerColor,
          },
          headerTintColor: Colors.headerTintColor,
          headerTitleStyle: customStyles.headerStyle,
        };
      };

      toggleActiveButton = activeButton => {
          this.setState({
                activeButton
          })
      }
      _trackOrder = () => {
          console.log('tracking')
      }
    render() {
        return (
            <SafeAreaView style={{display:'flex', flex: 1}}>
                <View style={{display:'flex', flex: 1}}>
                    <View style={{...styles.AppContainer, ...styles.addMargin, paddingTop: 40}}>
                        <View>
                            <Text style={styles.orderScreenName}>Hi Charles,</Text>
                            <Text style={styles.orderScreenShortTitle}>Orders are ready to track</Text>
                        </View>
                        <View style={styles.orderScreenButtonPill}>
                            <Button style={{...styles.orderScreenButton,borderWidth: 1, borderColor: Colors.secondaryColor,
                                   backgroundColor: this.state.activeButton === 'all' ? Colors.secondaryColor: '#fff'}}
                                   onPress={() => this.toggleActiveButton('all')} >
                                <Text
                                    style={{...styles.orderScreentButtonText,
                                        color: this.state.activeButton === 'all' ?  '#fff' : Colors.secondaryColor}}
                                >All</Text>
                            </Button>
                            <Button
                                style={{...styles.orderScreenButton,borderColor: Colors.secondaryColor, borderRightWidth: 1,
                                     backgroundColor: this.state.activeButton === 'pending' ? Colors.secondaryColor: '#fff'}}
                                     onPress={() => this.toggleActiveButton('pending')}
                            >
                                <Text
                                    style={{...styles.orderScreentButtonText,
                                        color: this.state.activeButton === 'pending' ?  '#fff' : Colors.secondaryColor}}
                                >Pending</Text>
                            </Button>
                            <Button
                                style={{...styles.orderScreenButton,borderColor: Colors.secondaryColor, borderRightWidth: 1,
                                     backgroundColor: this.state.activeButton === 'on way' ? Colors.secondaryColor: '#fff'}}
                                     onPress={() => this.toggleActiveButton('on way')}
                            >
                                <Text
                                    style={{...styles.orderScreentButtonText,
                                        color: this.state.activeButton === 'on way' ?  '#fff' : Colors.secondaryColor}}
                                >On Way</Text>
                            </Button>
                        </View>
                        <ScrollView style={{display:'flex', flex: 1}}>
                            <OrderCard 
                                date={new Date()} 
                                driver="Jason Header"
                                recipient="Charles Onuorah"
                                orderNumber={'DHS745333'} pickup={'103, Bushwik Avenue'}
                                destination={'74, Savoy suites'} _trackOrder={() => this._trackOrder()} status={'on way'} />
                            <OrderCard 
                                date={new Date()} 
                                recipient="Ekeh Lina"
                                pickup={'Sandfill, Lekki, lagos'} destination={'chris Idowu,Ejibo, lagos'}
                                orderNumber={'DHS745333'} status={'pending'} _trackOrder={() => this._trackOrder()} />
                            <OrderCard
                                date={new Date()} 
                                driver="Jason Header"
                                recipient="Onuorah Chinonyelum"
                                pickup={'Sandfill, Lekki, lagos'} destination={'chris Idowu,Ejibo, lagos'}
                                _trackOrder={() => this._trackOrder()}
                                orderNumber={'DHS745333'} status={'fulfilled'} />
                        </ScrollView>
                    </View>
                    
                </View>
            </SafeAreaView>
        );
    }
}

export default OrderScreen;
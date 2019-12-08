import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, FlatList, Image, AsyncStorage } from "react-native";
import Colors from "../../constants/Colors";
import { customStyles, styles } from "../../constants/styles";
import { Text, Card, Button } from "native-base";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { db } from "../../firebase";
import { connect } from "react-redux";
import * as actions from "../../actions";
import OrderCard from "../../components/OrderCard";

class OrderScreen extends Component {
    state = {
        activeButton: 'all',
        orders: [],
        filteredResults: [],
        email: '',
        loaded: false
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
      getUser = () => {
          return this.state.email
      }
      static getDerivedStateFromProps(nextProps, state){
          if(nextProps.activeLink){
              return {...state, activeButton: nextProps.activeLink}
          }
          return null
      }
      getCurrentUser = async () => {
        const account = await AsyncStorage.getItem('user')
        console.log('account', account)
        const user = JSON.parse(account)
        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber
        }, () => {
            db.collection('orders').where('senderEmail', '==', this.state.email)
            .onSnapshot(docSnapshot => {
                if(docSnapshot.empty){
                    this.props.hideSpinner()
                    this.setState({
                        loaded: true
                    })
                    console.log('no matching documents')
                     return ;
                }
                const orders = []
   
                docSnapshot.forEach((doc) => {
                    orders.push({
                        id: doc.id,
                        ...doc.data()
                    })
                    
                })
                this.setState({
                    orders: [ ...orders],
                    loaded: true,
                }, () => {
                    this.props.hideSpinner()
                    this.mapOrdersToDriver()})
            })
        })
        
    }
      componentDidMount(){
          this.props.showSpinner()
          this.getCurrentUser()
            
      }
        mapOrdersToDriver = async () => {
            const newOrders = [];
            let driver = {}
            for(order of this.state.orders){
                console.log('order >>>', order.assignedTo)
                try{
                    const driverDoc = await db.doc(`/drivers/${order.assignedTo}`).get()
                    if(driverDoc.exists){
                        driver = {
                            driverId: driverDoc.id,
                            ...driverDoc.data()
                        }
                        newOrders.push({
                            ...order,
                            driverDetails: {...driver}
                        })
                    }else{
                        newOrders.push({
                            ...order,
                            driverDetails: {}
                        })
                    }
                } catch(err){
                    newOrders.push({
                        ...order,
                        driverDetails: {}
                    })
                    console.log('error, ', err)
                }
                
            }
            this.setState({
                orders: [...newOrders]
            }, () => this.filerResults())
      }
      sortResultInDescending = (item1 , item2) => {
          if(new Date(item1.createdAt).getTime() > new Date(item2).getDate()){
              return -1
          }
          if(new Date(item2.createdAt).getTime() > new Date(item1).getDate()){
            return 1
          }
          return 0
      }
      filerResults = () => {
          const filters = []
          if(this.state.activeButton === 'all'){
              this.state.orders.sort(this.sortResultInDescending)
             return this.setState({
                  filteredResults: this.state.orders
              })
          }
          if(this.state.activeButton === 'pending'){
              this.state.orders.forEach(order => {
                  if(order.stage === 0){
                      filters.push(order)
                  }
              })
              filters.sort(this.sortResultInDescending)
              return this.setState({
                  filteredResults: filters
              })
          }
          if(this.state.activeButton === 'on way'){
                this.state.orders.forEach(order => {
                    if(order.stage >= 1 && order.stage < 4){
                        filters.push(order)
                    }
                })
                filters.sort(this.sortResultInDescending)
                return this.setState({
                    filteredResults: filters
                })
          }
      }
      toggleActiveButton = activeButton => {
          this.setState({
                activeButton
          }, () => this.filerResults())
      }
      _trackOrder = (id) => {
          console.log('tracking', id);
          db.doc(`/transit/${id}`).get()
            .then(doc => {
                if(doc.exists){
                    this.props.viewMap(id)
                    this.props.navigation.navigate('MapScreen')
                }else{
                    console.log('not found')
                }
            })
            .catch(err => console.log('some error where encountered', err))
      }
      renderItem = ({item}) => {
        return (
            <OrderCard
                key={item.id}
                id={item.id}
                driver={`${item.driverDetails.firstName} ${item.driverDetails.lastName}`}
                date={new Date(item.createdAt)}
                orderNumber={item.deliveryConfirmationCode} 
                recipient = {item.receiver.fullName}
                pickup={item.pickup.description}
                destination={item.destination.description}
                status={item.stage}
                _trackOrder={(id) => this._trackOrder(id)}
            />
            )
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
                            <Button small style={{...styles.orderScreenButton,borderWidth: 1, borderColor: Colors.secondaryColor,
                                   backgroundColor: this.state.activeButton === 'all' ? Colors.secondaryColor: '#fff'}}
                                   onPress={() => this.toggleActiveButton('all')} >
                                <Text
                                    style={{...styles.orderScreentButtonText,
                                        color: this.state.activeButton === 'all' ?  '#fff' : Colors.secondaryColor}}
                                >All</Text>
                            </Button>
                            <Button small
                                style={{...styles.orderScreenButton,borderColor: Colors.secondaryColor, borderRightWidth: 1,
                                     backgroundColor: this.state.activeButton === 'pending' ? Colors.secondaryColor: '#fff'}}
                                     onPress={() => this.toggleActiveButton('pending')}
                            >
                                <Text
                                    style={{...styles.orderScreentButtonText,
                                        color: this.state.activeButton === 'pending' ?  '#fff' : Colors.secondaryColor}}
                                >Pending</Text>
                            </Button>
                            <Button small
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
                            {
                                this.state.filteredResults.length > 0 ? 
                                <FlatList
                                    listKey={(item, index) => 'D' + index.toString()}
                                    data={this.state.filteredResults}
                                    keyExtractor={item => `${item.id}`}
                                    renderItem={this.renderItem}
                                    extraData={this.state.filteredResults.length}
                                />
                                : this.state.loaded ? 
                                    <View style={{marginTop: 40, width:"100%", justifyContent:"center", alignItems:"center"}}>
                                        <Text style={{fontFamily:"Lato", color:"#000", fontSize:18, fontWeight: "600"}}>
                                            
                                            No Orders Made Yet
                                        </Text>
                                    </View> : null
                            }
                            
                            {/* {
                                this.state.filteredResults.length > 0 ? 
                                this.state.filteredResults.map(order => (
                                    <OrderCard
                                        key={order.id}
                                        id={order.id}
                                        date={new Date()}
                                        orderNumber={order.deliveryConfirmationCode} 
                                        recipient = {order.receiver.fullname}
                                        pickup={order.pickup.description}
                                        destination={order.destination.description}
                                        status={'pending'}
                                    />
                                ))
                                : null
                            } */}
                            {/* <OrderCard 
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
                                orderNumber={'DHS745333'} status={'fulfilled'} /> */}
                        </ScrollView>
                    </View>
                    
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    const {order:{activeLink}} = state;
    return {activeLink}
}

export default connect(mapStateToProps, actions)(OrderScreen);
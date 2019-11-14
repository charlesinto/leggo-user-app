import React, { Component } from 'react';
import { View, Platform, FlatList, ScrollView, TouchableNativeFeedback } from "react-native";
import { Text, Card, CardItem, Right, } from "native-base";
import { connect } from "react-redux";
import { customStyles } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons';
import Colors from "../../constants/Colors";

import * as actions from "../../actions";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class AddItemScreen extends Component {
    state = {
        selectedItems: [],
        items: [
            {itemName: 'Clothings, Shoes and Accessories', id: 1},
            {itemName: 'Books and Documents', id: 2},
            {itemName: 'Electronics', id: 3},
            {itemName: 'Health and Beauty', id: 4},
            {itemName: 'Home and Decor', id: 5},
            {itemName: 'Pottery and Glass', id: 6},
            {itemName: 'Musical Instruments', id: 7}
        ]
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Select Item',
            headerTitleStyle: customStyles.headerStyle,
        }
    }
    renderCheckMark = itemId => {
        let index = this.props.selectedItems.findIndex(({id}) => parseInt(id) === parseInt(itemId))
        if(index !== -1){
            return (
                <Right>
                     <Ionicons
                        name={
                            Platform.OS === 'ios'
                                ? `ios-checkmark`
                                : 'md-checkmark'
                        }

                        size={26}
                        style={{ marginBottom: -3, color: Colors.iconColor }}
                    />
                </Right>
            )
        }
        return null
    }
    renderItem = ({item}) => {
        const {itemName, id} = item;
        return (
                <TouchableNativeFeedback onPress={() => this.props.selectDeliveryPackage(item)}>
                    <CardItem  bordered>
                        <View style={{display:'flex', width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>{itemName}</Text>
                            {
                                this.renderCheckMark(id)
                            }
                        </View>
                    </CardItem>
                </TouchableNativeFeedback>)
    }
    render() {
        return (
            <ScrollView style={{display: "flex"}}>
                <View style={{paddingTop: 20, paddingBottom: 20, paddingLeft: 20}}>
                    <Text>What are you sending?</Text>
                </View>
                
                <Card>
                    <FlatList 
                        data={this.props.items}
                        renderItem = {this.renderItem}
                        keyExtractor = {item => `${item.id}`}
                        extraData={this.props.selectedItems.length}
                    />
                </Card>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    const {order: {items, selectedItems}} = state;
    return {
        items,
        selectedItems
    }
}

export default connect(mapStateToProps, actions)(AddItemScreen)
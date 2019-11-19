import React, { Component } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { customStyles , styles} from "../../constants/styles";
import { Card, Text, CardItem, Item, Label, Input, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

class ProcessPaymentScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title:"Process Payment",
            headerStyle:{
                backgroundColor: Colors.headerColor
            },
            headerTintColor: Colors.headerTintColor,
            headerTitleStyle: customStyles.headerStyle
        }
    }
    formatAsMoney = (amount = 0) => {
       return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={{ display: 'flex', flex: 1 }}>
                <SafeAreaView style={{ display: 'flex', flex: 1 }}>
                    <ScrollView style={{ display: 'flex', flex: 1 }}>
                        <View style={styles.AppContainer}>
                            <Card style={styles.summaryCard}>
                                <CardItem>
                                    <View style={styles.costContainerStyle}>
                                        <Text style={styles.textLineStyle}>Shipping Cost</Text>
                                        <View style={styles.moneyConatinerStyle}>
                                            <Text style={{...styles.moneyStyle, ...styles.currencySign}}>
                                                {"\u20A6"}
                                            </Text>
                                            <Text style={{...styles.moneyStyle, }}>
                                                {this.formatAsMoney(12343)}
                                            </Text>
                                        </View>
                                    </View>
                                </CardItem>
                                <CardItem bordered>
                                    <View style={styles.costContainerStyle}>
                                        <Text style={styles.textLineStyle}>Extra Packaging</Text>
                                        <View style={styles.moneyConatinerStyle}>
                                            <Text style={{...styles.moneyStyle, ...styles.currencySign}}>
                                                {"\u20A6"}
                                            </Text>
                                            <Text style={{...styles.moneyStyle, }}>
                                                {this.formatAsMoney(0)}
                                            </Text>
                                        </View>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <View style={styles.costContainerStyle}>
                                        <Text style={{...styles.textLineStyle, color:'#000'}}>Total Cost</Text>
                                        <View style={styles.moneyConatinerStyle}>
                                            <Text style={{...styles.moneyStyle, ...styles.currencySign}}>
                                                {"\u20A6"}
                                            </Text>
                                            <Text style={{...styles.moneyStyle, }}>
                                                {this.formatAsMoney(12343)}
                                            </Text>
                                        </View>
                                    </View>
                                </CardItem>
                            </Card>
                            <Card style={styles.cardInputsContainer}>
                                <Grid>
                                    <Col>
                                        <CardItem style={styles.checkoutCardInputContainer}>
                                            <Label style={styles.cardInputLabel}>Name</Label>
                                            <Item regular>
                                                <Input
                                                    placeholder="Name"
                                                    returnKeyType="next"
                                                    selectionColor={Colors.primaryCOlor}
                                                    style={styles.checkoutCardInput} keyboardType="default" />
                                            </Item>

                                        </CardItem>
                                    </Col>
                                    <Col>
                                        <CardItem style={styles.checkoutCardInputContainer}>
                                            <Label style={styles.cardInputLabel}>Surname</Label>
                                            <Item regular>
                                                <Input
                                                    returnKeyType="next"
                                                    placeholder="Surname"
                                                    selectionColor={Colors.primaryCOlor}
                                                    style={styles.checkoutCardInput} keyboardType="default" />
                                            </Item>
                                        </CardItem>
                                    </Col>
                                </Grid>
                                <Grid>
                                    <Row>
                                        <CardItem style={styles.checkoutCardInputContainer}>
                                            <Label style={styles.cardInputLabel}>Credit Card Number</Label>
                                            <Item regular>
                                                <Input
                                                    returnKeyType="next"
                                                    placeholder="XXXX XXXX XXXX XXXX"
                                                    selectionColor={Colors.primaryCOlor}
                                                    style={styles.checkoutCardInput} keyboardType="number-pad" />
                                            </Item>
                                        </CardItem>
                                    </Row>

                                </Grid>
                                <Grid>
                                    <Col >
                                        <CardItem style={styles.checkoutCardInputContainer}>
                                            <Label style={styles.cardInputLabel}>Expiry Date</Label>
                                            <Item regular>
                                                <Input
                                                    returnKeyType="next"
                                                    placeholder="MM/YY"
                                                    selectionColor={Colors.primaryCOlor}
                                                    style={styles.checkoutCardInput} keyboardType="number-pad" />
                                            </Item>
                                        </CardItem>
                                    </Col>
                                    <Col >
                                        <CardItem style={styles.checkoutCardInputContainer}>
                                            <Label style={styles.cardInputLabel}>CVC</Label>
                                            <Item regular>
                                                <Input
                                                    returnKeyType="done"
                                                    placeholder="CVC"
                                                    selectionColor={Colors.primaryCOlor}
                                                    style={styles.checkoutCardInput} keyboardType="number-pad" />
                                            </Item>
                                        </CardItem>
                                    </Col>
                                </Grid>
                                
                                
                            </Card>
                            <Button full style={{backgroundColor: Colors.secondaryColor}}>
                                <Text>
                                    Pay Now
                                </Text>
                            </Button>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

export default ProcessPaymentScreen;
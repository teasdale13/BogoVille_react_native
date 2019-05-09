import React, {Component} from 'react';
import {Container, Content, Left, List, ListItem, Right, Separator, Text, View} from 'native-base';
import {getAllInfo} from "../AxiosRequest";


export default class ListSeparatorExample extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        listItems: [],
        isLoading: true,
    };

    componentDidMount() {
        getAllInfo('evenement')

            .then(response =>
                response.map(event => ({
                    nom: `${event.nom}`,
                    date: `${event.date}`,
                    adresse: `${event.adresse}`,
                }))
            )
            .then(listItems => {
                this.setState({
                    listItems,
                    isLoading: false
                });
            })

            .catch(error => this.setState({error, isLoading: false}));
    }


    render() {
        const {isLoading, listItems} = this.state;


        return (
            <Container>
                <Content>
                    <List>
                        {!isLoading ? (
                            listItems.map(event => {
                                const {nom, date, adresse} = event;
                                return (
                                    <View>
                                        <Separator bordered>
                                            <Text style={{
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: 20,
                                            }}>{nom}</Text>
                                        </Separator>
                                        <ListItem>
                                            <Left>
                                                <Text>
                                                    {date}
                                                </Text>
                                            </Left>
                                            <Right>
                                                <Text>
                                                    {adresse}
                                                </Text>
                                            </Right>
                                        </ListItem>
                                    </View>
                                );
                            })
                        ) : (
                            <Text>Loading...</Text>
                        )}

                    </List>
                </Content>
            </Container>
        );
    }
}
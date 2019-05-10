import React, {Component} from "react";
import {Container, Content, Icon, Picker, Form} from "native-base";
import axios from 'axios';

export default class CustomPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "",
            key:"",
            itemList: []
        };
    }

    /**
     * Fonction de React Native qui présentement va chercher tous les types dans la
     * base de données.
     */
    componentDidMount(): void {
        axios.get('http://bogoville.xyz/rest/type',{
            auth: {
                username: 'admin',
                password: 'admin'
            }
        }).then(function(response) {
            this.setState({itemList: response.data})
        }.bind(this));
    }

    /**
     * Fonction qui mets à jour le state de l'item qui est sélectionné et update le parent (Problem)
     * avec la fonction passée en props.
     *
     * @param value id du type sélectionné.
     */
    onValueChange = (value) => {
        this.setState({selected: value});
        this.props.updateFromChild(value);
    };

    render() {
        /* Fait le tour de la liste d'items pour "peupler" le Picker */
        const row = this.state.itemList === undefined? <Picker.Item label={"AUCUN TYPE"} value={0}/> :
            this.state.itemList.map((items, index) =>
            <Picker.Item key={index} label={items.nom} value={items.idType}/>
        );
        return (
            <Container>
                <Content>
                    <Form>
                        <Picker
                            mode="dropdown"
                            iosHeader="Type"
                            placeholder={"Sélectionnez un type"}
                            iosIcon={<Icon name="arrow-down"/>}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            {row}
                        </Picker>
                    </Form>
                </Content>
            </Container>
        );
    }
}
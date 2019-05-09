import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: ""
        };
        this.updateState = this.updateState.bind(this);
    }

    /**
     * Fonction qui lorsque l'utilisateur tappe son commentaire, met à jour le state et
     * le state du parent (Problem) via la fonction passée en props.
     *
     * @param text le texte entré par l'utilisateur.
     */
    updateState(text){
        this.setState({comment: text});
        this.props.commentFromChild(text);
    }

    render(){
        return(
            <View style={styles.box}>
                <TextInput
                    placeholder={"Décrire le problème"}
                    onChangeText={(text) => this.updateState(text)}
                    maxLength = {70}
                    multiline = {true}
                />
            </View>
        );}
}

const styles = StyleSheet.create({
    box:{
        textAlign: 'left',
        width: '100%',
        padding: 0,
        margin:0
    }

});
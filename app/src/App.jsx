import React, {Component} from 'react'
import {render} from 'react-dom';
import _ from 'lodash';

import * as firebase from 'firebase';

export default class App extends Component {

    constructor(props) {
        super(props);
        const config = {
            apiKey: "",
            authDomain: "",
            databaseURL:"",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
        };
        firebase.initializeApp(config);
        this.state = {
            messages: []
        };
        let app = firebase.database().ref('messages');
        app.on('value', snapshot => {
            this.getData(snapshot.val());
        });
    }

    getData(values) {
        let messagesVal = values;
        console.log(_(messagesVal).keys());
        console.log(messagesVal);
        let messages = _(messagesVal)
            .keys()
            .map(messageKey => {
                let cloned = _.clone(messagesVal[messageKey]);
                cloned.key = messageKey;
                console.log('cloned:',cloned);
                return cloned;
            })
            .value();
        this.setState({
            messages: messages
        });
    }

    render() {
        let messageNodes = this.state.messages.map((message) => {
            return (
                <div className="card">
                    <div className="card-content">
                        {message.message}
                    </div>
                </div>
            )
        });
        return (
            <div>
                {messageNodes}
            </div>
        );
    }

}
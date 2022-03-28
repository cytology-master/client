import React,{Component} from "react";
import $ from 'jquery'
import {Navigate} from 'react-router'

export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: localStorage.getItem('uid') !== null,
            gotInfo: false,
            user: {
                name: "",
                email: "",
                _id: ""
            }
        }
        console.log(this.state)
    }
    componentDidMount() {
        if(this.state.gotInfo) return
        $.getJSON('https://cytology-server.herokuapp.com/users/'+encodeURIComponent(localStorage.getItem('uid')))
        .done(data => {
            this.setState({
                gotInfo: true,
                user: data
            })
        })
        .fail(() => alert("An error was oucutted."))
    }
    render() {
        if(this.state.loggedIn === true) {
            return <header>
                <h1>Hello, {this.state.user.name}</h1>
            </header>
        }
        alert("Hello!")
        return <Navigate to="/users/singup" replace={true} />
    }
}
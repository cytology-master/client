import React,{ Component } from "react";
import $ from "jquery"
import "../CSS/form.css"
import { Navigate } from "react-router";


class Singup extends Component {
    constructor(props) {
        super(props)
        this.forms = {
            "singUp": React.createRef(),
            "logIn": React.createRef()
        }
        this.state = {
            loggedIn: false,
        }
        console.log(this.props.is_active)
        this.singUp = this.singUp.bind(this)
        this.logIn = this.logIn.bind(this)
    }
    singUp(e) {
        e.preventDefault()
        var form = this.forms.singUp.current
        var json = $(form).serialize()
        $.post("http://localhost:5000/users/singup", json)
            .done((data) => {
                localStorage.setItem('uid', JSON.parse(data).insertedId)
                this.setState({loggedIn: true})
            })
            .fail(function() {
                window.alert("Sorry, some problems with a server")
                form.reset()
            })
    }
    logIn(e) {
        e.preventDefault()
        var form = this.forms.logIn.current
        var json = $(form).serialize()
        $.post("http://localhost:5000/users/login", json)
            .done((data) => {
                localStorage.setItem('uid', JSON.parse(data)._id)
                this.setState({loggedIn: true})
            })
            .fail(function() {
                window.alert("Sorry, some problems with a server")
                form.reset()
            })
    }
    render() {
        return <div id="form-content">
            {this.state.loggedIn ? <Navigate to="/users/" replace={true} /> :<div id="container">
            <div className="form-container sign-up-container">
                <form action="http://localhost:5000/nojs/srv/singup" ref={this.forms.singUp} method="post" onSubmit={this.singUp}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        {/* <a href="#"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#"><i className="fa-brands fa-google"></i></a>
                        <a href="#"><i className="fa-brands fa-twitter"></i></a> */}
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" name="name" placeholder="Name" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="passwd" placeholder="Password" />
                    <input type="submit" name="singup" value="Sing up" />
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="http://localhost:5000/nojs/srv/login" ref={this.forms.logIn} onSubmit={this.logIn} method="post">
                    <h1>Sign in</h1>
                    <div className="social-container">
                        {/* <a href="#"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#"><i className="fa-brands fa-google"></i></a>
                        <a href="#"><i className="fa-brands fa-twitter"></i></a> */}
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" name="email" required />
                    <input type="password" placeholder="Password" name="passwd" required />
                    {/* <a href="#">Forgot your password?</a> */}
                    <input type="submit" name="login" value="Log in" />
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={() => {
                            $("#container").removeClass("right-panel-active")
                        }}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={() => {
                            $("#container").addClass("right-panel-active")
                        }}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>}
        </div>
    }
}
export default Singup
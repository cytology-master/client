import React,{ Component } from "react";
import { NavLink } from "react-router-dom"
import $ from "jquery"
import "../CSS/menu.css"
export default class Menu extends Component {
    constructor() {
        super()
        this.menu = {
            "lessons": React.createRef()
        }
    }
    render() {
        return <nav>
        <ul>
            <li><NavLink to="/">Index</NavLink></li>
            <li><NavLink to="/about">About us</NavLink></li>
            <li className="menu" ref={this.menu.lessons} onClick={(e) => {
                $(this.menu.lessons.current).children('ul').slideToggle()
                e.stopPropagation()
            }}><span>Lessons</span>
                <ul>
                    <li><NavLink to="/lsn/cell-organells">Cell organells</NavLink></li>
                    <li><NavLink to="/lsn/cell-division">Cell division</NavLink></li>
                </ul>
            </li>
        </ul>
        <hr />
        <ul>
            <li></li>
            <li><NavLink to="/users/singup">Login/Singup</NavLink></li>
        </ul>
    </nav>
    }
}
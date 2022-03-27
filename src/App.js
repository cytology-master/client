import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "./Components/Menu"
import Index from "./Components/Index";
import Singup from "./Components/Singup";
import About from "./Components/About"
import Dashboard from "./Components/Dashboard";

export default class App extends Component {
    render() {
        return <div>
            <Menu />
            <Routes>
                <Route path="/" element={<Index />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/users/singup" element={<Singup />} />
                <Route path="/users" element={<Dashboard />} />
                <Route path="/*" element={<h2>Error 404</h2>} />
            </Routes>
            </div>
    }
}
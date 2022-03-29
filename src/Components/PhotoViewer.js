import React,{Component} from "react"
import $ from "jquery"
import "../CSS/photo-viewer.css"

export default class PhotoViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            request: "https://cytology-server.herokuapp.com/static/images/photo-viewer/1-content.png",
            alt: "Cell organells",
            data: {
                name: "Cell organells",
                price: 400.98,
                symbol: "₽"
            }
        }

        this.changePicture = this.changePicture.bind(this)
        this.update = this.update.bind(this)

        this.ids = [
            "6242b25dc55db8de708340f0",
            "6242b25dc55db8de708340f0"
        ]

        var refs = {
            organells: React.createRef(),
            divide: React.createRef(),
            main: React.createRef(),
            data: React.createRef()
        }
        this.viewer = {
            organells: {
                ref: refs.organells,
                clicker: (e) => this.changePicture(e, refs.organells.current, 0)
            },
            divide: {
                ref: refs.divide,
                clicker: (e) => this.changePicture(e, refs.divide.current, 1)
            },
            main: {
                ref: refs.main
            },
        }
        this.$frame = $(".photo-viewer")
    }
    changePicture(e, el, i) {
        var src = el.href

        e.preventDefault()
        $(this.viewer.main.ref.current).fadeOut('slow', () => {
            $(".thumb").removeClass('active')
            $(el).addClass('active')
            this.setState({
                request: src,
                alt: el.title || '',

            })
        })
    }
    update(i) {
        $.getJSON("https://cytology-server.herokuapp.com/lessons/"+encodeURIComponent(this.ids[i]))
            .done(data => {
                this.setState({
                    name: data.name,
                    price: data.price,
                    symbol: data.is_dollars ? "$" : "₽"
                })
            })
    }
    render() {
        return <div className="photo-container">
            <div className="photo-viewer">
                <table>
                    <tbody>
                        <tr>
                            <td className="data"><img ref={this.viewer.main.ref} src={this.state.request} alt={this.state.alt} onLoad={() => {
                                $(this.viewer.main.ref.current).fadeIn('slow')
                            } } /></td>
                            <td className="data price">
                                <table>
                                    <tr>
                                        <td>{this.state.data.name}</td>
                                        <td className="space"></td>
                                        <td className="price">{this.state.data.price}{this.state.data.symbol}</td>
                                    </tr>
                                    <tr>
                                        <td className="offer">sale</td>
                                        <td className="space"></td>
                                        <td className="discount">100%</td>
                                    </tr>
                                </table>
                                <br/>
                                <div className="button-container"><button>Buy</button></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="thumbnails">
                <a href="https://cytology-server.herokuapp.com/static/images/photo-viewer/1-content.png" ref={this.viewer.organells.ref} className="thumb active" title="Cell organells" onClick={this.viewer.organells.clicker}><img src="https://cytology-server.herokuapp.com/static/images/photo-viewer/1.jpg" alt="Cell organells" /></a>
                <a href="https://cytology-server.herokuapp.com/static/images/photo-viewer/2-content.png" ref={this.viewer.divide.ref} className="thumb" title="Cell division" onClick={this.viewer.divide.clicker}><img src="https://cytology-server.herokuapp.com/static/images/photo-viewer/2.jpg" alt="Cell division" /></a>
            </div>
        </div>
    }
}
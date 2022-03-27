import React,{Component} from "react"
import $ from "jquery"
import "../CSS/photo-viewer.css"

export default class PhotoViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            request: "http://localhost:5000/static/images/photo-viewer/1-content.png",
            alt: "Cell organells",        
        }

        this.changePicture = this.changePicture.bind(this)

        var refs = {
            organells: React.createRef(),
            divide: React.createRef(),
            main: React.createRef()
        }
        this.viewer = {
            organells: {
                ref: refs.organells,
                clicker: (e) => this.changePicture(e, refs.organells.current)
            },
            divide: {
                ref: refs.divide,
                clicker: (e) => this.changePicture(e, refs.divide.current)
            },
            main: {
                ref: refs.main
            }
        }
        this.$frame = $("#photo-viewer")
    }
    changePicture(e, el) {
        var src = el.href

        e.preventDefault()
        $(this.viewer.main.ref.current).fadeOut('slow', () => {
            $(".thumb").removeClass('active')
            $(el).addClass('active')
            this.setState({
                request: src,
                alt: el.title || ''
            })
        })
    }
    render() {
        return <div>
            <div id="photo-viewer"><img ref={this.viewer.main.ref} src={this.state.request} alt={this.state.alt} onLoad={() => {
            $(this.viewer.main.ref.current).fadeIn('slow')
        } } /></div><div id="thumbnails">
                <a href="http://localhost:5000/static/images/photo-viewer/1-content.png" ref={this.viewer.organells.ref} className="thumb active" title="Cell organells" onClick={this.viewer.organells.clicker}><img src="http://localhost:5000/static/images/photo-viewer/1.jpg" alt="Cell organells" /></a>
                <a href="http://localhost:5000/static/images/photo-viewer/2-content.png" ref={this.viewer.divide.ref} className="thumb" title="Cell division" onClick={this.viewer.divide.clicker}><img src="http://localhost:5000/static/images/photo-viewer/2.jpg" alt="Cell division" /></a>
            </div>
        </div>
    }
}
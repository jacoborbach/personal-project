import axios from 'axios';
import React, { Component } from 'react'
import './Settings.css'
import { connect } from 'react-redux'
import { clearUser } from '../../dux/reducer'
import { changeColor } from '../../dux/themeReducer'
import { dark } from '../MyMap/ColorThemes/dark'
import { silver } from '../MyMap/ColorThemes/silver'

// bring in a prop that allows me to choose a color theme 
export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: '',
            pin: null
        }
    }

    setChosen = (val) => {
        this.setState({ theme: val });

        if (val === 'default') {
            document.getElementById('default').classList.add('applySelected')
            document.getElementById('dark').classList.remove('applySelected')
            document.getElementById('tropics').classList.remove('applySelected')

            document.getElementById('pin1').classList.remove('hide')
            document.getElementById('pin2').classList.add('hide')
            document.getElementById('pin3').classList.add('hide')

        } else if (val === 'dark') {
            document.getElementById('default').classList.remove('applySelected')
            document.getElementById('dark').classList.add('applySelected')
            document.getElementById('tropics').classList.remove('applySelected')

            document.getElementById('pin1').classList.add('hide')
            document.getElementById('pin2').classList.remove('hide')
            document.getElementById('pin3').classList.add('hide')

        } else if (val === 'tropics') {
            document.getElementById('default').classList.remove('applySelected')
            document.getElementById('dark').classList.remove('applySelected')
            document.getElementById('tropics').classList.add('applySelected')

            document.getElementById('pin1').classList.add('hide')
            document.getElementById('pin2').classList.add('hide')
            document.getElementById('pin3').classList.remove('hide')
        }

    }

    handleLogout = () => {
        axios.get('/api/logout')
            .then(() => {
                this.props.history.push('/')
                this.props.clearUser()
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.props)
        return (
            <div className='settings'>
                <div id='innerDiv'>

                    <h4 id='colorHeader'>Color</h4>
                    <p >Choose one of the following color themes:</p>

                    <button onClick={() => this.props.changeColor(null)}>Default</button>
                    <button onClick={() => this.props.changeColor(dark)}>Dark</button>
                    <button onClick={() => this.props.changeColor(silver)}>Silver</button>


                    {/*
                    <ul className='ThemeChoices'>
                        <li className="pin" ><span id="pin1" role="img" aria-label="pin" title='Choose Theme'>
                            📌
                    </span>{" "}</li>
                        <li className="pin"><span className="hide" id="pin2" role="img" aria-label="pin" title='Choose Theme'>
                            📌
                    </span>{" "}</li>
                        <li className="pin"><span className="hide" id="pin3" role="img" aria-label="pin" title='Choose Theme'>
                            📌
                    </span>{" "}</li>
                        <br />


                        <li className='themeChooser' id='default' onClick={(e) => this.setChosen('default')}>Default (Light)</li>
                        <li className='themeChooser' id='dark' onClick={(e) => this.setChosen('dark')}>Dark</li>
                        <li className='themeChooser' id='tropics' onClick={(e) => this.setChosen('tropics')}>Tropics</li>
                    </ul> */}
                </div>

                <button onClick={this.handleLogout} id="logout">Logout</button>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({ themereducer: reduxState.themereducer })

export default connect(mapStateToProps, { clearUser, changeColor })(Settings)

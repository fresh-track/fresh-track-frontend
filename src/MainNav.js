import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class MainNav extends Component {
    render() {
        return (
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    {this.props.user && <Link to='/login'>Login</Link>}
                    {this.props.user &&
                    <div className='welcome'>
                        <Link to='/login'>{this.props.user.displayName ? 'Hello ' + this.props.user.displayName + '!' : '' }</Link>
                    </div>}
                </nav>
        )
    }
}


import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/about">About 2</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;

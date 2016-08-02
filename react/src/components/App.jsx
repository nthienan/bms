import React, {PropTypes} from 'react';
import Header from './header/Header';

class App extends React.Component {

    static propTypes = {
        children: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Header />
                {this.props.children}
            </div>
        );
    }
}

export default App;

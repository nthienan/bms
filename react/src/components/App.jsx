import React, {PropTypes} from 'react';
import Header from './header/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from './sidebar/Sidebar'

class App extends React.Component {

  static propTypes = {
    children: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="root-container">
        <MuiThemeProvider>
          <div>
            <Header />
            <div>
              <div>
                <Sidebar docked={false} width={300} />
              </div>
              <div>
                {this.props.children}
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

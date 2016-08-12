import React, {PropTypes} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import LeftNav from '../LeftNav/LeftNav'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    title: PropTypes.string
  };

  static defaultProps = {
    title: 'BMS Application'
  };

  constructor(props) {
    super(props);
    this.state = {
      leftNav: {
        open: false
      }
    };
  }

  onMenuItemClick = () => {
    this.setState({leftNav: {...this.state.leftNav, open: !this.state.leftNav.open}});
  };

  render() {
    return (
      <div className="ap-app">
        <MuiThemeProvider>
          <div>
            <Header title={this.props.title} onLeftButtonClick={this.onMenuItemClick}/>
            <LeftNav title={this.props.title} open={this.state.leftNav.open} onMenuItemClick={this.onMenuItemClick}/>
            <div className="container">
              {this.props.children}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

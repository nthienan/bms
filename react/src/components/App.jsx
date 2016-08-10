import React, {PropTypes} from 'react';
import Header from './header/Header';
import Footer from './footer/Footer'
import LeftNav from './leftnav/LeftNav'
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
        open: true
      }
    };
  }

  onMenuItemClick = () => {
    this.setState({leftNav: {...this.state.leftNav, open: !this.state.leftNav.open}});
  };

  render() {
    return (
      <div className="root-container">
        <MuiThemeProvider>
          <div>
            <Header title={this.props.title} onLeftButtonClick={this.onMenuItemClick}/>
            <LeftNav title={this.props.title} open={this.state.leftNav.open} onMenuItemClick={this.onMenuItemClick}/>
            {this.props.children}
            <Footer/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

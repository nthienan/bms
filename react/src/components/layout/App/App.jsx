import React, {PropTypes} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LeftNav from '../LeftNav/LeftNav'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ModalRoot from '../../container/ModalRoot/ModalRoot';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class App extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    title: PropTypes.string,
    modal: PropTypes.object,
    style: PropTypes.object
  };

  static defaultProps = {
    title: 'BMS Application',
    style: {
      padding: '0 20px 80px 20px',
      minHeight: '100%'
    }
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
      <MuiThemeProvider>
        <div>
          <Header title={this.props.title} onLeftButtonClick={this.onMenuItemClick}/>
          <div style={this.props.style}>
            <LeftNav title={this.props.title} open={this.state.leftNav.open} onMenuItemClick={this.onMenuItemClick}/>
            {this.props.children}
          </div>
          <Footer/>
          <ModalRoot type={this.props.modal.type} props={this.props.modal.props}
                     callback={this.props.modal.callback}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    modal: state.modal
  };
}

export default connect(mapStateToProps)(App);

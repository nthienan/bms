import React, {PropTypes} from 'react';
import Header from '../Header/Header';
import LeftNav from '../LeftNav/LeftNav'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ModalRoot from '../../container/ModalRoot/ModalRoot';
import {getResourceLinks} from './../../../actions/resource-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class App extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    title: PropTypes.string,
    modal: PropTypes.object,
    getResourceLinks: PropTypes.func
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
            <ModalRoot type={this.props.modal.type} props={this.props.modal.props} callback={this.props.modal.callback}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modal: state.modal
  };
}

function mappDispatchToProps(dispatch) {
  return bindActionCreators({
    getResourceLinks: getResourceLinks
  }, dispatch);
}

export default connect(mapStateToProps, mappDispatchToProps)(App);

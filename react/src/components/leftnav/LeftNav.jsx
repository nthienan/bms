import React, {PropTypes} from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Link from 'react-router/lib/Link';

class LeftNav extends React.Component {

  static propTypes = {
    docked: PropTypes.bool,
    width: PropTypes.number,
    open: PropTypes.bool,
    onMenuItemClick: PropTypes.func.isRequired,
    title: PropTypes.string
  };

  static defaultProps = {
    docked: false,
    width: 300,
    open: true,
    title: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ln-leftnav">
        <Drawer docked={this.props.docked} width={this.props.width} open={this.props.open}>
          <AppBar title={this.props.title} onLeftIconButtonTouchTap={this.props.onMenuItemClick}/>
          <Link to="/">
            <MenuItem onTouchTap={this.props.onMenuItemClick}>Appliance</MenuItem>
          </Link>
          <Link to="/about">
          <MenuItem onTouchTap={this.props.onMenuItemClick}>User</MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}

export default LeftNav

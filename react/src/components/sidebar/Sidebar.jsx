import React, {PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Sidebar extends React.Component {

  static propTypes = {
    docked: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleClose = () => {
    console.log(this.state.open);
    this.setState({open: false});
  };

  render() {
    return (
      <div>
        <Drawer
          docked={this.props.docked}
          width={this.props.width}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Sidebar;

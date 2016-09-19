import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import BaseDialog from '../BaseDialog';

class ConfirmDialog extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    message: React.PropTypes.string.isRequired,
    title: PropTypes.string,
    handleYes: PropTypes.func,
    handleNo: PropTypes.func,
    width: PropTypes.number
  };

  static defaultProps = {
    title: 'BMS Application',
    width: 500
  };

  render() {
    let buttons = [
      <FlatButton label="Yes" primary onTouchTap={this.props.handleYes} />,
      <FlatButton label="No" primary onTouchTap={this.props.handleNo} />
    ];
    return (
      <BaseDialog open={this.props.open} message={this.props.message}
                  title={this.props.title} buttons={buttons} width={this.props.width}
      />
    );
  }
}

export default ConfirmDialog;

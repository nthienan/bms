import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';

class CrudButtons extends React.Component {

  static propTypes = {
    hideSearch: PropTypes.bool,
    hideReload: PropTypes.bool,
    hideAdd: PropTypes.bool,
    hideRemove: PropTypes.bool
  };

  static defaultProps = {
    hideSearch: false,
    hideReload: false,
    hideAdd: false,
    hideRemove: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cr-crud-buttons">
        <IconButton iconClassName="material-icons" tooltip="Search"
                    className={this.props.hideSearch ? 'hide' : null}
        >search</IconButton>
        <IconButton iconClassName="material-icons" tooltip="Reload"
                    className={this.props.hideReload ? 'hide' : null}
        >cached</IconButton>
        <IconButton iconClassName="material-icons" tooltip="Add"
                    className={this.props.hideAdd ? 'hide' : null}
        >library_add</IconButton>
        <IconButton iconClassName="material-icons" tooltip="Remove"
                    className={this.props.hideRemove ? 'hide' : null}
        >delete</IconButton>
      </div>
    );
  }
}
export default CrudButtons;

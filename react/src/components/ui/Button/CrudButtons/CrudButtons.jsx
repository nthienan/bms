import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';

class CrudButtons extends React.Component {

  static propTypes = {
    hideSearch: PropTypes.bool,
    hideReload: PropTypes.bool,
    hideAdd: PropTypes.bool,
    hideRemove: PropTypes.bool,
    touch: PropTypes.bool,
    onSearch: PropTypes.func,
    onReload: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
  };

  static defaultProps = {
    hideSearch: false,
    hideReload: false,
    hideAdd: false,
    hideRemove: true,
    touch: true
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <IconButton iconClassName="material-icons" tooltip="Search" touch={this.props.touch}
                    className={this.props.hideSearch ? 'hide' : null}
                    onClick={this.props.onSearch}

        >search</IconButton>
        <IconButton iconClassName="material-icons" tooltip="Reload" touch={this.props.touch}
                    className={this.props.hideReload ? 'hide' : null}
                    onClick={this.props.onReload}
        >cached</IconButton>
        <IconButton iconClassName="material-icons" tooltip="Add" touch={this.props.touch}
                    className={this.props.hideAdd ? 'hide' : null}
                    onClick={this.props.onAdd}
        >library_add</IconButton>
        <IconButton iconClassName="material-icons" tooltip="Remove" touch={this.props.touch}
                    className={this.props.hideRemove ? 'hide' : null}
                    onClick={this.props.onRemove}
        >delete</IconButton>
      </div>
    );
  }
}
export default CrudButtons;

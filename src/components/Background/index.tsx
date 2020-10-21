import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/reducers';
import './index.scss';

class Background extends PureComponent<PropsFromRedux> {
  render() {
    const { darkMode } = this.props;
    return <div className={`background ${darkMode ? '' : 'background--light'}`} />;
  }
}

const mapStateToProps = (state: RootState) => ({
  darkMode: state.settings.darkMode,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Background);

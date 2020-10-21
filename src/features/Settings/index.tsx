import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Switch from '../../components/FormControls/Switch';
import { RootState } from '../../redux/reducers';
import { setDarkMode } from './redux/actions';

class Settings extends React.PureComponent<PropsFromRedux> {
  render() {
    const { darkMode, setDarkMode } = this.props;
    return (
      <>
        <h4 className="mr-2">Dark Mode</h4>
        <Switch
          checked={darkMode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDarkMode({ darkMode: e.target.checked });
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  darkMode: state.settings.darkMode,
});

const mapDispatchToProps = {
  setDarkMode,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Settings);

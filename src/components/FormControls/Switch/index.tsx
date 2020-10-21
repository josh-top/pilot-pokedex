import React, { PureComponent } from 'react';
import './index.scss';

interface IProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class Switch extends PureComponent<IProps> {
  render() {
    const { checked, onChange } = this.props;
    return (
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round" />
      </label>
    );
  }
}

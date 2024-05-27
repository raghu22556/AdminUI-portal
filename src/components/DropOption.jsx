import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DropOption = ({ onMenuClick, menuOptions = [], buttonStyle, dropdownProps }) => {
  const menu = menuOptions.map((item) => <Menu.Item key={item.key}>{item.name}</Menu.Item>);
  return (
    <Dropdown overlay={<Menu onClick={onMenuClick}>{menu}</Menu>} {...dropdownProps}>
      <MoreVertIcon style={{ cursor: 'pointer' }} />
    </Dropdown>
  );
};

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object,
};

export default DropOption;

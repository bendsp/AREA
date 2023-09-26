import React from 'react';
import {Appbar} from 'react-native-paper';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({title}) => {
  return (
    <Appbar.Header style={{borderBottomWidth: 1, borderBottomColor: '#cfcfcf'}}>
      <Appbar.Content
        title={title}
        titleStyle={{
          fontSize: 20,
          fontWeight: '600',
          color: '#ffffff',
          alignItems: 'center',
        }}
      />
    </Appbar.Header>
  );
};

export default Header;

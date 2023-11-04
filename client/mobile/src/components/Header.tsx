import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({title}) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={{borderBottomWidth: 1, borderBottomColor: theme.colors.onSurface, backgroundColor: theme.colors.surface}}>
      <Appbar.Content
        title={title}
        titleStyle={{
          fontSize: 20,
          fontWeight: '600',
          alignItems: 'center',
          color: theme.colors.onSurface,
        }}
      />
    </Appbar.Header>
  );
};

export default Header;

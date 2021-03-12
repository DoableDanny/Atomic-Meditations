import React, {useContext} from 'react';
import {Switch} from 'react-native';

import SettingScaffold from './SettingScaffold';
import ThemeContext from '../../../lib/contexts/ThemeContext';

const DarkModeSetting = ({toggleDarkMode, darkMode}) => {
  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  return (
    <SettingScaffold
      title="Toggle Night Mode"
      description="Night Mode is great for before bed meditations as it's easier on the eye. Morning Mode shines blue light into your eyes, helping you wake up in the morning.">
      <Switch
        onValueChange={toggleDarkMode}
        thumbColor={colors.white}
        trackColor={{false: colors.primary, true: colors.primary}}
        value={darkMode}
      />
    </SettingScaffold>
  );
};

export default DarkModeSetting;

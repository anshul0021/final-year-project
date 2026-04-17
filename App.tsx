import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import React from 'react';

import { initialState, reducer, StateProvider } from './src/contexts/global';
import Main from './src/main';
import Translations from './src/translations';

i18n.translations = Translations;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Main />
    </StateProvider>
  );
}

export default App;

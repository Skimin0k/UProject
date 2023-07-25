import type { Preview } from "@storybook/react";
import {withTranslation} from "./decorators/withTranslation";
import withGlobalAppStyles from "./decorators/withGlobalAppStyles";
import withTheme from "./decorators/withTheme";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered'
  },
  globalTypes: {
    locale: {
      defaultValue: 'ru',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        title: "Locale",
        items: [
          {value: "ru", title: "Русский"},
          {value: "en", title: "English"}
        ]
      }
    }
  },
  decorators: [
    withGlobalAppStyles,
    withTheme,
    withTranslation,
  ]
};

export default preview;

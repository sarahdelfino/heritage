import { definePreset } from '@primeuix/themes';
import Nora from '@primeuix/themes/nora';

export const MyPreset = definePreset(Nora, {
  components: {
    carousel: {
      indicator: {
        background: '#500909',
        activeBackground: '#c9a14a'
      }
    }
  }
});

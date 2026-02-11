import { definePreset } from '@primeng/themes';
import Nora from '@primeng/themes/nora';

export const MyPreset = definePreset(Nora, {
  components: {
    carousel: {
      indicator: {
        activeBackground: '#c9a14a'
      }
    }
  }
});

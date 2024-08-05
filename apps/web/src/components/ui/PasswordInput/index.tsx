import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = MantinePasswordInput.withProps({
  visibilityToggleIcon: ({ reveal }) => {
    return reveal ? (
      <EyeOff
        style={{
          width: 'var(--psi-icon-size)',
          height: 'var(--psi-icon-size)',
        }}
      />
    ) : (
      <Eye
        style={{
          width: 'var(--psi-icon-size)',
          height: 'var(--psi-icon-size)',
        }}
      />
    );
  },
});

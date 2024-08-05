import { Box, Button } from '@mantine/core';
import { modals } from '@mantine/modals';

interface ConfirmationModalContentProps {
  message: string;
  isLoading?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  labels?: { cancel?: string; confirm?: string };
}

export function ConfirmationModalContent(props: ConfirmationModalContentProps) {
  const { message, isLoading = false } = props;

  const handleCancel = () => {
    props.onCancel ? props.onCancel() : modals.closeAll();
  };

  const handleConfirm = () => {
    props.onConfirm ? props.onConfirm() : modals.closeAll();
  };

  return (
    <Box className="w-full mt-2">
      <Box className="flex flex-col gap-y-2 w-full">
        <Box>{message}</Box>
        <Box className="w-full mt-6 flex justify-end space-x-2">
          <Button
            disabled={isLoading}
            onClick={handleCancel}
            variant="default"
            className="text-sm font-medium "
          >
            {props.labels?.cancel ?? 'Cancel'}
          </Button>
          <Button
            loading={isLoading}
            onClick={handleConfirm}
            type="submit"
            className="text-sm font-medium"
          >
            {props.labels?.confirm ?? 'Confirm'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

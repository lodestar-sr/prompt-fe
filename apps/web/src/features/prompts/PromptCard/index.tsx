import { ActionIcon, Badge, Button, Card, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { type PromptDto } from '@pms/rest';
import { Edit, Heart, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { ConfirmationModalContent } from '@/components/ui/Modal';
import { useDeletePrompt } from '@/hooks/api/use-delete-prompt';
import { useMarkAsFavorite } from '@/hooks/api/use-mark-as-favorite';
import { useRemoveFromFavorite } from '@/hooks/api/use-remove-from-favorite';

import { PromptForm } from '../PromptForm';
import classes from './index.module.css';

function ConfirmationContent(props: { id: string }) {
  const { mutate: deletePrompt, isPending } = useDeletePrompt();

  return (
    <ConfirmationModalContent
      message="Are you sure you want to delete this prompt?"
      isLoading={isPending}
      onConfirm={() => {
        deletePrompt({ path: { id: props.id } });
      }}
    />
  );
}

interface PromptCardProps {
  prompt: PromptDto;
}

export function PromptCard(props: PromptCardProps) {
  const { prompt } = props;

  const { data: session } = useSession();

  const { mutate: markAsFavorite, isPending: isPendingMarkAsFavorite } =
    useMarkAsFavorite();
  const { mutate: removeFromFavorite, isPending: isPendingRemoveFromFavorite } =
    useRemoveFromFavorite();

  const showUpdateForm = () => {
    modals.open({
      title: <strong className="font-semibold">Update Prompt</strong>,
      children: <PromptForm prompt={prompt} />,
      size: 'lg',
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  };

  const showDeleteConfirmation = () => {
    modals.open({
      title: <strong className="font-semibold">Confirmation</strong>,
      children: <ConfirmationContent id={prompt.id} />,
      centered: true,
      size: 'md',
    });
  };

  const handleClick = () => {
    if (prompt.isFavorite) {
      removeFromFavorite({ path: { id: prompt.id } });
    } else {
      markAsFavorite({ path: { id: prompt.id } });
    }
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section} m={0}>
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {prompt.title}
          </Text>
          <Badge size="sm" variant="light">
            {prompt.likesCount} likes
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {prompt.description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        <Group>
          <ActionIcon
            color={prompt.isFavorite ? 'green' : 'grape'}
            variant="outline"
            radius="md"
            size={36}
            disabled={isPendingMarkAsFavorite || isPendingRemoveFromFavorite}
            onClick={handleClick}
          >
            <Heart className="w-5 h-5" />
          </ActionIcon>
          {session?.user.id === prompt.createdById && (
            <>
              <ActionIcon
                variant="outline"
                color="orange"
                radius="md"
                size={36}
                onClick={showUpdateForm}
              >
                <Edit className="w-5 h-5" />
              </ActionIcon>
              <ActionIcon
                variant="outline"
                color="red"
                radius="md"
                size={36}
                onClick={showDeleteConfirmation}
              >
                <Trash className="w-5 h-5" />
              </ActionIcon>
            </>
          )}
        </Group>
      </Group>
    </Card>
  );
}

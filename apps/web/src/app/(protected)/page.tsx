'use client';
import { Box, Button, Loader, ScrollArea } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useCallback, useMemo } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

import { PromptCard } from '@/features/prompts/PromptCard';
import { PromptForm } from '@/features/prompts/PromptForm';
import { useGetPrompts } from '@/hooks/api/use-get-prompts';

export default function IndexPage() {
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useGetPrompts();

  const prompts = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages],
  );

  const Footer = useCallback(() => {
    return isFetchingNextPage ? (
      <Box className="flex items-center justify-center w-full">
        <Loader color="green" />
      </Box>
    ) : null;
  }, [isFetchingNextPage]);

  const itemContent = useCallback(
    (index: number) => {
      return prompts[index] ? <PromptCard prompt={prompts[index]} /> : null;
    },
    [prompts],
  );

  const showAddForm = () => {
    modals.open({
      title: <strong className="font-semibold">Create New Prompt</strong>,
      children: <PromptForm />,
      size: 'lg',
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  };

  return (
    <Box className="h-full">
      <Box className="flex justify-end">
        <Button
          variant="gradient"
          gradient={{ from: 'teal', to: 'green', deg: 90 }}
          onClick={showAddForm}
        >
          Create New Prompt
        </Button>
      </Box>
      <ScrollArea
        h="calc(100dvh - 144px)"
        type="always"
        className="mt-4"
        classNames={{ viewport: '[&>div]:h-full' }}
      >
        {isLoading ? (
          <Box className="flex items-center justify-center w-full h-full">
            <Loader color="green" />
          </Box>
        ) : (
          <VirtuosoGrid
            className="h-full"
            totalCount={prompts.length}
            itemContent={itemContent}
            endReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            overscan={100}
            components={{ Footer }}
            listClassName="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
            itemClassName="w-full"
          />
        )}
      </ScrollArea>
    </Box>
  );
}

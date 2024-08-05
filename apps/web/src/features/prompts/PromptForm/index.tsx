'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Textarea, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { type PromptDto } from '@pms/rest';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useCreatePrompt } from '@/hooks/api/use-create-prompt';
import { useUpdatePrompt } from '@/hooks/api/use-update-prompt';

const formSchema = Yup.object().shape({
  title: Yup.string().label('Title').required('Title is a required field'),
  description: Yup.string()
    .label('Description')
    .required('Description is a required field'),
});

interface PromptFormProps {
  prompt?: PromptDto;
}

export function PromptForm({ prompt }: PromptFormProps) {
  const { mutate: createPrompt, isPending: isPendingCreatePrompt } =
    useCreatePrompt();
  const { mutate: updatePrompt, isPending: isPendingUpdatePrompt } =
    useUpdatePrompt();

  const { control, reset, handleSubmit } = useForm<
    Yup.InferType<typeof formSchema>
  >({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (prompt) {
      reset({ title: prompt.title, description: prompt.description });
    }
  }, [prompt, reset]);

  const onSubmit = (values: Yup.InferType<typeof formSchema>) => {
    if (prompt) {
      updatePrompt(
        { path: { id: prompt.id }, body: values },
        {
          onSuccess: () => {
            modals.closeAll();
          },
        },
      );
    } else {
      createPrompt(values, {
        onSuccess: () => {
          modals.closeAll();
        },
      });
    }
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mt-2"
    >
      <Box className="flex flex-col gap-y-4 w-full">
        <Controller
          name="title"
          control={control}
          render={({
            field: { value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <TextInput
              required
              className="w-full"
              label="Title"
              radius="sm"
              size="md"
              value={value}
              onChange={(value) => {
                onChange(value);
              }}
              error={error?.message}
              {...rest}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({
            field: { value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Textarea
              required
              className="w-full"
              label="Description"
              radius="sm"
              size="md"
              minRows={4}
              maxRows={8}
              value={value}
              onChange={(value) => {
                onChange(value);
              }}
              error={error?.message}
              {...rest}
            />
          )}
        />
        <Box className="w-full mt-6 flex justify-end gap-x-4">
          <Button
            disabled={isPendingCreatePrompt || isPendingUpdatePrompt}
            onClick={() => {
              modals.closeAll();
            }}
            variant="default"
            className="w-20 text-sm font-medium "
          >
            Cancel
          </Button>
          <Button
            disabled={isPendingCreatePrompt || isPendingUpdatePrompt}
            type="submit"
            className="w-20 text-sm font-medium"
          >
            Save
          </Button>
        </Box>
      </Box>
    </form>
  );
}

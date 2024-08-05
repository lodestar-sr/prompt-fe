'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Anchor,
  Box,
  Button,
  Group,
  InputLabel,
  Paper,
  type PaperProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { startsWith } from 'lodash';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import isURL from 'validator/es/lib/isURL';
import * as Yup from 'yup';

import logo from '@/assets/images/logo.svg';
import { PasswordInput } from '@/components/ui';

const formSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .required('Email is a required field')
    .email('Email is invalid'),
  password: Yup.string()
    .label('Password')
    .required('Password is a required field'),
});

export function SignInForm(props: PaperProps) {
  const seatchParams = useSearchParams();
  const error = seatchParams.get('error');
  let callbackUrl = seatchParams.get('callbackUrl') ?? '/';
  callbackUrl =
    isURL(callbackUrl) &&
    (startsWith(process.env.NEXT_PUBLIC_WEB_HOST_URL) || startsWith('/'))
      ? callbackUrl
      : '/';

  const { control, handleSubmit } = useForm<Yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (values: Yup.InferType<typeof formSchema>) => {
    signIn('credentials', { ...values, callbackUrl });
  };

  return (
    <Paper radius="sm" {...props}>
      {error === 'CredentialsSignin' && (
        <Box px="xl" py={4} bg="red" className="rounded-t">
          <Text c="white" className="text-center">
            Invalid email or password
          </Text>
        </Box>
      )}
      <Box p="xl">
        <Stack align="center" gap="lg">
          <Image src={logo} alt="PMS" height={36} />
          <Text size="xl" fw={500}>
            Welcome Back!
          </Text>
        </Stack>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack mt="xl">
            <Controller
              name="email"
              control={control}
              render={({
                field: { value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <TextInput
                  required
                  label="Email"
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
              name="password"
              control={control}
              render={({
                field: { value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Box>
                  <Group justify="space-between">
                    <InputLabel required htmlFor="password" fw={500} size="md">
                      Password
                    </InputLabel>
                    <Anchor
                      component="button"
                      type="button"
                      c="dimmed"
                      pt={2}
                      fw={500}
                      fz="xs"
                    >
                      Forgot Password?
                    </Anchor>
                  </Group>
                  <PasswordInput
                    id="password"
                    radius="sm"
                    size="md"
                    value={value}
                    onChange={(value) => {
                      onChange(value);
                    }}
                    error={error?.message}
                    {...rest}
                  />
                </Box>
              )}
            />
          </Stack>

          <Stack>
            <Button type="submit" fullWidth radius="sm" mt="xl" size="md">
              Sign In
            </Button>
            <Text size="sm" ta="center">
              Or{' '}
              <Anchor href="/auth/sign-up" c="primary">
                click here
              </Anchor>{' '}
              to create your free account.
            </Text>
          </Stack>
        </form>
      </Box>
    </Paper>
  );
}

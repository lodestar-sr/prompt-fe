'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Anchor,
  Box,
  Button,
  Paper,
  type PaperProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { pick } from 'lodash';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import logo from '@/assets/images/logo.svg';
import { PasswordInput } from '@/components/ui';
import { useSignUp } from '@/hooks/api/use-sign-up';

const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('First Name')
    .required('First Name is a required field')
    .max(50, 'First Name must have maximum of 50 characters'),
  lastName: Yup.string()
    .label('Last Name')
    .required('Last Name is a required field')
    .max(50, 'Last Name must have maximum of 50 characters'),
  email: Yup.string()
    .label('Email')
    .required('Email is a required field')
    .email('Email is invalid'),
  password: Yup.string()
    .label('Password')
    .required('Password is a required field'),
});

export function SignUpForm(props: PaperProps) {
  const { mutate: signUp, error } = useSignUp();

  const { control, handleSubmit } = useForm<Yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (values: Yup.InferType<typeof formSchema>) => {
    signUp(values, {
      onSuccess: () => {
        signIn('credentials', { ...pick(values, 'email', 'password') });
      },
    });
  };

  return (
    <Paper radius="sm" {...props}>
      {error ? (
        <Box px="xl" py={4} bg="red" className="rounded-t">
          <Text c="white" className="text-center">
            {error.message || 'Something went wrong'}
          </Text>
        </Box>
      ) : null}

      <Box p="xl">
        <Stack align="center" gap="lg">
          <Image src={logo} alt="PMS" height={36} />
          <Text size="xl" fw={500}>
            Create your free account
          </Text>
        </Stack>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack mt="xl">
            <Controller
              name="firstName"
              control={control}
              render={({
                field: { value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <TextInput
                  required
                  label="First Name"
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
              name="lastName"
              control={control}
              render={({
                field: { value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <TextInput
                  required
                  label="Last Name"
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
                <PasswordInput
                  required
                  label="Password"
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
          </Stack>

          <Stack>
            <Button type="submit" fullWidth radius="sm" mt="xl" size="md">
              Get Started
            </Button>
            <Text size="sm" ta="center">
              Already have an account?{' '}
              <Anchor href="/auth/sign-in" c="primary">
                Sign In
              </Anchor>
            </Text>
          </Stack>
        </form>
      </Box>
    </Paper>
  );
}

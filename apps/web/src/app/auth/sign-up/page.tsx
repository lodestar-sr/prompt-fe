import { SignUpForm } from './_components/sign-up-form';

export default function SignUpPage() {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignUpForm flex={1} maw="calc(26.25rem * var(--mantine-scale))" />
    </div>
  );
}

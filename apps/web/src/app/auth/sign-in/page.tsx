import { SignInForm } from './_components/sign-in-form';

export default function SignInPage() {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignInForm flex={1} maw="calc(26.25rem * var(--mantine-scale))" />
    </div>
  );
}

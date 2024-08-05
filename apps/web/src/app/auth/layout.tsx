import { type PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <div className="flex-1 bg-auth">{children}</div>;
}

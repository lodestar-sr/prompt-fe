'use client';
import { ScrollArea } from '@mantine/core';
import { MessagesSquare } from 'lucide-react';

import { NavLinksGroup } from '@/components/ui';

import classes from './index.module.css';

const navLinks = [{ label: 'Prompts', icon: MessagesSquare, link: '/' }];

export function Navbar() {
  const links = navLinks.map((item) => (
    <NavLinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
}

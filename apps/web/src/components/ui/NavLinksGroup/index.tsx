'use client';
import {
  Box,
  Collapse,
  Group,
  rem,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { isEmpty, startsWith } from 'lodash';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';

import classes from './index.module.css';

export interface NavLinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  startsWith?: string;
  link?: string;
  links?: { label: string; link: string }[];
}

export function NavLinksGroup({
  icon: Icon,
  label,
  startsWith: target,
  initiallyOpened,
  link,
  links = [],
}: NavLinksGroupProps) {
  const pathname = usePathname();
  const [opened, setOpened] = useState(initiallyOpened ?? false);
  const items = links.map((link) => (
    <Box
      component={Link}
      href={link.link}
      key={link.label}
      className={cn(classes.link, {
        active: startsWith(pathname, link ? link.link : target),
      })}
    >
      {link.label}
    </Box>
  ));

  useEffect(() => {
    if (target && !link) {
      setOpened(startsWith(pathname, target));
    }
  }, [pathname, link, target]);

  return (
    <>
      <UnstyledButton
        onClick={() => {
          setOpened((o) => !o);
        }}
        className={cn(classes.control, {
          active: startsWith(pathname, link ? link : target),
        })}
      >
        <Group justify="space-between" gap={0}>
          {link ? (
            <Box
              component={Link}
              href={link}
              className="w-full flex items-center link text-black no-underline"
            >
              <ThemeIcon variant="transparent" size={30}>
                <Icon
                  style={{ width: rem(18), height: rem(18) }}
                  className={cn({
                    'text-slate-400': !startsWith(
                      pathname,
                      link ? link : target,
                    ),
                    'text-primary': startsWith(pathname, link ? link : target),
                  })}
                />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
          ) : (
            <Box className="w-full flex items-center link text-black no-underline">
              <ThemeIcon variant="transparent" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
          )}
          {!isEmpty(items) ? (
            <ChevronRight
              className={classes.chevron}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          ) : null}
        </Group>
      </UnstyledButton>
      {!isEmpty(items) ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

'use client';
import {
  Avatar,
  Box,
  Burger,
  Drawer,
  Group,
  Menu,
  rem,
  ScrollArea,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import logo from '@/assets/images/logo-white.svg';

import classes from './index.module.css';

export function Header() {
  const session = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Image src={logo} alt="PMS" height={30} />

          <Box visibleFrom="sm">
            <Menu
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              withinPortal
              shadow="lg"
              width={150}
            >
              <Menu.Target>
                <UnstyledButton>
                  <Group gap={20}>
                    <Box className="flex flex-col items-end">
                      <Text c="white" className="font-semibold">
                        {session.data?.user?.fullName ?? ''}
                      </Text>
                    </Box>
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${session.data?.user?.fullName ?? ''}&format=svg`}
                      radius="xl"
                      size={40}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => signOut({ callbackUrl: '/auth/sign-in' })}
                  leftSection={<LogOut size="1rem" />}
                >
                  Sign Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            color="white"
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md" />
      </Drawer>
    </Box>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  Text,
  Drawer,
  Group,
  ThemeIcon,
  SegmentedControl,
  GroupProps,
  Button,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDownload, IconFileDownload } from '@tabler/icons';

// Project components / helpers
// import FilterBar from './components/Bar';
// import FilterPanel from './components/Panel';

// Config
import { OutputType } from './types';

interface FiltersProps extends GroupProps {
  foo?: 'bar';
}

function Downloads({ foo, ...rest }: FiltersProps) {
  // State hooks
  const [outputType, setOutputType] = useState<OutputType>('csv');
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer.Root position='right' opened={opened} onClose={close} keepMounted>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header style={{ zIndex: 300 }}>
            <Group position='apart' w='100%'>
              <Group>
                <ThemeIcon variant='light' radius='xl' size='xl'>
                  <IconFileDownload />
                </ThemeIcon>
                <Text
                  size='xl'
                  weight='bold'
                  sx={(theme) => ({ fontFamily: theme.headings.fontFamily })}
                >
                  Download Records
                </Text>
              </Group>
              <Group>
                <SegmentedControl
                  size='xs'
                  value={outputType}
                  onChange={(value) => setOutputType(value as OutputType)}
                  data={[
                    { label: 'CSV', value: 'csv' },
                    { label: 'JSON', value: 'json' },
                  ]}
                />
                <Drawer.CloseButton />
              </Group>
            </Group>
          </Drawer.Header>
          <Drawer.Body>content here</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <Tooltip label='Download Records' position='left'>
        <ActionIcon onClick={open} size={36} variant='outline' color='blue'>
          <IconDownload size='1rem' />
        </ActionIcon>
      </Tooltip>
      {/* <Button variant='outline' onClick={open} leftIcon={<IconDownload size='1rem' />}>
        Download
      </Button> */}
    </>
  );
}

export default Downloads;

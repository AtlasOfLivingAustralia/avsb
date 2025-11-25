/** biome-ignore-all lint/suspicious/noExplicitAny: Lots of no-typing here */
import {
  Button,
  ButtonProps,
  Checkbox,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { IconFileDownload } from '@tabler/icons-react';
import { PropsWithChildren, useRef, useState } from 'react';

// Config
import { useDisclosure } from '@mantine/hooks';
import { DOWNLOAD_CATEGORIES } from '.';

interface DownloadsProps extends PropsWithChildren<ButtonProps> {
  href: string;
  download: string;
}

export function StaticDownloads({ href, download, ...rest }: DownloadsProps) {
  // Download state
  const [downloadReason, setDownloadReason] = useState<string | null>(localStorage.getItem('avsb-download-reason') || '');
  const [downloadOrg, setDownloadOrg] = useState<string>(localStorage.getItem('avsb-download-org') || '');
  const [downloadRemember, setDownloadRemeber] = useState<boolean>(true);
  const [opened, { open, close }] = useDisclosure(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const downloadRecords = () => {
    if (!downloadRef.current) return;

    // Update localStorage with download reason & org
    if (downloadRemember) {
      if (downloadReason) localStorage.setItem('avsb-download-reason', downloadReason);
      localStorage.setItem('avsb-download-org', downloadOrg);
    }

    // Push download reason to fathom
    if (window.fathom) {
      window.fathom.trackEvent(`Dataset download - ${downloadReason}${downloadOrg.length > 0 ? ` - ${downloadOrg}` : ''}`)
    }

    // Trigger the download
    downloadRef.current.click();

    if (!downloadRemember) {
      // Clear the state
      setDownloadOrg('');
      setDownloadReason(null);

      // Clear localStorage
      localStorage.removeItem('avsb-download-reason');
      localStorage.removeItem('avsb-download-org');
    }

    close();
  };

  return (
    <>
      {/** biome-ignore lint/a11y/useAnchorContent: Hidden download link */}
      <a ref={downloadRef} style={{ display: 'none' }} href={href} download={download} />
      <Modal opened={opened} onClose={close} title={<Group gap='sm'>
        <ThemeIcon variant='light' size='lg' radius='lg'>
          <IconFileDownload size='1rem' />
        </ThemeIcon>
        <Text
          style={{
            fontFamily: 'var(--mantine-font-family-headings)',
            fontWeight: 'bold',
          }}
        >
          Download Files
        </Text>
      </Group>}>
        <Stack>
          <TextInput placeholder="Organisation name" value={downloadOrg} onChange={(ev) => setDownloadOrg(ev.currentTarget.value)} />
          <Select value={downloadReason} onChange={setDownloadReason} placeholder="Select download reason" data={DOWNLOAD_CATEGORIES} />
          <Checkbox checked={downloadRemember} onChange={(event) => setDownloadRemeber(event.currentTarget.checked)} c="dimmed" size="xs" label="Remember for next time" />
          <Button
            disabled={!downloadReason || downloadOrg.length < 1 || !downloadRef.current}
            onClick={downloadRecords}
            size='xs'
            variant='filled'
            fullWidth
          >
            Download
          </Button>
        </Stack>
      </Modal>
      <Tooltip
        transitionProps={{ transition: 'pop' }}
        offset={10}
        withArrow
        label='Download files'
        position='left'
      >
        <Button {...rest} onClick={open} />
      </Tooltip>
    </>
  );
}

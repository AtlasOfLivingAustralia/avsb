import { useState } from 'react';
import { Box, Image, Paper, Text, ThemeIcon, rem } from '@mantine/core';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';

import { HelpTopicItem } from '..';

interface TopicProps {
  instructions: HelpTopicItem[];
}

function Topic({ instructions }: TopicProps) {
  const [slide, setSlide] = useState<number>(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const { content, icon: Icon } = instructions[slide];

  // Delay the slide offset calculation to compensate
  // for the modal opening animation
  useAnimationOffsetEffect(embla, 200);

  return (
    <>
      <Carousel
        onSlideChange={(index) => setSlide(index)}
        styles={(theme) => ({
          control: {
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
          indicator: {
            width: rem(12),
            height: rem(4),
            transition: 'width 250ms ease',
            backgroundColor: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[3],
            '&[data-active]': {
              width: rem(40),
            },
          },
        })}
        mx='auto'
        withIndicators
        height={700}
        getEmblaApi={setEmbla}
      >
        {instructions.map(({ image }, index) => (
          <Carousel.Slide key={`${index * 2}`}>
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
              })}
            >
              <Image pt='md' fit='contain' width='100%' height={650} src={image} />
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
      <Paper px='md' pb='md'>
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 45 }}>
          <ThemeIcon mr='sm' size='lg' variant='light' radius='lg'>
            <Icon size='1rem' />
          </ThemeIcon>
          <Text size='sm'>
            <b>{slide + 1}.</b>&nbsp;&nbsp;
            {content}
          </Text>
        </Box>
      </Paper>
    </>
  );
}

export default Topic;

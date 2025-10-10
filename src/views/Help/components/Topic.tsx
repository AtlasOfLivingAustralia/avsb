import { Carousel } from '@mantine/carousel';
import { Box, Image, Paper, Text, ThemeIcon, rem } from '@mantine/core';
import { useState } from 'react';

import { HelpTopicItem } from '..';

import classes from './Topic.module.css';

interface TopicProps {
  instructions: HelpTopicItem[];
}

function Topic({ instructions }: TopicProps) {
  const [slide, setSlide] = useState<number>(0);
  const { content, icon: Icon } = instructions[slide];

  return (
    <>
      <Carousel
        onSlideChange={(index) => setSlide(index)}
        classNames={classes}
        mx='auto'
        withIndicators
        height={700}
      >
        {instructions.map(({ image }, index) => (
          <Carousel.Slide key={`${index * 2}`}>
            <Box
              style={{
                backgroundColor:
                  'light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-5))',
              }}
            >
              <Image
                pt='md'
                fit='contain'
                w='100%'
                h={650}
                src={image}
                alt={`Slide ${index + 1} of help images`}
              />
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
      <Paper px='md' pb='md'>
        <Box style={{ display: 'flex', alignItems: 'center', minHeight: 45 }}>
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

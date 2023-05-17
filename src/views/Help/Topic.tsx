import { useState } from 'react';
import { Box, Image, Paper, Text, ThemeIcon } from '@mantine/core';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import { HelpTopicItem } from '.';

interface TopicProps {
  instructions: HelpTopicItem[];
}

function Topic({ instructions }: TopicProps) {
  const [slide, setSlide] = useState<number>(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const { content, icon: Icon } = instructions[slide];

  useAnimationOffsetEffect(embla, 200);

  return (
    <>
      <Carousel
        onSlideChange={(index) => setSlide(index)}
        styles={{
          control: {
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
        }}
        mx='auto'
        withIndicators
        height={350}
        getEmblaApi={setEmbla}
      >
        {instructions.map(({ image }, index) => (
          <Carousel.Slide key={`${index * 2}`}>
            <Image w='100%' height='100%' src={image} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Paper p='md'>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
    // <Stack spacing='sm'>
    //   {instructions.map(({ content, icon: Icon, images }, index) => (
    //     <Box>
    //       <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
    // <ThemeIcon mr='sm' size='lg' variant='light' radius='lg'>
    //   <Icon size='1rem' />
    // </ThemeIcon>
    // <Text size='sm'>
    //   <b>{index + 1}.</b>&nbsp;
    //   {content}
    // </Text>
    //       </Box>
    //       {(images || []).length > 0 && (
    //         <Group>
    //           {images?.map((image) => (
    //             <Image src={image} />
    //           ))}
    //         </Group>
    //       )}
    //     </Box>
    //   ))}
    // </Stack>
  );
}

export default Topic;

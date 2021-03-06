import React from 'react'
import { storiesOf } from '@storybook/react'
import { Text } from '../src/index.js'

storiesOf('Text', module)
  .add('default', () => <Text>I am text. Behold my text.</Text>)
  .add('sizes', () => (
    <div>
      <Text size='48'>Font size: 48</Text><br />
      <Text size='20'>Font size: 20</Text><br />
      <Text size='16'>Font size: 16</Text><br />
      <Text size='15'>Font size: 15</Text><br />
      <Text size='14'>Font size: 14</Text><br />
      <Text size='13'>Font size: 13</Text><br />
      <Text size='12'>Font size: 12</Text><br />
      <Text size='11'>Font size: 11</Text><br />
    </div>
  ))
  .add('shades', () => (
    <div>
      <Text>Default</Text><br />
      <Text subtle>Subtle</Text><br />
      <Text muted>Muted</Text><br />
      <Text faint>Faint</Text><br />
    </div>
  ))
  .add('states', () => (
    <div>
      <Text>Default</Text><br />
      <Text state='error'>Error</Text><br />
      <Text state='success'>Success</Text><br />
      <Text state='warning'>Warning</Text><br />
    </div>
  ))
  .add('truncate', () => (
    <div>
      <Text truncate>Buddy (Will Ferrell) was accidentally transported to the North Pole as a toddler and raised to adulthood among Santa's elves. Unable to shake the feeling that he doesn't fit in, the adult Buddy travels to New York, in full elf uniform, in search of his real father.</Text>
    </div>
  ))

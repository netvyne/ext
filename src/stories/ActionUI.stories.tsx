import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Website } from 'types/common/types';
import ActionUI from '../components/discussion/ActionUI';

export default {
  title: 'ActionUI',
  component: ActionUI,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ActionUI>;

const Template: ComponentStory<typeof ActionUI> = (args : any) => <ActionUI {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  website: { Title: 'HEY' } as Website, postVote: null, saved: true, onSaveItem: null
};

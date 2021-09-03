import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ShoutTreeUI from '../components/discussion/ShoutTreeUI';

export default {
  title: 'ShoutTreeUI',
  component: ShoutTreeUI,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ShoutTreeUI>;

const Template: ComponentStory<typeof ShoutTreeUI> = (args) => <ShoutTreeUI {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  postComment: null,
  setComment: null,
  comment: 'Yo',
  setShowForm: null,
  showForm: true,
};

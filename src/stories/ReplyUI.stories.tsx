import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ReplyUI from '../components/discussion/ReplyUI';

export default {
  title: 'ReplyUI',
  component: ReplyUI,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ReplyUI>;

const Template: ComponentStory<typeof ReplyUI> = (args) => <ReplyUI {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  postComment: null,
  setComment: null,
  comment: 'Yo',
  setShowForm: null,
  showForm: true,
};

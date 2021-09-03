import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Shout } from 'types/common/types';
import ShoutVoteUI from '../components/discussion/ShoutVoteUI';

export default {
  title: 'ShoutVoteUI',
  component: ShoutVoteUI,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ShoutVoteUI>;

const Template: ComponentStory<typeof ShoutVoteUI> = (args) => <ShoutVoteUI {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  shout: { Upvotes: 10 } as Shout,
  postVote: null,
};

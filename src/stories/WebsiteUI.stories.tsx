import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Url, Website } from 'types/common/types';
import WebsiteUI from '../components/discussion/WebsiteUI';

export default {
  title: 'WebsiteUI',
  component: WebsiteUI,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof WebsiteUI>;

const Template: ComponentStory<typeof WebsiteUI> = (args) => <WebsiteUI {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  initWebsite : {Title: "HEY"} as Website,
  url: {Host: "news.ycombinator.com"} as Url
};

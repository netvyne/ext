/* eslint-disable no-unused-vars */

// eslint-disable-next-line import/no-extraneous-dependencies
import { DateTime } from 'luxon';

interface ServerError {
  Message: string;
  Code: number;
}

interface User {
  CreatedAt: DateTime;
  Registered: boolean;
  UserName: string;
  IsMod: boolean;
  IsAdmin: boolean;
  FirstName: string;
  LastName: string;
  Email: string;
  VerifiedEmail: boolean;
  Bio: string;
  Status: string;
  AvatarPath: string;
  Birthday: DateTime;
  ProfileNonce: number;
  LastRequest: DateTime;
  UpdatedAt: DateTime;
  Handle: string;
  DisableWarnNSFW: boolean;
}

interface UserRelation {
  CreatedAt: DateTime;
  UpdatedAt: DateTime;
  ID: number;
  Sender: User;
  Receiver: User;
  Status: string;
}

interface Website {
  // eslint-disable-next-line no-undef
  map(arg0: (website: Website) => JSX.Element): any;
  ID: number;
  CreatedAt: DateTime;
  Title: string;
  Description: string;
  ImagePath: string;
  PreviewProcessed: boolean;
  Host: string;
  Pathname: string;
  Search: string;
  ApprovalRate: number;
  Karma: number;
  Upvotes: number;
  Downvotes: number;
  VoteStatus: number;
  Saved: boolean;
  ShoutCount: number;
  LiveCount: number;
  TagLabelNames: string[];
  Public: boolean;
  URL: string;
  MediaType: string;
  Paywall?: boolean;
  Warn?: boolean;
  Remove?: boolean;
  FeaturedComment: string;

  LatestModerationAt: string;
  LatestModerationReasons: string;
  ShareCount?: number;
}

interface WebsiteSave {
  ID: number;
  User: User;
  WebsiteID: number;
  Website: Website;
}

interface Post {
  CreatedAt: DateTime;
  ID: number;
  Author: User;
  ImagePath: string;
  Comment: string;
  WebsiteShareID: number;
  WebsiteShare: WebsiteShare;
  Karma: number;
  Upvotes: number;
  Downvotes: number;
  VoteStatus: string;
  LatestTalk: Talk;
  Children: Talk[];
  Receivers: User[];
  WarnUsers: boolean;
  LastSeenAt: string;
  PostType: string;
  Public: boolean;
  Text: string;
}

interface Talk {
  ID: number;
  CreatedAt: DateTime;
  ParentTalkID: number;
  ParentTalk: Talk;
  Author: User;
  PostID: number;
  Post: Post;
  Comment: string;
  Level: number;
  Karma: number;
  Upvotes: number;
  Downvotes: number;
  VoteStatus: TalkVote[];
  Children: Talk[];
}

interface TalkVote {
  UserID: number;
  MessageID: number;
  Status: string;
}

interface Shout {
  ID: number;
  CreatedAt: DateTime;
  ParentShoutID: number;
  ParentShout: Shout;
  Author: User;
  WebsiteID: number;
  Website: Website;
  Comment: string;
  Level: number;
  Karma: number;
  Upvotes: number;
  Downvotes: number;
  VoteStatus: number;
  Saved: boolean;
  Children: Shout[];
  MoreReplies: number[];
  Warn?: boolean;
  Remove?: boolean;

  LatestModerationAt: DateTime;
  LatestModerationReasons: string;
}

interface ShoutSave {
  ID: number;
  User: User;
  ShoutID: number;
  Shout: Shout;
}

interface Conversation {
  ID: number;
  Title: string;
  AvatarPath: string;
  Leader: User;
  DefaultURL: boolean;
  IsGroup: boolean;
  LatestComment: string;
  Members: ConversationMember[];
  DefaultTitle: boolean;
}

interface ChatMessage {
  ID: number;
  CreatedAt: DateTime;
  ParentChatID: number;
  ParentChat: ChatMessage;
  AuthorID: number;
  Author: User;
  WebsiteID: number;
  Website: Website;
  Comment: string;
  DeletedAt: DateTime;
  UpdatedAt: DateTime;
}

interface ConversationMember {
  ID: number;
  Member: User;
  ConversationID: number;
  Conversation: Conversation;
}

interface Message {
  ID: number;
  CreatedAt: DateTime;
  UserDeleted: boolean;
  ParentMessageID: number;
  ParentMessage: Message;
  Author: User;
  ConversationID: number;
  Conversation: Conversation;
  Comment: string;
  Karma: number;
  Upvotes: number;
  Downvotes: number;
  VoteStatus: MessageVote[];
}

interface Notification {
  UpdatedAt: DateTime;
  CreatedAt: DateTime;
  ID: number;
  Sender: User;
  Receiver: User;
  Type: string;
  Text: string;
  Viewed: boolean;
  Link: string;
  Details: JSON;
}

interface MessageVote {
  UserID: number;
  MessageID: number;
  Status: string;
}

interface Uptime {
  UpdatedAt: string;
  CreatedAt: string;
  DeletedAt: any;
  ID: number;
  ResponseTime: number;
  IsUp: Boolean;
}

interface Label {
  ID: number;
  Name: string;
  AuthorID: number;
  Author: User;
  Host: string;
  Pathname: string;
  Search: string;
  Core: boolean;
  Count: number;
}

interface UserLabel {
  CreatedAt: DateTime;
  UpdatedAt: DateTime;
  ID: number;
  UserID: number;
  User: User;
  LabelID: number;
  Label: Label;
  Active: boolean;
}

interface Tag {
  ID: number;
  CreatedAt: DateTime;
  UpdatedAt: DateTime;
  AuthorID: number;
  Author: User;
  Remove?: boolean;
  LabelID: number;
  Label: Label;
  WebsiteID: number;
  Website: Website;

  LatestModerationAt: DateTime;
  LatestModerationReasons: string;
}

interface WebsiteShare {
  ID: number;
  // UserID: number;
  User: User;
  WebsiteID?: number;
  Website?: Website;
  TagID?: number;
  Tag?: Tag;
  RawURL: string;
}

interface Moderation {
  ID: number;
  CreatedAt?: string;

  ModeratorProcessedAt?: string;
  Moderator: User;
  ModeratorID: number

  Gore?: boolean;
  ST?: boolean;
  Violence?: boolean;
  Misinformation?: boolean;
  Obscene?: boolean;
  Spam?: boolean;
  Nonenglish?: boolean;
  Nudity?: boolean;
  Invalid?: boolean;
  Abuse?: boolean;
  Hate?: boolean;
  Illegal?: boolean;
  Paywall?: boolean;
  Bot?: boolean;

  Unspecific?: boolean;
  Incorrect?: boolean;
  Redundant?: boolean;

  NeedsModeratorType: string;

  TargetType: string;
  TargetWebsiteID: number;
  TargetWebsite: Website;
  TargetShoutID: number;
  TargetShout : Shout;
  TargetTagID : number;
  TargetTag : Tag;
  TargetModerationID: number;
  TargetModeration : Moderation;
  Discussion: string;
}

interface Url {
  Host: string;
  Pathname: string;
  Search: string;
  Title: string;
}

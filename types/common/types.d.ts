/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { DateTime } from 'luxon';

interface User {
    CreatedAt: DateTime;
    Registered: boolean;
    UserName: string;
    Handle: string;
    Role: string;
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
    DisableWarnNSFW: boolean;
    IsMod: boolean;
  }

// interface UserRelation {
//     CreatedAt: DateTime;
//     UpdatedAt: DateTime;
//     ID: number;
//     SenderID: number;
//     Sender: User;
//     ReceiverID: number;
//     Receiver: User;
//     Status: string;
// // MutualFriends: number;
// }

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
    Paywall?: boolean;
    // warn
    Warn?: boolean;
    Gore?: boolean;
    Nudity?: boolean;
    Violence?: boolean;
    // remove
    Remove?: boolean;
    Spam?: boolean;
    Invalid?: boolean;
    Misinformation?: boolean;
    Abuse?: boolean;
    Illegal?: boolean;
    ShareCount?: number;
  }

// interface WebsiteSave {
// ID: number;
// UserID: number;
// User: User;
// WebsiteID: number;
// Website: Website;
// }

interface Post {
    CreatedAt: DateTime;
    ID: number;
    Author: User;
    ImagePath: string;
    Comment: string;
    WebsiteID: number;
    Website: Website;
    Karma: number;
    Upvotes: number;
    Downvotes: number;
    VoteStatus: string;
    LatestTalk: Talk;
    Children: Talk[];
    Receivers: User[];
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
    // AuthorID: number;
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
    // warn
    Warn?: boolean;
    Gore?: boolean;
    Nudity?: boolean;
    Violence?: boolean;
    // remove
    Remove?: boolean;
    Spam?: boolean;
    Misinformation?: boolean;
    Bot?: boolean;
    Abuse?: boolean;
    Illegal?: boolean
  }

// interface ShoutSave {
// ID: number;
// UserID: number;
// User: User;
// ShoutID: number;
// Shout: Shout;
// }

interface Url {
Host: string;
Pathname: string;
Search: string;
Title: string;
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

interface PostShare {
    ID: number;
    CreatedAt: DateTime;
    DeletedAt: DateTime;
    UpdatedAt: DateTime;
    Post: Post;
    PostID: number;
    Receiver: User;
    ReceiverID: number;
    Sender: User;
    SenderID: number;
}

interface Conversation {
    ID: number;
    Title: string;
    AvatarPath: string;
    // LeaderID: number;
    Leader: User;
    DefaultURL: boolean;
    IsGroup: boolean;
    LatestComment: string;
    Members: ConversationMember[];
  }

interface ConversationMember {
    ID: number;
    // MemberID: number;
    Member: User;
    ConversationID: number;
    Conversation: Conversation;
}

interface Notification {
    UpdatedAt: DateTime;
    CreatedAt: DateTime;
    ID: number;
    // SenderID: number;
    Sender: User;
    // ReceiverID: number;
    Receiver: User;
    Type: string;
    Text: string;
    Viewed: boolean;
    Link: string;
    Details: JSON;
  }
  interface Label {
    ID: number;
    Name: string;
    AuthorID: number;
    Author: User;
    Host: string;
    Pathname: string;
    Search: string;
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
    Name: string;
    AuthorID: number;
    Author: User;
    ModeratorProcessedAt: string;
    LabelID: number;
    Label: Label;
    WebsiteID: number;
    Website: Website;
  }

  interface WebsiteShare {
    ID: number;
    // UserID: number;
    User: User;
    WebsiteID: number;
    Website: Website;
    Tag: Tag;
  }

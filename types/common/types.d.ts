/// <reference path="./response-types.d.ts" />
// eslint-disable-next-line import/no-extraneous-dependencies
import { DateTime } from 'luxon';

interface User {
    ID: number;
  CreatedAt: DateTime;
  UpdatedAt: DateTime;
  DeletedAt: DateTime;
  UserName: string;
  Role: string;
  FirstName: string;
  LastName: string;
  Email: string;
  AvatarURL: string;
  VerifiedEmail: boolean;
  Registered: boolean;
  Birthday: DateTime;
  LastRequest: DateTime;
  IncludeNSFW: boolean
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
ID: number;
CreatedAt: DateTime;
Title: string;
Description: string;
Image: string;
PreviewProcessed: boolean;
Host: string;
Pathname: string;
Search: string;
Karma: number;
Upvotes: number;
Downvotes: number;
VoteStatus: string;
Saved: boolean;
ShoutCount: number;
ShareCount: number;
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
    AuthorID: number;
Author: User;
Comment: string;
WebsiteID: number;
Website: Website;
Karma: number;
Upvotes: number;
Downvotes: number;
VoteStatus: string;
Children: Talk[];
}

interface Talk {
    ID: number;
    CreatedAt: DateTime;
ParentTalkID: number;
ParentTalk: Talk;
AuthorID: number;
Author: User;
PostID: number;
Post: Post;
Comment: string;
Level: number;
    Karma: number;
Upvotes: number;
Downvotes: number;
VoteStatus: string;
Children: Talk[];
}

interface Shout {
    ID: number;
    CreatedAt: DateTime;
    ParentShoutID: number;
ParentShout: Shout;
AuthorID: number;
Author: User;
WebsiteID: number;
Website: Website;
Comment: string;
Level: number;
Karma: number;
Upvotes: number;
Downvotes: number;
VoteStatus: string;
Saved: boolean;
Children: Shout[];
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

interface Chat {
    ID: number;
    CreatedAt: DateTime;
    ParentChatID: number;
    ParentChat: Chat;
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

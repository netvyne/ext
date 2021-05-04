/// <reference path="./response-types.d.ts" />

import { DateTime } from "luxon";

interface User {
    CreatedAt: DateTime;
    ID: number;
    Provider: string;
	UserName: string; 
	_passHash: string;
	Role: string;
	IDToken: string;
	FirstName: string;
	LastName: string;
	Email: string;
	AvatarURL: string;
	Birthday: DateTime;
	ProfileNonce: number;
	LastRequest: DateTime;
}

interface UserRelation {
    CreatedAt: DateTime;
    UpdatedAt: DateTime;
    ID: number;
    SenderID: number;
    Sender: User;
    ReceiverID: number;
    Receiver: User;
    Status: string;
}

interface Website {
    map(arg0: (website: Website) => JSX.Element): any;
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
}

interface WebsiteSave {
	ID: number;
	UserID: number;
	User: User;
	WebsiteID: number;
	Website: Website;
}

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

interface ShoutSave {
	ID: number;
	UserID: number;
	User: User;
	ShoutID: number;
	Shout: Shout;
}


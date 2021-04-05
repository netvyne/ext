/// <reference path="./response-types.d.ts" />

import { DateTime } from "luxon";

interface User {
    created_date: DateTime;
    is_registered: boolean;
    id: number;
    username: string;
    _passhash: string;
    role: string;
    google_id: string;
    apple_id: string;
    given_name: string;
    family_name: string;
    email: string;
    picture_url: string;
    birthday: DateTime;
    profile_nonce: number;
}

interface UserRelation {
    created_date: DateTime;
    updated_date: DateTime;
    id: number;
    sender_id: number;
    sender: User;
    receiver_id: number;
    receiver: User;
    relation_id: number;
    relation_type: string;
    mutual_friends: number[];
}

interface Website {
    map(arg0: (website: Website) => JSX.Element): any;
    id: number;
    host: string;
    pathname: string;
    search: string;
    title: string;
    description: string;
    image: string;
    preview_processed: boolean;
    isSaved: boolean;
    url: string;
    created_date: DateTime;
    webcomments: number;
}

interface Vote {
    id: number;
    user_id: number;
    webcomment_id: number;
    website_id: number;
    sharecomment_id: number;
    vote_id: number;
    vote_type: string;
}

interface ShareComment {
    id: number;
    parent_id: number;
    author_id: number;
    ancestor_id: number;
    author: User;
    website_id: number;
    website: Website;
    comment: string;
    level: number;
    voted: Vote;
    karma: number;
}

interface WebComment {
    map(arg0: (treeRoot: WebComment) => JSX.Element);
    children: WebComment;
    parent_id: number;
    isSaved: boolean;
    created_date: DateTime;
    id: number;
    author_id: number;
    author: User;
    website_id: number;
    website: Website;
    comment: string;
    level: number;
    voted: Vote;
    karma: number;
}


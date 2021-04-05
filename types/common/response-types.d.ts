import { User, UserRelation, WebComment, ShareComment, Website } from "./types";

interface GetUserQuery {
    user: User;
}

interface GetUserRelationsQuery {
    sender_relations: UserRelation[];
    receiver_relations: UserRelation[];
}

interface GetFriendQuery {
    friends: User[];
}

interface GetFeedQuery {
    feed: Website[];
}

interface GetFreedQuery {
    freed: ShareComment[];
}

interface GetShareCommentTreeQuery {
    website: Website;
    trees: ShareComment[];
}

interface GetSavedCommentsQuery {
    comments: WebComment[];
}

interface GetSavedSitesQuery{
    sites: Website[];
}

interface GetPersonalCommentsQuery {
    comments: WebComment[];
}

interface GetCommContextQuery {
    site: Website;
    parent: WebComment;
    reply: WebComment;
}

interface GetWebcommentTreesQuery {
    website: Website;
    trees: WebComment[];
}
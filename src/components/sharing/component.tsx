import React, { FunctionComponent } from "react";
// import "./styles.scss";

import { fetchResource } from "../../utils";
import Button from "@material-ui/core/Button";
import Dropdown from "./dropdown";
import Screenshot from "./screenshot";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "react-query";
import CircularProgress from "@material-ui/core/CircularProgress";


export const Sharing: FunctionComponent = () => {

    const queryClient = new QueryClient();

    const [friendIds, setFriendIds] = React.useState([]);
    const [comment, setComment] = React.useState("");
    const [dataURL, setDataURL] = React.useState("");
    const [rect, setRect] = React.useState({ startX: 0, startY: 0 });
    // // // // // //

    const postShare = async () => {
        var url = new URL(`${process.env.PUBLIC_API}/send_share`);
        var args = {
            host: document.location.host,
            pathname: document.location.pathname,
            search: document.location.search,
            dataURL: dataURL,
            rect: rect,
            receiver_ids: friendIds,
            comment: comment,
        };
        var init = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(args),
        };
        const res : any = await fetchResource(url, init);
        // const res : any = {
        //     id: 12,
        //     parent_id: 12,
        //     author_id: 12,
        //     ancestor_id: 12,
        //     author: {
        //         created_date: "2021-04-14 00:00:00",
        //         is_registered: false,
        //         id: 1,
        //         username: "Ali Raza",
        //         _passhash: "hfgfghfgfgfgh",
        //         role: "user",
        //         google_id: "",
        //         apple_id: "",
        //         given_name: "",
        //         family_name: "",
        //         email: "aliraza955@gmail.com",
        //         picture_url: "",
        //         birthday: "2021-04-14 00:00:00",
        //         profile_nonce: 12
        //     },
        //     website_id: 12,
        //     website: {
        //         id: 12,
        //         host: "host",
        //         pathname: "path name",
        //         search: "search",
        //         title: "Title",
        //         description: "Description",
        //         image: "Image",
        //         preview_processed: false,
        //         isSaved: true,
        //         url: "URL",
        //         created_date: "2021-04-14 00:00:00",
        //         webcomments: 12
        //     },
        //     comment: "comment",
        //     level: 12,
        //     voted: {
        //         id: 12,
        //         user_id: 12,
        //         webcomment_id: 12,
        //         website_id: 12,
        //         sharecomment_id: 12,
        //         vote_id: 12,
        //         vote_type: "vote type"
        //     },
        //     karma: 12
        // };
        console.log("res", res);
        return res;
    };
    console.log(postShare);
    // const mutation : any = useMutation(postShare);
    const mutation : any = {};
    const onPostShare = async (e : any) => {
        // Prevent the form from refreshing the page
        e.preventDefault();
        try {
            await mutation.mutate();
            // reset form state
            setFriendIds([]);
            setComment("");
        } catch (error) {
            // Uh oh, something went wrong
        }
    };

    let bottom : any;
    if (mutation.isLoading) {
        bottom = (
        <Box>
            <Button type="submit">
            {" "}
            <CircularProgress color="inherit" size={20} />
            </Button>
        </Box>
        );
    } else if (mutation.isError) {
        bottom = (
        <Box>
            Error!<Button type="submit"> Share Site</Button>
        </Box>
        );
    } else if (mutation.isSuccess) {
        bottom = (
        <Box>
            Success!<Button type="submit"> Share Site</Button>
        </Box>
        );
    } else {
        bottom = (
        <Box>
            <Button type="submit"> Share Site</Button>
        </Box>
        );
    }
    let bbox = <Box></Box>;

    return (
        <Box m={1}>
        <form onSubmit={onPostShare}>
            <Dropdown setFriendIds={setFriendIds} key={mutation.isLoading} />
            {bbox}
            <Screenshot
            modalContainer={bbox}
            dataURL={dataURL}
            setDataURL={setDataURL}
            rect={rect}
            setRect={setRect}
            />
            <Box m={1}>
            <TextField
                value={comment}
                onInput={(e : any) => setComment(e.target.value)}
                id="nv-message"
                label="Message"
                placeholder="Lookit!"
                fullWidth
                multiline
                rows={3}
            />
            </Box>
            {bottom}
        </form>
        </Box>
    );
    // return (
    //     <QueryClientProvider client={queryClient}>
    //         <div className="row">
    //             <div className="col-lg-12 text-center">
    //                 <p className="lead mb-0">Netvyne Extension{friendIds}</p>
    //             </div>
    //         </div>
    //     </QueryClientProvider>
    // );
};

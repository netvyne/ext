import React, { FunctionComponent, Fragment, useEffect, useState } from "react";
// import "./styles.scss";

import { fetchResource } from "../../utils";
import Button from "@material-ui/core/Button";
import Dropdown from "./dropdown";
import Screenshot from "./screenshot";
// import ScreenCapture from './screenCapture'
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Box } from "@material-ui/core";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "react-query";
import CircularProgress from "@material-ui/core/CircularProgress";

import { render } from 'react-dom';

export const Sharing: FunctionComponent = () => {

    const queryClient = new QueryClient();

    const [shareSeparately, setShareSeparately] = React.useState(true);
    const [url, setUrl] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [friendIds, setFriendIds] = React.useState([]);


    const [dataURL, setDataURL] = React.useState("");
    const [rect, setRect] = React.useState({ startX: 0, startY: 0 });

    useEffect(() => {
        const queryInfo = {active: true, lastFocusedWindow: true};
        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            let url : any = tabs[0].url;
            setUrl(url);
        });
    }, []);
    // // // // // //


    const dataURLtoFile = (dataurl : any, filename : any) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
    }

    const mutation = useMutation({});
    const postShare = async (event : any) => {
        event.preventDefault();
        var shareURL = new URL(url);
        let data = {
            Host: shareURL.host,
            Pathname: shareURL.pathname,
            Search: shareURL.search,
            Comment: comment,
            Separate: shareSeparately,
            ReceiverIDs: friendIds
        };
        let res = mutation.mutate(
        //@ts-ignore
        {
            route: "/post_user_post",
            data: data,
        },
        {
            onSuccess: (response : any) => {
                uploadImage(event, response.Post.ID);
                setFriendIds([]);
                setComment("");
                setDataURL("");
                // uploadImage(event, "1");
            },
        }
        );
        return res;
    };

    const uploadImage = async (event : any, postId : string) => {
        event.preventDefault();
        const file = dataURLtoFile(dataURL, "pfp")
        const formData = new FormData()
        formData.append('pfp', file, file.name)
        formData.append("Type", "post");
        formData.append("ID", postId);
        let res = mutation.mutate(
            //@ts-ignore
            {
                route: "/upload_image",
                data: formData,
            }
        );
    }
    // const mutation : any = useMutation(postShare);
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
        <form onSubmit={postShare}>
            <Dropdown setFriendIds={setFriendIds} key={mutation.isLoading} />
            {bbox}
            <Screenshot
            modalContainer={bbox}
            dataURL={dataURL}
            setDataURL={setDataURL}
            rect={rect}
            setRect={setRect}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={shareSeparately}
                  onChange={(e : any) => setShareSeparately(e.target.checked)}
                />
              }
              label="Share Separately"
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
            <Button type="submit"> Share </Button>
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

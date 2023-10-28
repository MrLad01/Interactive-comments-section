import  React, { useEffect, useMemo, useState } from 'react'
import data from '../../assets/data.json'


import Comment from './Comment';
// import CommentForm from './CommentForm';
import NewForm from './NewForm';



export interface Comment1 {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: {
        image: {
            png: string;
            webp: string;
        };
        username: string;
    };
    replies: {
        id: number;
        content: string;
        createdAt: string;
        score: number;
        replyingTo: string;
        user: {
            image: {
                png: string;
                webp: string;
            };
            username: string;
        };
    }[];
}


const Comments: React.FC = ( ) => {

    const [ backendComments, setBackendComments ] = useState<Comment1[]>([]);
    const [ reply, setReply ] = useState<boolean>(true);



    const comments = data.comments

    useEffect(() => {
        setBackendComments([...comments]);
    }, []);
    
      const cmmts = useMemo(() => {
        return backendComments.sort((a, b) => b.score - a.score).map(comment => (
            <Comment key={comment.id} comment={comment} parent = {backendComments} setParent = {setBackendComments}   />
        ));
    }, [backendComments]);
    
    return (
        <>
            {cmmts}
            {/* {reply && <CommentForm  replyingTo = " "  replies = { backendComments } setBackendReplies = { setBackendComments } setReply = { setReply } comment = { true }  />} */}
            { reply && <NewForm  replies = { backendComments } setBackendReplies = { setBackendComments } setReply = { setReply } /> }
        </>
    )
    }

export default Comments

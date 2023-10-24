import  React, { useEffect, useMemo, useState } from 'react'
import data from '../../assets/data.json'


import Comment from './Comment';



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



    const comments = data.comments

    useEffect(() => {
        setBackendComments(comments);
    }, []);
    
      const cmmts = useMemo(() => {
        return comments.sort((a, b) => b.score - a.score).map(comment => (
            <Comment key={comment.id} comment={comment} />
        ));
    }, [backendComments]);
    
    return (
        <>
            {cmmts}
            {/* <CommentForm /> */}
        </>
    )
    }

export default Comments

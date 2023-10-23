import React, { useState } from 'react'

import plusIcon from '../../assets/images/icon-plus.svg';
import minusIcon from '../../assets/images/icon-minus.svg';
import replyIcon from '../../assets/images/icon-reply.svg';

import { Comment1 } from './Comments';

interface CommentProps {
    comment: Comment1
}

const Comment: React.FC<CommentProps> = ( { comment } ) => {


    const [ upVote, setUpVote ] = useState<boolean>(false);
    const [ downVote, setDownVote ] = useState<boolean>(false); 

    const [ count, setCount ] = useState<number>(comment.score);
    const [ reply, setReply ] = useState<boolean>(false);
  


    const handleUpVote = () => {
        setDownVote(false)
        if ( downVote ){
            setDownVote( false )
            setCount( count + 1 )
        } else if (!upVote) {   
            setUpVote( true )
            setCount( count + 1 )
        }
        else {
            setCount( count - 1 )
        }
    }

    const handleDownVote = () => {
        setUpVote(false)
        if ( upVote ){
            setUpVote( false )
            setCount( count - 1 )
        } else if (!downVote) {   
            setDownVote( true )
            setCount( count - 1 )
        }
        else {
            setCount( count + 1 )
        }
    }


  return (
    <div className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-6 mb-2 ' key = { comment.id } >
        <div className = 'flex flex-col justify-around gap-3 items-center p-3 bg-light-grayish-blue rounded-2xl bg-opacity-30 h-24'>        
            <button 
                disabled = { upVote }
                onClick = { handleUpVote }
            >
                <img 
                    src = { plusIcon } 
                    alt = "plus" 
                    style = {{ filter: !upVote ? 'brightness(0.7)' : 'brightness(1)', }}  
                    className = 'p-1'
                />
                <h2>  </h2>
            </button>

            <h1> { count > 0 ? count : 0 } </h1>


            <button
                    disabled = { downVote || count == 0 }
                    onClick = { handleDownVote }
            >
                <img
                    src = { minusIcon } 
                    alt = "minus"
                    style = {{ filter: !downVote ? 'brightness(0.7)' : 'brightness(1)', }}
                    className = 'p-1'  
                />
                <h2>  </h2>
            </button>
        </div>

        <div className = 'flex flex-col gap-2 h-32 w-full ' >
            <div className = 'flex justify-between w-full  ' >
                <div className = 'flex justify-around items-center gap-4'>
                    <img src = {`"../../assets/${comment.user.image.png}"`}  alt = "" className = 'w-9 h-9' />
                    <h1 > { comment.user.username } </h1>
                    <h2> { comment.createdAt } </h2>
                </div>

                <button 
                    className = 'h-6 flex items-center justify-around p-2 gap-2'
                    onClick = { () => setReply(!reply) }
                >
                    <img src = { replyIcon } alt = "" />
                    Reply
                </button>
            </div>

            <p> { comment.content } </p>
        </div>
    </div>
  )
}

export default Comment

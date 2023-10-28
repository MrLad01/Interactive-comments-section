import React, {useState, useContext } from 'react';
import { CommentContext } from '../../App';

import plusIcon from '../../assets/images/icon-plus.svg';
import minusIcon from '../../assets/images/icon-minus.svg';
import replyIcon from '../../assets/images/icon-reply.svg';
import deleteIcon from '../../assets/images/icon-delete.svg';
import editIcon from '../../assets/images/icon-edit.svg';

import { Reply1 } from './Comment';
import CommentForm from './CommentForm';
  



interface ReplyProps {
    replies: Reply1
    parent: Reply1[]
}

const Reply: React.FC<ReplyProps> = ( { replies, parent } ) => {

    const user = useContext(CommentContext)

    const [ upVote, setUpVote ] = useState<boolean>(false);
    const [ downVote, setDownVote ] = useState<boolean>(false); 
    const [ count, setCount ] = useState<number>(replies.score);

    const [ reply, setReply ] = useState<boolean>(false);
    const [ del, setDel ] = useState<boolean>(false);
    const [ ed, setEd ] = useState<boolean>(false);


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
    <>
        <div className = 'w-full h-fit bg-white p-5 pb-0 rounded-lg flex gap-6 mb-4 ' key = { replies.id } >
            <div className = 'flex flex-col justify-around gap-3 items-center p-3 bg-light-grayish-blue rounded-2xl bg-opacity-30 h-24'>        
               <button 
                    disabled = { upVote || replies.user.username === user }
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
                        disabled = { downVote || count == 0 || replies.user.username === user }
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
                        <img src = {`../../src/assets/${replies.user.image.png}`}  alt = "" className = 'w-9 h-9' />
                        <h1 > { replies.user.username } </h1>
                        { replies.user.username === user && <h2 className = 'bg-blue-900 text-white font-bold px-2 text-sm' > you </h2> }
                        <h2> { replies.createdAt } </h2>
                    </div>

                    { replies.user.username !== user  ? <button 
                        className = 'h-6 flex items-center justify-around p-2 gap-2'
                        onClick = { () => setReply(!reply) }
                    >
                        <img src = { replyIcon } alt = "" />
                        Reply
                    </button> :
                        <div className = 'flex' >
                            <button 
                                className = 'h-6 flex items-center justify-around p-2 gap-2'
                                onClick = { () => setDel(!del) }
                            >
                                <img src = { deleteIcon } alt = "" />
                                Delete
                            </button> 
                            <button 
                                className = 'h-6 flex items-center justify-around p-2 gap-2'
                                onClick = { () => setEd(!ed) }
                            >
                                <img src = { editIcon } alt = "" />
                                Edit
                            </button> 
                        </div>
                    }
                </div>

                <p> <span className = ' text-blue-800 font-bold ' > @{ replies.replyingTo } </span> { replies.content } </p>
            </div>
        </div>
        {reply && <CommentForm replyingTo = { replies.user.username } replies = { parent }  />}
        {
            del && 
            <>
                <div className = 'absolute top-0 left-0 w-full h-[125vh] z-10  overflow-hidden  bg-slate-600 opacity-20'>
                </div>
                <div className = 'absolute top-0 left-0  w-full h-[125vh] z-20  flex  items-center justify-center ' >
                    <div className = 'bg-white w-1/4 h-1/3 rounded-md flex flex-col justify-around p-8 items-start ' >
                        <h2> Delete Comment </h2>
                        <p> Are you sure you want to delete this comment? This will remove the comment and can't be undone. </p>
                        <div className = "flex gap-2">
                            <button className = 'bg-slate-600 text-white rounded-md px-5 py-2'
                            onClick = {() => setDel(!del)}
                            > NO, CANCEL </button>
                            <button className = 'text-white bg-red-600 rounded-md px-5 py-2' > YES, DELETE </button>
                        </div>
                    </div>
                </div>
            </>
        }
    </>
  )
}

export default Reply

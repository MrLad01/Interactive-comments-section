import React, {useState, useContext, SetStateAction } from 'react';
import { CommentContext } from '../../App';

import plusIcon from '../../assets/images/icon-plus.svg';
import minusIcon from '../../assets/images/icon-minus.svg';
import replyIcon from '../../assets/images/icon-reply.svg';
import deleteIcon from '../../assets/images/icon-delete.svg';
import editIcon from '../../assets/images/icon-edit.svg';

import { Reply1 } from './Comment';
import CommentForm from './CommentForm';
import { deleteReply } from '../../helpers';
  



interface ReplyProps {
    replies: Reply1
    parent: Reply1[]
    setParent: React.Dispatch<SetStateAction<Reply1[]>>
}

const Reply: React.FC<ReplyProps> = ( { replies, parent, setParent } ) => {

    const user = useContext(CommentContext)

    const [ upVote, setUpVote ] = useState<boolean>(false);
    const [ downVote, setDownVote ] = useState<boolean>(false); 
    const [ count, setCount ] = useState<number>(replies.score);
    const [ editedContent, setEditedContent ] = useState<string>(replies.content);

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

    
    const handleDelete = ( e:React.MouseEvent ) => {
      
        e.preventDefault();
       
        deleteReply( replies.id )
            .then( () => {
                            const updatedReplies = parent.filter(reply => reply.id !== replies.id )
                            
                            setParent(updatedReplies)
                        }
                )

    }



  return (
    <>
        <div 
            className = 'w-full h-fit bg-white p-5 pb-0 rounded-lg flex gap-6 mb-4 ' 
            key = { replies.id } 
        >
            <div className = 'flex flex-col justify-around gap-3 items-center p-3 bg-light-grayish-blue rounded-2xl bg-opacity-30 h-24 xs:max-md:hidden '>        
               <button 
                    disabled = { upVote }
                    onClick = { handleUpVote }
                >
                    <img 
                        src = { plusIcon } 
                        alt = "plus" 
                        style = {{ filter: !upVote ? 'brightness(0.7)' : 'brightness(1)', }}  
                        className = 'p-1 saturate-200 contrast-100'
                    />
                </button>

                <h1 className = ' font-bold text-moderate-blue '> { count > 0 ? count : 0 } </h1>

                <button
                        disabled = { downVote || count == 0 }
                        onClick = { handleDownVote }
                >
                    <img
                        src = { minusIcon } 
                        alt = "minus"
                        style = {{ filter: !downVote ? 'brightness(0.7)' : 'brightness(1)', }}
                        className = 'p-1 saturate-200 contrast-100'  
                    />
                </button>
            </div>

            <div className = 'flex flex-col gap-2 h-fit w-full pb-4 ' >
                <div className = 'flex justify-between w-full  ' >
                    <div className = 'flex justify-around items-center gap-4'>
                        <img 
                            src = { `../../src/assets/${ replies.user.image.png }` }  
                            alt = "" 
                            className = 'w-9 h-9' 
                        />
                        <h1 className = 'font-bold' > { replies.user.username } </h1>
                        { 
                            replies.user.username === user && 
                                <h2 className = 'bg-moderate-blue text-white font-bold px-2 text-sm rounded-sm ' > you </h2> 
                        }
                        <h2 className = 'font-normal opacity-70 text-sm'> { replies.createdAt } </h2>
                    </div>

                    {   
                        replies.user.username !== user  ? 
                        
                        <button 
                            className = {`h-6 flex items-center justify-around p-2 gap-2 text-moderate-blue font-medium
                            ${reply && 'opacity-50'} xs:max-md:hidden  `}
                            onClick = { () => setReply( !reply ) }
                        >
                            <img src = { replyIcon } alt = "" />
                             Reply
                         </button> 
                            
                            :

                        <div className = 'flex xs:max-md:hidden ' >
                                <button 
                                    className = {`h-6 flex items-center justify-around p-2 gap-2 text-soft-red font-medium
                                    ${del && 'opacity-50'}`}
                                    onClick = { () => setDel(!del) }
                                >
                                    <a href = "#delete ">
                                        <img src = { deleteIcon } alt = "" />
                                            Delete
                                    </a>
                                </button> 
                            <button 
                                className = {`h-6 flex items-center justify-around p-2 gap-2 text-moderate-blue font-medium
                                ${ed && 'opacity-50'}`}
                                onClick = { () => setEd(!ed) }
                            >
                                <img src = { editIcon } alt = "" />
                                Edit
                            </button> 
                        </div>
                    }
                </div>

                { 
                    !ed ? 
                        <p className = 'text-base opacity-80 font-thin ' > 
                            <span className = ' text-blue-800 font-bold ' > @{ replies.replyingTo } </span>
                             { editedContent } 
                        </p> 
                            
                            :

                        <div className = 'flex flex-col gap-4' >
                           <textarea 
                                name = "" 
                                id = "" 
                                value = { editedContent } 
                                className = ' cursor-pointer outline-2 border border-light-grayish-blue rounded-md p-2 outline-none' 
                                onChange = { ( e ) => setEditedContent(e.target.value) }  >
                            </textarea> 
                             <div className = 'flex justify-end w-full' >
                                <button  
                                    className = ' w-fit text-white bg-moderate-blue rounded-md py-3 px-4  ' 
                                    onClick = { () => setEd( false ) } >
                                         UPDATE 
                                </button>
                          </div>
                        </div>
                    }
                    <div className = 'md:max-2xl:hidden flex justify-between items-center text-sm ' >
                       <div className = 'flex justify-around gap-3 items-center p-1 bg-light-grayish-blue rounded-lg bg-opacity-30 h-10 '>        
                           <button 
                              disabled = { upVote }
                              onClick = { handleUpVote }
                              >
                               <img 
                                  src = { plusIcon } 
                                  alt = "plus" 
                                  style = {{ filter: !upVote ? 'brightness(0.7)' : 'brightness(1)', }}  
                                    className = 'p-1 saturate-200 contrast-100'
                                  />
                             </button>

                              <h1 className = ' font-bold text-moderate-blue '> { count > 0 ? count : 0 } </h1>

                             <button
                               disabled = { downVote || count == 0 }
                                onClick = { handleDownVote }
                            >
                            <img
                                src = { minusIcon } 
                                alt = "minus"
                                style = {{ filter: !downVote ? 'brightness(0.7)' : 'brightness(1)', }}
                                className = 'p-1 saturate-200 contrast-100'  
                              />
                            </button>
                        </div>

                        {   
                          replies.user.username !== user  ? 
                        
                          <button 
                            className = {`h-6 flex items-center justify-around p-2 gap-2 text-moderate-blue font-medium
                            ${reply && 'opacity-50'}  `}
                            onClick = { () => setReply( !reply ) }
                            >
                             <img src = { replyIcon } alt = "" />
                              Reply
                          </button> 
                            
                            :

                            <div className = 'flex ' >
                                <button 
                                    className = {`h-6 flex items-center justify-around p-2 gap-2 text-soft-red font-medium
                                    ${del && 'opacity-50'}`}
                                    onClick = { () => setDel(!del) }
                                    >
                                        <a href = "#delete">
                                            <img src = { deleteIcon } alt = "" />
                                                Delete
                                        </a>
                                    </button> 
                             <button 
                                    className = {`h-6 flex items-center justify-around p-2 gap-2 text-moderate-blue font-medium
                                    ${ed && 'opacity-50'}`}
                                    onClick = { () => setEd(!ed) }
                             >
                                <img src = { editIcon } alt = "" />
                                Edit
                            </button> 
                        </div>
                    }
                   </div>
                </div>
            </div>
        { 
            reply && 
                <CommentForm 
                    replyingTo = { replies.user.username } 
                    replies = { parent } 
                    setBackendReplies = { setParent } 
                    setReply = { setReply } 
                    comment = { false } />
        }

        {
            del && 
                    <>
                        <div className = 'absolute top-0 left-0 w-full h-full z-10  overflow-hidden  bg-black opacity-50'>
                        </div>
                        <div className = 'absolute top-0 left-0  w-full h-full z-20  flex  items-center justify-center p-4' id = 'delete'  >
                            <div className = 'bg-white w-[26%] h-2/5 rounded-md flex flex-col justify-around p-8 items-start xs:max-md:w-full xs:max-md:h-1/6 ' >
                                <h2 className = 'font-bold text-xl text-grayish-blue ' > Delete Comment </h2>
                                <p className = 'text-grayish-blue'> Are you sure you want to delete this comment? This will remove the comment and can't be undone. </p>
                                  <div className = "flex gap-2" onAbort={() => setDel(!del)} >
                                    <button 
                                        className = 'bg-grayish-blue text-white rounded-md px-4 py-3 text-base '
                                         onClick = { () => setDel( !del )
                                        }
                                    > NO, CANCEL </button>
                                    <button 
                                        className = 'text-white bg-soft-red rounded-md px-4 py-3 text-base '
                                        onClick = { handleDelete } 
                                    > YES, DELETE </button>
                            </div>
                        </div>
                 </div>
            </>
        }
    </>
  )
}

export default Reply

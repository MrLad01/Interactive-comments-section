import React, {  useContext, useEffect, useState, SetStateAction } from 'react'

import plusIcon from '../../assets/images/icon-plus.svg';
import minusIcon from '../../assets/images/icon-minus.svg';
import replyIcon from '../../assets/images/icon-reply.svg';
import deleteIcon from '../../assets/images/icon-delete.svg';
import editIcon from '../../assets/images/icon-edit.svg';

import { Comment1 } from './Comments';
import CommentForm from './CommentForm';
import Reply from './Reply';

import { CommentContext } from '../../App';

import { deleteComment } from '../../helpers';



interface CommentProps {
    comment: Comment1;
    parent: Comment1[];
    setParent: React.Dispatch<SetStateAction<Comment1[]>>;
}


export interface Reply1 {
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
}



const Comment: React.FC<CommentProps> = ( { comment, parent, setParent } ) => {

    const [ backendReplies, setBackendReplies ] = useState<Reply1[]>([])

    const [ upVote, setUpVote ] = useState<boolean>(false);
    const [ downVote, setDownVote ] = useState<boolean>(false); 
    const [ count, setCount ] = useState<number>( comment.score );
    const [ editedContent, setEditedContent ] = useState<string>( comment.content );

    const [ reply, setReply ] = useState<boolean>(false);
    const [ del, setDel ] = useState<boolean>(false);
    const [ ed, setEd ] = useState<boolean>(false);



    useEffect( () => {
        setBackendReplies( comment.replies )
    }, [ comment ] )
  
    
    const user = useContext( CommentContext );
    


    const handleUpVote = () => {
        
        setDownVote( false )

        if ( downVote ){
            setDownVote( false )
            setCount( count + 1 )

        } else if ( !upVote ) {   
            setUpVote( true )
            setCount( count + 1 )

        }

        else {
            setCount( count - 1 )
        }
    }

    
    const handleDownVote = () => {
        
        setUpVote( false )

        if ( upVote ){
            setUpVote( false )
            setCount( count - 1 )

        } else if ( !downVote ) {   
            setDownVote( true )
            setCount( count - 1 )

        }
        
        else {
            setCount( count + 1 )
        }
    }



    const handleDelete = ( e:React.MouseEvent ) => {
        e.preventDefault();

        setDel(!del);

        deleteComment( comment.id )
            .then( () => {
                            const updatedReplies = parent.filter( reply => reply.id !== comment.id )

                            setParent( updatedReplies )
                        }
                )

    }



  return (
    <>
        <div 
            className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-6 mb-4 ' 
            key = { comment.id } 
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
                    <h2>  </h2>
                </button>

                <h1 className = ' font-bold text-moderate-blue ' > { count > 0 ? count : 0 } </h1>

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
                    <h2>  </h2>
                </button>
            </div>

            <div className = 'flex flex-col gap-2 h-fit w-full pb-4 ' >
                <div className = 'flex justify-between w-full  ' >
                    <div className = 'flex justify-around items-center gap-4'>
                        <img 
                            src = { `../../src/assets/${comment.user.image.png}` }  
                            alt = "" 
                            className = 'w-8 h-8' 
                        />

                        <h1 className = 'font-bold' > { comment.user.username } </h1>

                        { comment.user.username === user && 
                        
                            <h2 className = 'bg-moderate-blue text-white font-bold px-2 text-sm rounded-sm' >
                                 you 
                            </h2> 
                        }

                        <h2 className = 'font-normal opacity-70 xs:max-md:text-sm' > { comment.createdAt } </h2>
                    </div>

                    { 
                        comment.user.username !== user  ? 
                        
                            <button 
                                className = {`h-6 flex items-center justify-around p-2 gap-2 text-moderate-blue font-medium 
                                ${reply && 'opacity-50'} xs:max-md:hidden `}
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
                                onClick = {  handleDelete }
                            >
                                <img src = { deleteIcon } alt = "" />
                                Delete
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
                            <p className = 'text-base opacity-80 font-thin ' >  { editedContent } </p>
                        :
                            <div className = 'flex flex-col gap-4' >
                                <textarea 
                                    name="" 
                                    id="" 
                                    value = { editedContent }
                                    className = ' cursor-pointer outline-2 border border-light-grayish-blue rounded-md p-2 outline-none' 
                                    onChange = { ( e ) => setEditedContent( e.target.value ) }  ></textarea> 
                                <div className = 'flex justify-end w-full' >
                                    <button  
                                        className = ' w-fit text-white bg-moderate-blue rounded-md py-3 px-4   ' 
                                        onClick = { () => setEd( false ) } 
                                    >
                                        UPDATE 
                                    </button>
                                </div>
                            </div>
                }
                <div className = 'md:max-2xl:hidden flex justify-between items-center text-sm' >
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
                                 <h2>  </h2>
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
                             <h2>  </h2>
                            </button>
                        </div>

                        {   
                          comment.user.username !== user  ? 
                        
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
                                 onClick = {  handleDelete }
                                >
                                    <img src = { deleteIcon } alt = "" />
                                     Delete
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

        <div className = 'flex'>
            
            <div className = 'w-[5px] mx-12 xs:max-md:mx-3 mb-4 bg-light-gray py-1'></div>
            
            <div className = 'grid' >
              
                {
                    backendReplies.map( ( backendReply ) =>
                        <Reply 
                            key = { backendReply.id }  
                            replies = {backendReply}
                            parent = { backendReplies }
                            setParent = { setBackendReplies }
                        />
                    )
                }
            </div>

        </div>

        { reply && 
                <CommentForm  
                    replyingTo = { comment.user.username }  
                    replies = { backendReplies } 
                    setBackendReplies = { setBackendReplies } 
                    setReply = { setReply }  
                    comment = { false }  
                />
        }
    </>
  )
}

export default Comment

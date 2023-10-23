import  React, { useState }  from 'react';

import plusIcon from '../assets/images/icon-plus.svg';
import minusIcon from '../assets/images/icon-minus.svg';
import replyIcon from '../assets/images/icon-reply.svg';

import avatar from '../assets/images/avatars/image-amyrobson.png';
import avatar2 from '../assets/images/avatars/image-juliusomo.png'; 


export default function CommentBox({ data }): React.ReactElement {

    const [ user, setUser ] = useState<string>("")

    const [ upVote, setUpVote ] = useState<boolean>(false);
    const [ downVote, setDownVote ] = useState<boolean>(false); 
    const [ post, setPost ] = useState<string>("");

    const [ count, setCount ] = useState<number>(1);
    const [ reply, setReply ] = useState<boolean>(false);
    const [ replyText, setReplyText ] = useState<string>(" ");

 

    const handleSubmit =  ( event: React.FormEvent )  => {
        event.preventDefault()
        setPost(replyText)
    }
    



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



const result = data.comments.map( usern =>  (
        <>
            <div className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-6 mb-2 '>
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

                    <h1> { usern.score > 0 ? usern.score : 0 } </h1>


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
                            <img src = { `../assets/${usern.user.image.png}` } alt = "" className = 'w-9 h-9' />
                            <h1 > { usern.user.username } </h1>
                        </div>

                        <button 
                            className = 'h-6 flex items-center justify-around p-2 gap-2'
                            onClick = { () => setReply(!reply) }
                        >
                            <img src = { replyIcon } alt = "" />
                            Reply
                        </button>
                    </div>

                    <p> { usern.content } </p>
                </div>
            </div>
            {
                reply &&  
                <>
                { post ? 
                <div className = 'flex h-fit' >
                    <div className = 'h-full mx-10 my-3 w-[3px] bg-black ' >.</div>
                    <div className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-6 my-3 '>
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
                            <img src = { avatar2 } alt = "" className = 'w-9 h-9' />
                            <h1> { user } </h1>
                        </div>

                        <button 
                            className = 'h-6 flex items-center justify-around p-2 gap-2'
                            onClick = { () => setReply(!reply) }
                        >
                            <img src = { replyIcon } alt = "" />
                            Reply
                        </button>
                    </div>

                    <p> { replyText } </p>
                </div>
                </div>
                </div> : 
                <form action = 'post' onSubmit = { handleSubmit } className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-4 mt-2 justify-around'>
                    <img src = { avatar2 } alt = ""  className = 'w-12 h-12' />
                    <textarea name = "" id = "" className = 'w-full h-28 py-3 px-6 outline-1 border-2 rounded-lg' onChange = { (e) => setReplyText(e.target.value) } ></textarea>
                    <button className = 'py-1 px-8 bg-slate-400 h-11 rounded-lg ' > REPLY </button>
                </form>}
                </>
            }
        </>
    ))

    return(
        <>
         {result}
        </>
    )
}

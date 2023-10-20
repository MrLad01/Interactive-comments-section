import  React, { useState }  from 'react';

import plusIcon from '../assets/images/icon-plus.svg';
import minusIcon from '../assets/images/icon-minus.svg';
import replyIcon from '../assets/images/icon-reply.svg';

import avatar from '../assets/images/avatars/image-amyrobson.png';
import avatar2 from '../assets/images/avatars/image-juliusomo.png'; 


export default function CommentBox(): React.ReactElement {

    const [ upVote, setUpVote ] = useState<boolean>(false);
    const [ downVote, setDownVote ] = useState<boolean>(false); 

    const [ count, setCount ] = useState<number>(1);
    const [ reply, setReply ] = useState<boolean>(false);


    return (
        <>
            <div className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-6'>

                <div className = 'flex flex-col justify-around gap-4 items-center p-3 bg-light-grayish-blue rounded-2xl bg-opacity-30 h-28' >        
                    <button 
                            disabled = { upVote }
                            onClick = { () => {
                                                setUpVote( true )
                                                setDownVote(false)
                                                setCount( downVote ? count + 2 : count + 1 )
                                        }
                                      }
                    >
                        <img 
                            src = { plusIcon } 
                            alt = "plus" 
                            style = {{ filter: !upVote ? 'brightness(0.7)' : 'brightness(1)', }}  
                        />
                        <h2>  </h2>
                    </button>

                    <h1> { count > 0 ? count : 0 } </h1>


                    <button
                            disabled = { downVote }
                            onClick = { () => {
                                                setDownVote( true )
                                                setUpVote(false)
                                                setCount( upVote ? count - 2 : count - 1 )
                                                }    
                                         }
                    >
                        <img
                             src = { minusIcon } 
                             alt = "minus"
                             style = {{ filter: !downVote ? 'brightness(0.7)' : 'brightness(1)', }}  
                        />
                        <h2>  </h2>
                    </button>
                </div>

                <div className = 'flex flex-col gap-2 h-32 w-full ' >

                    <div className = 'flex justify-between w-full  ' >
                        <div className = 'flex justify-around items-center'>
                            <img src = { avatar } alt = "" className = 'w-9 h-9' />
                            <h1> Hello world! </h1>
                        </div>

                        <button 
                                className = 'bg-slate-400 h-6 flex items-center justify-around p-2 gap-1'
                                onClick = { () => setReply(!reply) }
                        >
                            <img src = { replyIcon } alt = "" />
                            Reply
                        </button>
                    </div>

                    <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt nihil qui non molestiae! Iste nam voluptate aliquam expedita, qui repudiandae, quisquam architecto voluptatem sit quidem ipsam eligendi ab numquam! Sequi, repellat? </p>
                </div>
            </div>

            {
                reply &&  <div className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-6 mt-2 justify-around'>
                    <img src = { avatar2 } alt = "" />
                    <button></button>
                </div>

            }
        </>
    )
}

import  React, { useState }  from 'react';
import plusIcon from '../assets/images/icon-plus.svg';
import minusIcon from '../assets/images/icon-minus.svg';


export default function CommentBox(): React.ReactElement {

    const [ upVote, setUpVote ] = useState<boolean>(false);
    const [ downVote, setDownVote ] = useState<boolean>(false); 

    const [ count, setCount ] = useState<number>(1);

    return (
        <>
            <div className = 'w-full h-fit bg-white p-5 rounded-lg flex'>

                <div className = 'flex flex-col justify-around gap-4 items-center p-3 bg-light-grayish-blue rounded-2xl bg-opacity-30' >        
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


                <h1> Hello world! </h1>
            </div>
        </>
    )
}

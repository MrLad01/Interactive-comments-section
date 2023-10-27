import data from './assets/data.json'


const user = data.currentUser;


async function addReply({ text, parentUsername }) {
    const data1 = {
        "id": 3,
        "content": { text },
        "createdAt": "1 week ago",
        "score": 0,
        "replyingTo": { parentUsername } ,
        "user": {
          "image": { 
            "png": {  },
            "webp": { }
          },
          "username": { user }
        }
      }

    return (
        { data1 }
    )
} 


export default addReply;
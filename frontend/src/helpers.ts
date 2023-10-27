import data from './assets/data.json'


const user = data.currentUser;
const png = data.currentUser.image.png;
const webp = data.currentUser.image.webp;



async function addReply(text: string, parentUsername: string):Promise<void> {
    const data1 = {
        "id": 3,
        "content": { text },
        "createdAt": "1 week ago",
        "score": 0,
        "replyingTo": { parentUsername } ,
        "user": {
          "image": { 
            "png": { png  },
            "webp": { webp }
          },
          "username": { user }
        }
      }

    return 
        { data1 }
    
} 


export default addReply;
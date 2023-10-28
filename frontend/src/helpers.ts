import data from './assets/data.json'


const user = data.currentUser.username;
const png = data.currentUser.image.png;
const webp = data.currentUser.image.webp;



 export default async function addReply( id: number, content: string, replyingTo: string ) {
  
  const data1 = {
        "id": id,
        "content":  content ,
        "createdAt": "1 week ago",
        "score": 0,
        "replyingTo":  replyingTo  ,
        "user": {
          "image": { 
            "png":  png  ,
            "webp":  webp 
          },
            "username":  user 
        }
      }

  return  data1; 
} 

export async function deleteReply( id: number ) {
    
  const data1 = {
      "id": id,
      "content":  String ,
      "createdAt": "1 week ago",
      "score": 0,
      "replyingTo":  String  ,
      "user": {
      "image": { 
          "png":  png  ,
          "webp":  webp 
      },
          "username":  user 
      }
  }

  return  data1;
} 

export async function editReply(id: number) {
    const data1 = {
        "id": id,
        "content":  String ,
        "createdAt": "1 week ago",
        "score": 0,
        "replyingTo":  String  ,
        "user": {
          "image": { 
            "png":  png  ,
            "webp":  webp 
          },
            "username":  user 
        }
      }

    return  data1;
    
} 



export async function addComment(id: number, content:string ) {
  const data1 = {
    "id": id,
    "content": content,
    "createdAt": "1 month ago",
    "score": 0,
    "user": {
      "image": { 
        "png": png,
        "webp": webp
      },
      "username": user
    },
    "replies": []
  }

  return  data1;
  
} 


export async function deleteComment( id: number ) {
  
  const data1 = {
    "id": id,
    "content": String,
    "createdAt": "1 month ago",
    "score": 0,
    "user": {
      "image": { 
        "png": png,
        "webp": webp
      },
      "username": user
    },
    "replies": []
  }

  return  data1;
  
} 
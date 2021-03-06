import React,{useState} from "react";
import Api from "../generic-services/api";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AttachmentIcon from '@mui/icons-material/Attachment';
import placeholder from '../Sample_User_Icon.png';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import {useSelector} from "react-redux";
import DeleteDialog from "./delete-dialog";

export function PostCard (props) {
  let user = useSelector((state => state.user.user))
  const [Comments,setComments] = useState(props.post.postComments)
  let [comment,setComment] = useState('')
  let [initialComment,setInitialComments] = useState(2)
  const handleKeypress = e => {
    if (e.charCode === 13) {
      postComment();
    }
  };

  function forceDown(url, filename) {
    fetch(url).then(function(t) {
      return t.blob().then((b) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      });
    });
  }

  function postComment() {
    if (comment.length > 0) {
      const postId = props.post.id
      Api.execute(`/api/class/post/${postId}/comment`, 'post', {
        comment
      }).then(res => {
        setComments([res.data.postComment, ...Comments])
        setComment('')
      }).catch(err => {
        console.log(err);
      })
    }
  }
  function deleteComment(commentId){
    Api.execute(`/api/class/post/comment/${commentId}`, 'put')
      .then(res => {
        console.log('deleted');
        const temp = Comments.filter(c=> c.id !== commentId);
        setComments(temp)
      }).catch(err => {
      console.log(err);
    })
  }
  return (
      <div className="flex flex-col p-4 max-w-full bg-white rounded-lg border-2 border-gray-200 shadow-sm flex justify-between item-center overflow-auto">
        <div className="flex items-center mb-3">
          <img src={props.post.user.imageUrl ?? placeholder } alt="profile" className="w-10 h-10 rounded-full object-cover"/>
          <div className="ml-5">
          <p className="text-sm">{props.post.user.name}</p>
            <p className="text-xs text-gray-500"> {props.post.startingTime.split('T')[0]}</p>
          </div>
        </div>
        <div>
          <h5 className="mb-2 font-sm text-gray-900 truncate">{props.post.body}</h5>
        </div>
        <div>

          {props.post.postAttachments?.length > 0  &&
              <div>
                <div className={"text-gray-500 text-sm space-y-2"}>
                  <hr className="mt-2"/>
                  {props.post.postAttachments?.map(p => (
                    <a className="flex w-full mt-5" key={p.file.id} href={p.file.publicUrl} target='_blank' rel='noreferrer'>
                      <div className="flex flex-col justify-center mr-2">
                      <AttachmentIcon className="rotate-45 text-gray-300"/>
                      </div>
                        <div className="w-full pl-1 border border-indigo-50 rounded flex justify-between">
                        <div key={p.file.id} className="flex flex-col justify-center">
                        <p>{p.file.originalName}</p>
                        </div>

                        <div onClick={()=>forceDown(`${p.file.publicUrl}`,p.file.originalName ?? 'test')}>
                          <IconButton size="small"><DownloadIcon/></IconButton>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
          }
          {/*comment section*/}
          <hr className="mt-2"/>
          <div className="flex justify-between">
          <h5 className="mt-2 text-sm font-semibold text-gray-900 truncate">Comments</h5>
            { Comments && Comments.length>0 &&
              <h5 className="mt-2 text-sm font-semibold text-gray-900 truncate mr-4">Total Comments: {Comments.length}</h5>
            }
          </div>
          {
            Comments?.length > 0 ?
            <div>
              {Comments.slice(0,initialComment??Comments.length).map(com => {
                return (<div className="flex flex-row mt-2" key={com.id}>
                  <img alt="profile" src={com?.user?.imageUrl ?? placeholder} className="w-8 h-8 min-w-8 min-h-8 rounded-full object-cover"/>
                  <div className="ml-2 shadow rounded-2xl bg-slate-50 px-2 py-1 w-full flex flex-row justify-between">
                    <div className="flex flex-col">
                      <p className="text-xs text-gray-900 font-medium">{com.user.name}</p>
                      <p className="text-xs text-gray-600 truncate">{com.body}</p>
                    </div>
                    {/*check if comment is of current user give delete access (if com.user.id === current_user_id*/}
                    {user.id === com.user.id &&
                        <DeleteDialog actionDone={() => {deleteComment(com.id)}}>
                          <IconButton style={{padding: 0}}>
                            <RemoveCircleOutlineIcon className="text-red-500" style={{height: '1.3rem'}}/>
                          </IconButton>
                        </DeleteDialog>
                    }
                  </div>
                </div>)
              })
}
              {
                initialComment && Comments.length > initialComment &&
                  <Button style={{marginTop:'3px',textDecoration:'underline',backgroundColor:'transparent'}} size='small' onClick={()=>setInitialComments(null)}>show all comments</Button>
              }
              {
                !initialComment &&
                <Button style={{marginTop:'3px',textDecoration:'underline',backgroundColor:'transparent'}} size='small' onClick={()=>setInitialComments(2)}>show less</Button>
              }

            </div>
              :
              <div>
               <></>
              </div>
          }
          <div className="flex flex-row mt-2">
            <img alt="profile" src={user.imageUrl ?? placeholder} className="w-8 h-8 min-w-8 min-h-8 rounded-full object-cover"/>
            <div className="ml-2 shadow rounded-2xl bg-slate-50 px-2 w-full flex flex-row justify-between">
              <input type='text' onKeyPress={handleKeypress} placeholder="write your comment here" value={comment} onChange={(e)=>setComment(e.target.value)} className="text-sm h-10 w-full border-0 bg-transparent"/>
              <IconButton style={{padding:0}} onClick={()=>postComment(props.post.id)} disabled={comment.length<1}>
                <SendIcon style={{width:'1.3rem'}} className="rotate-[-45deg]"/>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
  )
}

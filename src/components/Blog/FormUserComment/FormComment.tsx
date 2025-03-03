// import React from 'react'

import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { fetchUpdateComment } from "../../../slices/commentSlice";
import { useDispatch } from "react-redux";
import { commentResponseI, newCommentRequestI } from "../../../types/comment";
import { ReplyCardDTO, ReplyCreateRequestDTO } from "../../../types/reply";
import { fetchCreateReplyT, fetchUpdateReplyT } from "../../../slices/replySlice";

interface BaseFormCommentProps {
    blogId?: string | number;
    commentId?: string | number;
    replyId?: string | number;
    type?: string;
    placeholder?: string;
    buttonText?: string;
    contentData?: any;
    onCloseModal?: () => void;
    onUpdateComment?: (updatedComment: commentResponseI) => void;
    onUpdateReply?: (updatedReply: ReplyCardDTO) => void;
    onCreateReply?: (createdReply: ReplyCardDTO) => void;
}
  
type FormCommentProps<T = {}> = BaseFormCommentProps & T;

const FormComment =  <T extends object>(props: FormCommentProps<T>) => {

    /**
     * redux section
     */
    const dispatch = useDispatch<AppDispatch>();
    const userIdAuth = useSelector((state: RootState) => state.auth.userId);

    /**
     * state section
     */
    const [newContent, setNewContent] = useState<string>(props?.contentData?.content || props?.contentData || '');


    /**
     * functions section
     */
    // get value from input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewContent(event.target.value); 
    };

    // save data with multiple options
    const handleSave = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newContent.trim()) return;
    
        let newContentRequest = {};

  
    
        try {
          switch (props.type) {
            case 'editComment': // this means that we are editing a comment
                if (!props?.contentData?.commentId) {
                    console.error('commentId is required for editComment');
                    return;
                }

                newContentRequest = {
                  blogId: props.blogId,
                  userId: userIdAuth,
                  content: newContent,
                //   ...restProps
                };
                const updatedComment = await dispatch(
                    fetchUpdateComment({
                    commentId: props?.contentData.commentId,
                    commentData: newContentRequest as newCommentRequestI,
                    })
                ).unwrap();
                console.log('Comment updated successfully', props?.contentData);
          
                const updatedCommentResponse: commentResponseI = {
                    commentId: props.contentData.commentId, 
                    content: updatedComment.content, 
                    userId: props.contentData.userId,
                    blogId: props.contentData.blogId,
                    profilePicture: props.contentData.profilePicture,
                    username: props.contentData.username, 
                    updatedAt: new Date().toISOString(),
                };
                
                console.log('Updated Comment Response:', updatedCommentResponse);
                
                // Actualizar el estado en el padre
                if (props.onUpdateComment) {
                    props.onUpdateComment(updatedCommentResponse);
                }
            break;
    
            case 'createReply': // this means that we are creating a reply

                console.log('createReply', props);
                
              if (!props?.blogId || !userIdAuth || !props?.commentId) {
                console.error('blogId and commentId are required for createReply');
                return;
              }
              
              const newReplyRequest: ReplyCreateRequestDTO = {
                blogId: +props.blogId,
                userId: +userIdAuth,
                commentId: +props?.commentId, // Usa el commentId del comentario al que se responde
                content: newContent,
              };

              const createReplyResponse  = await dispatch(
                fetchCreateReplyT(newReplyRequest) // Pasa el objeto correctamente
              ).unwrap();

              const newReply: ReplyCardDTO = {
                replyId: createReplyResponse.replyId,
                blogId: createReplyResponse.blogId,
                commentId: createReplyResponse.commentId,
                userId: createReplyResponse.userId,
                username: createReplyResponse.username,
                profilePicture: createReplyResponse.profilePicture,
                content: createReplyResponse.content,
                updatedAt: new Date().toISOString(),
              };
            
              if (props.onCreateReply) {
                props.onCreateReply(newReply); // Llama a la función para actualizar el estado en el padre
              }              
                
            break;
    
            case 'editReply': // this means that we are editing a reply
                
                if (!props?.commentId || !props?.replyId) {
                  console.error('commentId is required for editComment');
                  return;
                }
                
                newContentRequest = {
                    commentId: props?.commentId,
                    blogId: props.blogId,
                    userId: userIdAuth,
                    content: newContent,
                }

                const response = await dispatch(
                  fetchUpdateReplyT({
                    replyId: +props?.replyId,
                    replyData: newContentRequest as ReplyCreateRequestDTO,
                  })
                ).unwrap();

                const updatedReply: ReplyCardDTO = {
                  // ...contentData,
                  replyId: response.replyId,
                  blogId: response.blogId,
                  commentId: response.commentId,
                  userId: response.userId,
                  username: response.username,
                  profilePicture: response.profilePicture,
                  content: response.content,
                  updatedAt: new Date().toISOString(),
                };
                console.log('Reply updated successfully', updatedReply);
                if (props?.onUpdateReply) {
                  props?.onUpdateReply(updatedReply); 
                }
        
                
            break;
    
            default:
                console.log('Default');
            break;
        }
    
        // clean input
        setNewContent('');
        if (props.onCloseModal) {
            console.log('onCloseModal');
            props.onCloseModal();
        }
    
        } catch (error) {
            // catch error
            console.error('Error saving comment:', error);
        }
      };


    useEffect(() => {
        if (props?.contentData?.content) {
            setNewContent(props?.contentData?.content);
            console.log('contentData:', props?.contentData?.content);
            
        }
    }, [props?.contentData?.content]);  
    return (
      <div className="flex mx-auto items-center justify-center shadow-lg rounded-md mb-4 w-full ">
              <form 
                onSubmit={handleSave}
                className="w-full max-w-screen-md  bg-white rounded-lg px-4 pt-2"
              >
                  <div className="flex flex-wrap -mx-3 mb-3">
                      <div className="w-full md:w-full px-3 mb-2 mt-2 flex">
                          <div className="flex flex-shrink-0 self-start cursor-pointer mr-2">
                              <img
                                  src="https://images.unsplash.com/photo-1551122089-4e3e72477432?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cnVieXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                  alt=""
                                  className="h-8 w-8 object-fill rounded-full"
                              />
                          </div>
                            <input
                                type="text"
                                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" 
                                value={newContent}
                                onChange={handleInputChange}
                                placeholder={props?.placeholder}
                              />
                      </div>
                      <div className="w-full md:w-full flex justify-end items-start px-3">
                          <div className="-mr-1">
                            <button
                              type="submit"
                              disabled={!newContent.trim()}
                              className=
                              {`
                                px-6 py-2 mb-2 w-34 bg-blue-500 text-white text-sm rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300

                                ${!newContent.trim()
                                  ? 'opacity-50 cursor-not-allowed' 
                                  : 'hover:bg-blue-700' 
                                }
                              `
                            }
                            >
                              {props?.buttonText}
                            </button>
                          </div>
                      </div>
                  </div>
              </form>
            </div>
  )
}

export default FormComment
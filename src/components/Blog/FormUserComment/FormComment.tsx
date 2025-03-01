// import React from 'react'

import { useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { fetchUpdateComment } from "../../../slices/commentSlice";
import { useDispatch } from "react-redux";
import { commentResponseI, newCommentRequestI } from "../../../types/comment";

interface BaseFormCommentProps {
    blogId?: string | number;
    type?: string;
    placeholder?: string;
    buttonText?: string;
    contentData?: any;
    onCloseModal?: () => void;
    onUpdateComment?: (updatedComment: commentResponseI) => void;
}
  
  // Creamos un tipo genérico que extiende la interfaz base
  // T puede ser cualquier objeto con propiedades adicionales
  type FormCommentProps<T = {}> = BaseFormCommentProps & T;

const FormComment =  <T extends object>(props: FormCommentProps<T>) => {

    const dispatch = useDispatch<AppDispatch>();

    const userIdAuth = useSelector((state: RootState) => state.auth.userId);

    const [newContent, setNewContent] = useState<string>(props?.contentData?.content || '');


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewContent(event.target.value); 
    };

    const handleSave = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newContent.trim()) return;
    
        const newCommentRequest = {
          blogId: props.blogId,
          userId: userIdAuth,
          content: newContent,
        //   ...restProps
        };
    
        try {
          switch (props.type) {
            case 'editComment':
                if (!props?.contentData?.commentId) {
                    console.error('commentId is required for editComment');
                    return;
                  }
                  const updatedComment = await dispatch(
                    fetchUpdateComment({
                      commentId: props?.contentData.commentId,
                      commentData: newCommentRequest as newCommentRequestI,
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
    
            case 'createReply':
              console.log('Create Reply');
              // Lógica para crear una respuesta
              break;
    
            case 'editReply':
              console.log('Edit Reply');
              // Lógica para editar una respuesta
              break;
    
            default:
              console.log('Default');
              break;
          }
    
          // Limpiar el campo de entrada después de guardar
          setNewContent('');
          if (props.onCloseModal) {
            console.log('onCloseModal');
            
            props.onCloseModal();
          }
    
          // Llamar a onSubmit si está definido
        //   if (onSubmit) {
        //     onSubmit(newCommentRequest);
        //   }
        } catch (error) {
          console.error('Error saving comment:', error);
        }
      };

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
                                bg-blue-500 text-white font-bold py-2 px-4 rounded

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
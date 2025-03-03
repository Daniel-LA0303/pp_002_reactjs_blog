import { useSelector } from "react-redux";
import { ReplyCardDTO } from "../../types/reply";
import { formatDateTime } from "../../utils/dateUtils";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { Button, IconButton, MenuItem, Menu } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import ModalGlobal from "../MultipleUtils/ModalGlobal/ModalGlobal";
import FormComment from "./FormUserComment/FormComment";

interface ReplyCommentProps {
  reply: ReplyCardDTO; 
  onUpdateReply?: (updatedReply: ReplyCardDTO) => void;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({reply, onUpdateReply}) => {

  // redux state
  const userIdAuth = useSelector((state: RootState) => state.auth.userId);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // global modal
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);

  // current data to pass to the multiple modal
  const [currentData, setCurrentData] = useState<any | null>(null);

  // open the menu
  const handleClickOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // close the menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Función para eliminar la respuesta
  // const handleDeleteReply = () => {
  //   console.log('Eliminar respuesta:', reply.replyId);
  //   // Aquí puedes llamar a tu función para eliminar la respuesta
  //   handleCloseMenu();
  // };

  // function to edit the reply
  const handleEditReply = () => {
    handleCloseMenu();
  };

  // this function is to open the global
  const handleOpenGlobalModal = (reply: any) => {
    setCurrentData(reply);
    setIsGlobalModalOpen(true);
  };
  
  // this function is to close the global modal
  const handleCloseGlobalModal = () => {
    setCurrentData(null);
    setIsGlobalModalOpen(false);
  };

  return (
    <div className="flex items-center space-x-2 ml-10">

      <ModalGlobal
        isOpen={isGlobalModalOpen}
        onClose={handleCloseGlobalModal}
        title="Formulario de Registro"
        maxWidth="md"
      >
        <FormComment  
          blogId={reply?.blogId}
          commentId={reply?.commentId}
          replyId={reply?.replyId}
          type="editReply"
          placeholder="Edit your reply"
          buttonText="Edit Reply"
          contentData={currentData}
          onCloseModal={handleCloseGlobalModal}
          onUpdateReply={onUpdateReply}
          // onUpdateComment={handleUpdateComment}
        />
      </ModalGlobal>

      <div className="flex flex-shrink-0 self-start cursor-pointer">
        <img
          src="https://images.unsplash.com/photo-1609349744982-0de6526d978b?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="h-8 w-8 object-cover rounded-full"
        />
      </div>

      <div className="flex items-center justify-center space-x-2 w-full">
        <div className="block w-full">
          <div className="bg-gray-100 w-full rounded-xl px-2 pb-2">
            <div className="font-medium flex items-center justify-between">
              
              <div>
                <Link to={`/profile/${reply.userId}`} className="hover:underline text-sm">
                  <small>{reply?.username}</small>
                </Link>
              </div>

              <div>
                {/* Menú de opciones (editar y eliminar) */}
                {accessToken && userIdAuth === reply.userId && (
                  <div className="ml-auto">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={handleClickOpenMenu}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClickOpenMenu}
                      disableScrollLock
                    >
                      <MenuItem onClick={handleEditReply}>
                        <Button
                          onClick={() => {
                            handleCloseMenu();
                            handleOpenGlobalModal(reply?.content);
                          }}
                          variant="text"
                          size="small"
                          startIcon={<EditIcon fontSize="small" />}
                        >
                          Edit
                        </Button>
                      </MenuItem>
                      {/* <MenuItem onClick={handleDeleteReply}>
                        <Button
                          variant="text"
                          size="small"
                          startIcon={<DeleteIcon fontSize="small" />}
                        >
                          Delete
                        </Button>
                      </MenuItem> */}
                    </Menu>
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs">{reply.content}</div>
          </div>
          <div className="flex justify-start items-center text-xs w-full">
            <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
              <a href="#" className="hover:underline">
                <small>{formatDateTime(reply?.updatedAt)}</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;

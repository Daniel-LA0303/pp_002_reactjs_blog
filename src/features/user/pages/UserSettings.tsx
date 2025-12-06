/**
 * react
 */
import React, { useContext, useEffect, useState } from "react";

/**
 * redux
 */
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { fetchGetUpdateUserInfoToolkit, fetchPutUpdatedUserInfoToolkit, resetUserError } from "../store/userSlice";

/**
 * react router dom
 */
import { useNavigate, useParams } from "react-router-dom";

/**
 * types
 */
import { UserUpdateInfoI } from "../types/user";

/**
 * components
 */
import NavBar from "../../../components/NavBar/NavBar";
import Spinner from "../../../components/Spinner/Spinner";
import { AppContext } from "../../../context/AppContext";
import ModalError from "../../../components/Modals/ModalError";

/**
 * Icons
 */
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import apiAuthClient from "../../../services/config-client/apiAuthClient";


const UserSettings: React.FC = () => {

  // context when there is an error
  const { showError, handleCloseModal, openErrorModal, errorModalMessage } = useContext(AppContext);

  // id to get user info to update
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch<AppDispatch>();

  // selector
  const loadingUser = useSelector((state: RootState) => state.user.loading);
  const errorUser = useSelector((state: RootState) => state.user.errorUser);
  const errorMessageUser = useSelector((state: RootState) => state.user.errorMessage);

  // state section
  // form state
  const [formData, setFormData] = useState<UserUpdateInfoI>({
    name: '',
    lastName: '',
    work: '',
    education: '',
    pronouns: '',
    website: '',
    address: '',
    city: '',
    skills: '',
    bio: '',
    profilePicture: ''
  });
  // image selected by user
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);


  // conver id
  const userIdNumber = id ? parseInt(id) : NaN;


  // useEffect section
  // to get one user info
  useEffect(() => {
    if (isNaN(userIdNumber)) {
      console.error("This id is not a number");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await dispatch(fetchGetUpdateUserInfoToolkit(userIdNumber)).unwrap();
        setFormData(response);
        console.log(
          "User info to update:",
          response
        );

      } catch (error) {
        console.log(error);

      }
    }

    fetchData();

  }, [dispatch]);

  // useEffect to show error when there is an error backend
  useEffect(() => {
    if (errorUser) {
      showError(errorMessageUser);
    }
  }, [errorUser]);

  // reset error state redux
  useEffect(() => {
    if (!openErrorModal) {
      dispatch(resetUserError());
    }
  }, [openErrorModal, dispatch]);


  // function section

  // set file in UI
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // remove Image
  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  // submit to backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    let finalProfilePicture = formData.profilePicture;

    try {
      // 1. upload new image if user uploaded
      if (selectedImage) {
        const imageFormData = new FormData();
        imageFormData.append("image", selectedImage);

        const uploadImageResponse = await apiAuthClient.put(
          `/storage/v1/update-upload-image-cloudinary?ownerType=USER&ownerId=${userIdNumber}&categoryStorage=AVATAR`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        finalProfilePicture = uploadImageResponse.data.data.imageURL;
      }

      // 2. set image
      setFormData(prev => ({
        ...prev,
        profilePicture: finalProfilePicture
      }));
      setSelectedImage(null);

      // build info to send
      const updatedUserInfo = {
        ...formData,
        profilePicture: finalProfilePicture,
      };

      // 3. dispatch to update info
      await dispatch(
        fetchPutUpdatedUserInfoToolkit({
          id: userIdNumber,
          userInfoUpdated: updatedUserInfo
        })
      ).unwrap();

      navigate(`/profile/${userIdNumber}`)

    } catch (error) {
      console.error(error);
    }finally{
      setSubmitting(false);
    }
  };


  // prevent errors
  if (loadingUser) return <Spinner />;

  return (
    <div>

      <ModalError
        open={openErrorModal}
        message={errorModalMessage}
        onClose={handleCloseModal}
      />

      <NavBar />

      {submitting && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}

      <div className="mt-20 max-w-screen-lg mx-auto px-2 lg:px-0">

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-1">
              <div className="flex p-4 bg-white rounded-lg">
                <div className="flex w-full flex-col gap-4">

                  <div className="flex gap-4 flex-col items-start">
                    {/* actual image */}
                    <div className="flex flex-col items-start">
                      {!selectedImage && !formData?.profilePicture && (
                        <label
                          className="rounded-full w-32 aspect-square border-2 border-dashed border-gray-400 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer text-gray-500 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition"
                        >
                          <span className="text-xs text-center px-2">Subir Imagen</span>

                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      )}

                      {/* show image */}
                      {(selectedImage || formData?.profilePicture) && (
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 shadow-md cursor-pointer"
                          style={{
                            backgroundImage: selectedImage
                              ? `url(${URL.createObjectURL(selectedImage)})`
                              : `url("${formData?.profilePicture}")`,
                          }}
                          onClick={() => document.getElementById("pfp-input")?.click()}
                        >
                          {/* file input oculto */}
                          <input
                            id="pfp-input"
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <p className="text-gray-900 text-[15px] font-semibold">My photo</p>
                    </div>
                  </div>

                  {/* upload static image */}
                  {!selectedImage && (
                    <label className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg text-center">
                      <span>Upload New Image</span>
                      <input type="file" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}

                  {/* remove image*/}
                  {selectedImage && (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        className="w-full h-40 object-cover rounded"
                      />

                      <button
                        onClick={removeImage}
                        type="button"
                        className="absolute bottom-2 right-2 bg-slate-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-slate-600"
                      >
                        X
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">

              <details className="flex flex-col p-4 bg-white rounded-lg group" open>
                <summary className="flex cursor-pointer items-center justify-between py-2">
                  <p className=" text-lg font-medium">Information</p>
                  <div className=" group-open:rotate-180 transition-transform">
                    <span className="material-symbols-outlined"><ExpandMoreOutlinedIcon fontSize='medium' /></span>
                  </div>
                </summary>

                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex flex-wrap gap-4">
                    <label className="flex flex-col flex-1 min-w-40">
                      <p className="pb-2 text-base font-medium">Name</p>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input h-10 p-[10px] rounded-lg bg-gray-100 border border-gray-200"
                        placeholder="Name"
                      />
                    </label>

                    <label className="flex flex-col flex-1 min-w-40">
                      <p className="pb-2  text-base font-medium">Last Name</p>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-input h-10 p-[10px] rounded-lg bg-gray-100 border border-gray-200"
                        placeholder="Lastname"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col">
                    <p className="pb-2  text-base font-medium">Pronums</p>
                    <input
                      name="pronouns"
                      value={formData.pronouns}
                      onChange={handleChange}
                      className="form-input h-10 p-[10px] rounded-lg bg-gray-100 border border-gray-200"
                      placeholder="He / She"
                    />
                  </label>
                </div>
              </details>

              <details className="flex flex-col p-4 bg-white rounded-lg group border-t">
                <summary className="flex cursor-pointer items-center justify-between py-2">
                  <p className=" text-lg font-medium">Contact and Location</p>
                  <div className=" group-open:rotate-180 transition-transform">
                    <span className="material-symbols-outlined"><ExpandMoreOutlinedIcon fontSize='medium' /></span>
                  </div>
                </summary>

                <div className="flex flex-col gap-4 pt-4">

                  {/* Website */}
                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium">Web Site</p>
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="form-input h-10 p-[10px] rounded-lg bg-gray-100 border border-gray-200"
                      placeholder="https://site.com"
                    />
                  </label>

                  <div className="flex flex-wrap gap-4">
                    <label className="flex flex-col flex-1 min-w-40">
                      <p className="pb-2  text-base font-medium">City</p>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="form-input h-10 p-[10px] rounded-lg bg-gray-100 border border-gray-200"
                        placeholder="City"
                      />
                    </label>

                    <label className="flex flex-col flex-1 min-w-40">
                      <p className="pb-2  text-base font-medium">Address</p>
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-input h-10 p-[10px] rounded-lg bg-gray-100 border border-gray-200"
                        placeholder="My Address"
                      />
                    </label>
                  </div>
                </div>
              </details>

              <details className="flex flex-col p-4 bg-white rounded-lg group border-t">
                <summary className="flex cursor-pointer items-center justify-between py-2">
                  <p className=" text-lg font-medium">Skills</p>
                  <div className=" group-open:rotate-180 transition-transform">
                    <span className="material-symbols-outlined"><ExpandMoreOutlinedIcon fontSize='medium' /></span>
                  </div>
                </summary>

                <div className="flex flex-col gap-4 pt-4">

                  <label className="flex flex-col">
                    <p className="pb-2  text-base font-medium">Skills</p>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      className="form-input h-24 p-4 rounded-lg border bg-background-light dark:bg-background-dark"
                      placeholder="Example: Java, Python, Docker..."
                    ></textarea>
                  </label>

                  <label className="flex flex-col">
                    <p className="pb-2  text-base font-medium">Bio</p>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="form-input h-60 p-4 rounded-lg border bg-background-light dark:bg-background-dark"
                      placeholder="My bio"
                    ></textarea>
                  </label>

                </div>
              </details>

              {/* SUBMIT */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default UserSettings;

/**
 * react
 */
import React, { useContext, useEffect, useState } from "react";

/**
 * redux
 */
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { fetchGetUpdateUserInfoToolkit, fetchPutUpdatedUserInfoToolkit, resetUserError } from "../../slices/userSlice";

/**
 * react router dom
 */
import { useNavigate, useParams } from "react-router-dom";

/**
 * types
 */
import { UserUpdateInfoI } from "../../types/user";

/**
 * components
 */
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner/Spinner";
import { AppContext } from "../../context/AppContext";
import ModalError from "../../components/Tools/ModalError/ModalError";

const UserSettings: React.FC = () => {

  // context when there is an error
  const { showError, handleCloseModal, openErrorModal, errorModalMessage} = useContext(AppContext);

  // id to get user info to update
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch<AppDispatch>();

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
  });
  // image selected by user
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
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
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }  

  // submit to backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    
    // Agregar los datos del formulario
    formDataToSend.append("userData", new Blob([JSON.stringify(formData)], {
      type: "application/json"
    }));
    
    // Agregar la imagen solo si existe
    if (selectedImage) {
      formDataToSend.append("profileImage", selectedImage);
    }
    
    try {

      console.log("FormData to send:", formDataToSend);
      

      const response = await dispatch(
        fetchPutUpdatedUserInfoToolkit({ 
          id: userIdNumber, 
          userInfoUpdated: formDataToSend // Enviamos FormData en lugar del objeto
        })
      ).unwrap();
      
      navigate(`/profile/${userIdNumber}`);
      console.log("Response update user info:", response);
    } catch (error) {
      console.log(error);
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
      <div className="md:min-h-screen flex items-center justify-center mt-20 md:mt-0">

        <div className="container w-full max-w-screen-lg px-2 lg:mx-auto md:flex md:flex-wrap gap-4">
          <div>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 ">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                {/* form */}
                <form 
                  className="lg:col-span-2"
                  onSubmit={handleSubmit}
                >
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                    <div className="md:col-span-3">
                      <label htmlFor="full_name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.name}
                        placeholder="ex: Jhoe"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="full_name">Lastname</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.lastName}
                        placeholder="ex: Dae"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="full_name">Work</label>
                      <input
                        type="text"
                        name="work"
                        id="work"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.work}
                        placeholder="ex: Google"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="full_name">Education</label>
                      <input
                        type="text"
                        name="education"
                        id="education"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.education}
                        placeholder="ex: Harvad"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="full_name">Pronouns</label>
                      <input
                        type="text"
                        name="pronouns"
                        id="pronouns"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.pronouns}
                        placeholder="ex: Jonny"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Website</label>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.website}
                        placeholder="https://www.google.com.mx/"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.address}
                        placeholder="ex: Cll Delante 203 Ensenada, Mexico"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.city}
                        placeholder="ex: New York"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="zipcode">Skills</label>
                      <textarea
                        name="skills"
                        id="skills"
                        className="h-20 max-h-40  border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="ex: My skills are Java, Python, JS"
                        value={formData.skills}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="city">Bio</label>
                      <textarea
                        name="bio"
                        id="bio"
                        className="h-20 max-h-40  border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="ex: This is a simple info bio"
                        value={formData.bio}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="md:col-span-5 cursor-pointer">
                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                      Upload Photo
                    </label>
                    {!selectedImage && (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-slate-300 group cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-7">
                          <svg
                            className="w-10 h-10 text-slate-400 group-hover:text-slate-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          <p className="lowercase text-sm text-gray-400 group-hover:text-slate-600 pt-1 tracking-wider">
                            Select a photo
                          </p>
                        </div>
                        <input type="file" className="hidden" onChange={handleImageChange} />
                      </label>

                    </div>
                    )}
 
                    {selectedImage && (
                      <div className="mt-4 relative">
                        <p className="text-sm text-gray-500">Selected file: {selectedImage.name}</p>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Preview"
                          className="mt-2 w-full h-40  md:h-80 object-cover rounded"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute bottom-2 right-2 bg-slate-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-slate-600 focus:outline-none"
                        >
                          <span className=" text-base font-bold">X</span>
                        </button>
                      </div>
                    )}
                  </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Save Information User
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

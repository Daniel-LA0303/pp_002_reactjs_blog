import React, { useEffect, useState } from "react";
import { UserUpdateInfoRequest, UserUpdateInfoResponse } from "../../types/user";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { fetchGetUpdateUserInfoThunk, fetchPutUpdatedUserInfoThunk } from "../../slices/userSlice";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import { useParams } from "react-router-dom";


const UserSettings = () => {

  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const [userUpdateInfo, setUserUpdateInfo] = React.useState<UserUpdateInfoResponse | null>(null);
  const [formData, setFormData] = useState<UserUpdateInfoResponse>({
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

  const userIdNumber = id ? parseInt(id) : NaN;


  useEffect(() => {
    if (isNaN(userIdNumber)) {
      console.error("El ID de usuario no es válido");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await dispatch(fetchGetUpdateUserInfoThunk(userIdNumber)).unwrap();
        setUserUpdateInfo(response);
        setFormData(response);
        console.log(response);
        
      } catch (error) {
        console.log(error);
        
      }
    }

    fetchData();

  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }  

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formData);
      
      try {
        const response = await dispatch(fetchPutUpdatedUserInfoThunk({ id: 100, userInfoUpdated: formData })).unwrap();
        console.log(response);
        
      } catch (error) {
        console.log(error);
        
      }
    }

  if (loading) return <Spinner />;
  if (error) return <Error />;

  return (
    <div>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Responsive htmlForm
            </h2>
            <p className="text-gray-500 mb-6">
              htmlForm is mobile responsive. Give it a try.
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

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

                    <div className="md:col-span-5">
                      <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                        Upload Photo
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-slate-300 group">
                          <div className="flex flex-col items-center justify-center pt-7">
                            <svg
                              className="w-10 h-10 text-slate-400 group-hover:text-slate-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                            <p className="lowercase text-sm text-gray-400 group-hover:text-slate-400 pt-1 tracking-wider">
                              Select a photo
                            </p>
                          </div>
                          <input type="file" className="hidden" />
                        </label>
                      </div>
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

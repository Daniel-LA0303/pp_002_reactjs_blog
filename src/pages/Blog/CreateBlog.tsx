/**
 * react
 */
import React, { useEffect, useState } from "react";

/**
 * redux
 */
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../slices/categorySlice";
import { fetchCreateBlog, resetError } from "../../slices/blogSlice";

/**
 * react router dom
 */
import { useNavigate } from "react-router-dom";

/**
 * types and dependencies
 */
import { ApiResponse, CategoriesSelect, CategoriesSelectedInterface } from "../../types/category"; 
import { CreateBlogRequestI, CreateBlogValidationErrorResponseI } from "../../types/blog";
import { MultiSelect } from "react-multi-select-component";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * components
 */
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner/Spinner";

// modules of react quill
const modules = {
  toolbar: {
      container: [
          [{ header: [1, 2, 3, false] }], 
          ["bold", "italic", "underline", "strike"], 
          [{ align: [] }],
          ["link", "image", "video"], 
          [{ list: "ordered" }, { list: "bullet" }], 
          ["clean"], 
      ],
  },
};



const CreateBlog: React.FC = () => {

  /**
   * navigate
   */
  const navigate = useNavigate();

  /**
   * state redux
   */
  const dispatch = useDispatch<AppDispatch>();

  // redux category
  const loadingCategories = useSelector((state: RootState) => state.categories.loading);
  const errorCategory = useSelector((state: RootState) => state.categories.error);

  // redux blog
  const loadingCreateBlog = useSelector((state: RootState) => state.blog.loading);
  const errorCreateBlog = useSelector((state: RootState) => state.blog.errorBlog);
  const errorMessageBlog = useSelector((state: RootState) => state.blog.errorMessage);

  /**
   * state section
   */
  // show options of categories
  const [options, setOptions] = useState<CategoriesSelect[]>([]);
  // categories selected by user
  const [categoriesSelected, setCategoriesSelected] = useState<CategoriesSelectedInterface[]>([]);
  // check or validate if user choosed a category
  const [categoriesIsEmpty, setCategoryIsEmpty] = useState<Boolean>(false);
  // content of blog
  const [content, setContent] = useState('');
  // image selected by user
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // data that we send to backend
  const [formData, setFormData] = useState<CreateBlogRequestI>({
    userId: 4,
    title: '',
    description: '',
    content: '',
    categories: []
  });
  // max cats
  // const [maxCats, setMaxCats] = useState(3);
  // validate categories length
  const [categoriesMax, setCategoriesMax] = useState({
    isMax: false,
    message: 'Please choose between 1 and 3 categories',
    maxCats: 3
  });


  // modal


  /**
   * useEffect section
   */
  // useEffect get categories to show it in select
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCategories()).unwrap();
        // mapping categories tooptions
        const optionsC = response.map(c => ({
          label: c.name,
          value: c.categoryId
        }));

        setOptions(optionsC);
      } catch (error) {
        console.error("There is a problem to get categories.");
      }
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (errorCategory) {
      console.error('Error to get categories');
    }
  } , [errorCategory]);

  // reset error
  useEffect(() => {
    dispatch(resetError());
  }, []);

  /**
   * functions section
   */
  // read properties as title and description
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  // handle submit prepare info to backend
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if user choose category between 1 and 3
    if(categoriesSelected.length > categoriesMax.maxCats){
      setCategoriesMax({
        isMax: true,
        message: 'Please choose between 1 and 3 categories',
        maxCats: 3
      });
      return
    }

    // check if user choose category
    if(categoriesSelected.length === 0){
      setCategoryIsEmpty(true);
      return
    }
    
    // prepare data
    formData.content = content;
    formData.categories = categoriesSelected.map(c => c.value);
    
    // request to backend
    try {
      // fetch with redux
      await dispatch(fetchCreateBlog(formData)).unwrap();
      navigate('/profile/1');
    } catch (error: any) {
      console.log(error);
      
      if (error.data !== null) {
        // console.log(error.data);
        console.log(errorMessageBlog);
      }else{
      
      } 
    }

    // reset state of categories
    setCategoriesMax({
      isMax: false,
      message: 'Please choose between 1 and 3 categories',
      maxCats: 3
    });
  }

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

  // loading a errors category
  if (loadingCategories) return <Spinner />;
  // if (error) return <Error />;

  // loading to create blog
  if (loadingCreateBlog) return <Spinner />

  return (
    <div>
      <NavBar />

    <div className="min-h-screen py-10 bg-gray-100 flex items-center justify-center mt-10">
      <div className="container w-full max-w-screen-lg px-2 lg:mx-auto ">
        <div>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Create Blog</p>
                <p>Please fill out all the fields.</p>
              </div>

              <form 
                onSubmit={handleSubmit}
                className="lg:col-span-2"
              >
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="title">Title</label>
                    <p className="text-red-400 font-bold">
                      {errorCreateBlog 
                        ? (errorMessageBlog as ApiResponse<CreateBlogValidationErrorResponseI>).data.title
                        : null}
                    </p>
                    
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.title}
                      placeholder="Title"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="description">Description</label>
                    <p className="text-red-400 font-bold">
                      {errorCreateBlog
                        ? (errorMessageBlog as ApiResponse<CreateBlogValidationErrorResponseI>).data.description
                        : null}
                    </p>


                    
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.description}
                      placeholder="This is a description example"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Categories (select max 3 categories)</label>
                    <p className=" text-red-400 font-bold">{categoriesIsEmpty ? 'Please choose a category' : null}</p>
                    <p className=" text-red-400 font-bold">{categoriesMax.isMax ? categoriesMax.message : null}</p>
                    <MultiSelect
                        options={options}
                        value={categoriesSelected}
                        onChange={setCategoriesSelected}
                        labelledBy="Categories"
                        hasSelectAll={false}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Content Blog</label>
                    <p className="text-red-400 font-bold">
                      {errorCreateBlog
                        ? (errorMessageBlog as ApiResponse<CreateBlogValidationErrorResponseI>).data.content
                        : null}
                    </p>
                    <ReactQuill 
                        theme="snow" 
                        value={content} 
                        modules={modules}
                        onChange={setContent} 
                        style={{
                            height: "300px", 
                            overflow: "auto", 
                            border: "1px solid #ccc", 
                        }}
                    />
                  </div>


                  <div className="md:col-span-5">
                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                      Upload Photo
                    </label>
                    {!selectedImage && (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-slate-300 group">
                        <div className="flex flex-col items-center justify-center pt-7">
                          <svg
                            className="w-10 h-10 text-slate-400 group-hover:text-slate-600"
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
                        Create Blog
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

export default CreateBlog;

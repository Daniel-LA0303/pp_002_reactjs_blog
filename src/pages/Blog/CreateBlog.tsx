import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];

const CreateBlog = () => {

    const [selected, setSelected] = useState([]);
    const [value, setValue] = useState('');


    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }], // Títulos
                ["bold", "italic", "underline", "strike"], // Formato de texto
                [{ align: [] }], // Alineación (izquierda, centro, derecha)
                ["link", "image", "video"], // Insertar enlaces, imágenes y videos
                [{ list: "ordered" }, { list: "bullet" }], // Listas ordenadas y no ordenadas
                ["clean"], // Limpiar formato
            ],
        },
      };


  return (
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
                <p className="font-medium text-lg">Create Blog</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Title</label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value=""
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Description</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value=""
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Categories</label>
                    <pre>{JSON.stringify(selected)}</pre>
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Content Blog</label>
                    <ReactQuill 
                        theme="snow" 
                        value={value} 
                        modules={modules}
                        onChange={setValue} 
                        style={{
                            height: "300px", // Altura predeterminada
                            overflow: "auto", // Scroll automático si el contenido excede
                            border: "1px solid #ccc", // Borde opcional
                        }}
                    />
                  </div>


                  <div className="md:col-span-5">
                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                      Upload Photo
                    </label>
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
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create Blog
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;

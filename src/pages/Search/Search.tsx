import { useState } from "react";
import SearchBlogs from "../../components/Search/SearchBlogs";
import SearchCategories from "../../components/Search/SearchCategories";
import SearchUsers from "../../components/Search/SearchUsers";
import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";

function TabMenu() {

    const { query } = useParams();
    const [activeTab, setActiveTab] = useState("blog");

    const renderContent = () => {
        switch (activeTab) {
            case "blog":
                return <SearchBlogs query={query}/>;
            case "category":
                return <SearchCategories query={query}/>;
            case "user":
                return <SearchUsers query={query}/>;
            default:
                return <div>Selecciona una pestaña</div>;
        }
    };

    return (
        <div>
            <NavBar />
            <div className="w-full max-w-screen-lg px-2 lg:mx-auto flex flex-wrap gap-4 mt-20">
                {/* Lista de pestañas */}
                <ul className="w-full md:w-3/12 max-h-52 bg-gray-100 py-0 rounded-md flex md:flex-col flex-row justify-between">
                    <li
                        id="homeTab"
                        className={`tab w-2/6 md:w-full flex justify-center md:justify-start items-center text-sm text-center md:text-left ${
                            activeTab === "blog" ? "font-semibold bg-white text-blue-600" : "text-gray-800"
                        } hover:text-blue-600 py-5 px-5 cursor-pointer transition-all`}
                        onClick={() => setActiveTab("blog")}
                    >
                        Blogs
                    </li>
                    <li
                        id="settingTab"
                        className={`tab w-2/6 md:w-full flex justify-center md:justify-start items-center text-sm md:text-center text-left ${
                            activeTab === "category" ? "font-semibold bg-white text-blue-600" : "text-gray-800"
                        } hover:text-blue-600 py-5 px-5 cursor-pointer transition-all`}
                        onClick={() => setActiveTab("category")}
                    >
                        Categories
                    </li>
                    <li
                        id="profileTab"
                        className={`tab w-2/6 md:w-full flex justify-center md:justify-start items-center text-sm text-center md:text-left ${
                            activeTab === "user" ? "font-semibold bg-white text-blue-600" : "text-gray-800"
                        } hover:text-blue-600 py-5 px-5 cursor-pointer transition-all`}
                        onClick={() => setActiveTab("user")}
                    >
                        Users
                    </li>
                </ul>

                {/* Contenedor del contenido */}
                <div className="md:w-8/12 w-full p-3 flex-grow bg-white shadow-lg rounded-lg">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default TabMenu;

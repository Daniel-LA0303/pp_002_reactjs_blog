import { useState } from "react";

function TabMenu() {
    const [activeTab, setActiveTab] = useState("blog");

    const renderContent = () => {
        switch (activeTab) {
            case "blog":
                return <div>Bienvenido al Home</div>;
            case "category":
                return <div>Configuraciones de usuario</div>;
            case "user":
                return <div>Perfil del usuario</div>;
            default:
                return <div>Selecciona una pestaña</div>;
        }
    };

    return (
        <div className="flex gap-4 w-10/12  font-[sans-serif] mx-auto">
            <ul className="hidden md:block md:w-3/12  bg-gray-100  py-5 rounded-md">
                <li
                    id="homeTab"
                    className={`tab flex items-center text-sm ${
                        activeTab === "blog" ? "font-semibold bg-white text-blue-600" : "text-gray-800"
                    } hover:text-blue-600 py-5 px-5 cursor-pointer transition-all`}
                    onClick={() => setActiveTab("blog")}
                >
                    Blogs
                </li>
                <li
                    id="settingTab"
                    className={`tab flex items-center text-sm ${
                        activeTab === "category" ? "font-semibold bg-white text-blue-600" : "text-gray-800"
                    } hover:text-blue-600 py-5 px-5 cursor-pointer transition-all`}
                    onClick={() => setActiveTab("category")}
                >
                    Categories
                </li>
                <li
                    id="profileTab"
                    className={`tab flex items-center text-sm ${
                        activeTab === "user" ? "font-semibold bg-white text-blue-600" : "text-gray-800"
                    } hover:text-blue-600 py-5 px-5 cursor-pointer transition-all`}
                    onClick={() => setActiveTab("user")}
                >
                    Users
                </li>
            </ul>

            {/* Contenedor del contenido */}
            <div className="md:w-8/12 p-3 flex-grow bg-white shadow-lg rounded-lg">{renderContent()}</div>
        </div>
    );
}

export default TabMenu;

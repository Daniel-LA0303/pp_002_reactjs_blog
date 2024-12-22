import React from 'react'

const VerticalTabs = () => {
  return (
    <ul className="hidden md:block md:w-3/12 max-h-52  bg-gray-100  py-5 rounded-md">
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
  )
}

export default VerticalTabs
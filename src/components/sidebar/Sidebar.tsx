import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import PreviewIcon from "@mui/icons-material/Preview";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import { RAND_IMG } from "../../config/config";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Sidebar = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const createDropdownRef = useRef(null); // Ref for the dropdown

  // Sidebar navigation links
  const sideNavs = [
    { title: "Home", link: "/", icon: <HomeIcon /> },
    { title: "Search", link: "/search", icon: <SearchIcon /> },
    { title: "Explore", link: "/explore", icon: <ExploreIcon /> },
    { title: "Reels", link: `/reel/${0}`, icon: <PreviewIcon /> },
    { title: "Messages", link: "/inbox", icon: <TelegramIcon /> },
    {
      title: "Create",
      icon: <AddCircleOutlineIcon />,
    },
    {
      title: "Profile",
      link: `/profile/${userData?.id}`,
      icon: <CustomProfileIconComp imgLink={userData.profileImg} />,
    },
  ];

  // Handle navigation
  const handleNavigate = (link) => {
    navigate(link);
  };

  // Close dropdown when clicking outside
  const handleOutsideClick = (event) => {
    if (
      createDropdownRef.current &&
      !createDropdownRef.current.contains(event.target)
    ) {
      setShowCreateOptions(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <ul className="fixed bottom-0 py-[0.5rem] flex w-[100%] justify-evenly sm:static sm:flex-col sm:w-[4rem] sm:h-[100vh] sm:items-center border-r-[1px] border-[var(--outliner-color)]">
      {sideNavs.map((sn) => (
        <li
          key={sn.title}
          className="relative hover:cursor-pointer"
          onClick={(e) => {
            if (sn.title === "Create") {
              e.stopPropagation(); // Prevent click propagation
              setShowCreateOptions((prev) => !prev);
            } else {
              handleNavigate(sn.link);
            }
          }}
        >
          {sn.icon}

          {/* Tooltip for Create */}
          {sn.title === "Create" && showCreateOptions && (
            <div
              ref={createDropdownRef}
              className="absolute top-[0%] left-[3rem] w-[150px] bg-[var(--btn-background-color)] shadow-lg rounded-md p-2 z-10"
              onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing when clicked inside
            >
              <div
                className="hover:bg-black p-2 rounded cursor-pointer"
                onClick={() => handleNavigate("/create-post")}
              >
                Create Post
              </div>
              <div
                className="hover:bg-black p-2 rounded cursor-pointer"
                onClick={() => handleNavigate("/create-reel")}
              >
                Create Reel
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;

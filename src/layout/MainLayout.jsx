import React, { useContext, useState, useEffect } from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { CreatedContext } from "../pages/context/UserContext";

const registered = [
  {
    href: "/movies",
    title: "Movies",
  },
  {
    href: "/tvShows",
    title: "Tv Shows",
  },
  {
    href: "/suggestMe",
    title: "Suggest me",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.61987 3.95331L13.6665 7.99997L9.61987 12.0466"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.33325 8H13.5533"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard",
    title: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-user"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
  },
];

const registration = [
  {
    href: "/movies",
    title: "Movies",
  },
  {
    href: "/tvShows",
    title: "Tv Shows",
  },
  {
    href: "/suggestMe",
    title: "Suggest me",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.61987 3.95331L13.6665 7.99997L9.61987 12.0466"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.33325 8H13.5533"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/login",
    title: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-log-in"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </svg>
    ),
  },
];

const MainLayout = () => {
  const [navListData, setNavListData] = useState([]);
  const { sessionId, accountId } = useContext(CreatedContext);

  useEffect(() => {
    if (!sessionId || !accountId) {
      setNavListData(registration);
    } else {
      setNavListData(registered);
    }
  }, [sessionId, accountId]);

  return (
    <>
      <Header navList={navListData} />
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;

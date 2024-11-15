import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

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
    icon: 
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
        class="feather feather-log-in"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </svg>
  },
];

const MainLayout = () => {
  return (
    <>
      <Header navList={registration} />
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;

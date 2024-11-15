import React, { useContext } from "react";
import styles from "./ButtonSuggest.module.css";
import { addToSuggest } from "../../../api/api";
import { CreatedContext } from "../../../pages/context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ButtonSuggest = ({id, media_type, isSuggestedMovie,isSuggestedTv}) => {
  const {sessionId, accountId } = useContext(CreatedContext)
  const navigator = useNavigate()

  
  const handleAddSuggest = async()=>{
    if(!sessionId || !accountId){
       return navigator('/login')
    }

    try {
      const data = {
        media_type: media_type,
        media_id: id,
        favorite: true
      }
      const res = await addToSuggest({
        accountId,
        sessionId,
        body: data
      })

      toast.success(res.data?.status_message)
      if(res.data?.status_message){
        window.location.reload()
      }
    } catch (error) {
      handleAddSuggest(error)
    }
  }
  return isSuggestedMovie || isSuggestedTv ? (
    <button className={styles.alWatch}>
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 9V15C22 15.22 22 15.44 21.98 15.65C21.16 14.64 19.91 14 18.5 14C17.44 14 16.46 14.37 15.69 14.99C14.65 15.81 14 17.08 14 18.5C14 19.34 14.24 20.14 14.65 20.82C14.92 21.27 15.26 21.66 15.66 21.98C15.45 22 15.23 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z"
          stroke="#37D8A7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.52002 7.10999H21.48"
          stroke="#37D8A7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.52002 2.10999V6.96997"
          stroke="#37D8A7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.48 2.10999V6.52002"
          stroke="#37D8A7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 18.5C23 19.34 22.76 20.14 22.35 20.82C22.11 21.22 21.81 21.58 21.46 21.88C20.67 22.58 19.64 23 18.5 23C17.43 23 16.44 22.62 15.67 21.98H15.66C15.26 21.66 14.92 21.27 14.65 20.82C14.24 20.14 14 19.34 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z"
          stroke="#37D8A7"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.75 18.5L17.86 19.61L20.26 17.39"
          stroke="#37D8A7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Already watched
    </button>
  ):(
    
    <button className={styles.btn} onClick={handleAddSuggest}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.35003 19.58 9.35003H15.58C14.98 9.35003 14.48 8.85003 14.58 8.15003L15.08 4.95003C15.28 4.05003 14.68 3.05003 13.78 2.75003C12.98 2.45003 11.98 2.85003 11.58 3.45003L7.47998 9.55003"
          stroke="#7B6EF6"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M2.37988 18.35V8.55002C2.37988 7.15002 2.97988 6.65002 4.37988 6.65002H5.37988C6.77988 6.65002 7.37988 7.15002 7.37988 8.55002V18.35C7.37988 19.75 6.77988 20.25 5.37988 20.25H4.37988C2.97988 20.25 2.37988 19.75 2.37988 18.35Z"
          stroke="#7B6EF6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Suggest Me
    </button>

             
  )
};

export default ButtonSuggest;

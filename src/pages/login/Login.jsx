import styles from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HandleApiRespErr } from '../../utils/HandleApiRespErr';
import Divider from '../../components/ui/Divider/Divider';
import Buttton from '../../components/ui/Button/Buttton';
import Input from '../../components/ui/Input/Input';
import { generateNewRequestToken,createSession, getUserDetails } from '../../api/api';
import { useContext, useEffect, useState } from 'react';
import { CreatedContext } from '../../pages/context/UserContext'

const validationSchema = Yup.object().shape({
  // email: Yup.string().email().required(),
  email: Yup.string().required(),
  password: Yup.string().min(6).required()
});

const Login = () => {
  const { dispatch} = useContext(CreatedContext)
  const navigator = useNavigate();
  const [requestToken, setRequestToken] = useState(null)

  // formik part in here
  const formik = useFormik({
    initialValues:{
      email: '',
      password: ''
    },

    validationSchema: validationSchema,
    
    onSubmit: async(values, {setSubmitting, resetForm})=>{
      const options = {
        method: 'POST',
        url: 'https://api.themoviedb.org/3/authentication/token/validate_with_login',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
        },
        data: {
          username: values.email,
          password: values.password,
          request_token: requestToken
        }
      };        
      try {
        const res = await axios.request(options)

        if(res?.data?.success){
          toast.success('welcome')
          
          const sessionRes = await createSession(requestToken)
          if(!sessionRes.data?.success){
            toast.error('data not found')
          }
          // user data
          const userData={
            user: {
              email: values.email
            },
            isAuthenticate: true,
            sessionId: sessionRes.data?.session_id
          }
          
          dispatch({
            type: 'all',
            value: userData
          })
          

          // resetform
          resetForm()

          // navigate
          navigator('/dashboard')
        }else{
          toast.error('email or password incorrect')
        }
      } catch (error) {
        HandleApiRespErr(error)
        // console.log(error)
      }
      finally{
        setSubmitting(false)
      }
    }
  })

  const handleLoginTheMovieDb = () => {
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://www.yourapp.com/approved`;
  };
  
  useEffect(()=>{
    generateNewRequestToken.then(
      token=>{
        setRequestToken (token);
      }
    ).catch(error => console.log(error))
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.loginImage}>
        <img src="/assets/image/person.png" alt="Pic" />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.loginForm}>
          <h1 className={styles.title}>Login</h1>
          <Input
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              }
            name={'email'}
            type={'text'}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            helperText={
              formik.errors.email &&
              formik.errors.email && 
              formik.errors.email  
            }
            placeholder='Username'
          />
          <Input
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.28 13.6099C15.15 14.7399 13.53 15.0899 12.1 14.6399L9.50995 17.2199C9.32995 17.4099 8.95995 17.5299 8.68995 17.4899L7.48995 17.3299C7.08995 17.2799 6.72995 16.8999 6.66995 16.5099L6.50995 15.3099C6.46995 15.0499 6.59995 14.6799 6.77995 14.4899L9.35995 11.9099C8.91995 10.4799 9.25995 8.85989 10.39 7.72989C12.01 6.10989 14.65 6.10989 16.28 7.72989C17.9 9.33989 17.9 11.9799 16.28 13.6099Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.4501 16.2799L9.6001 15.4199" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3944 10.7H13.4034" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              }
            name={'password'}
            type={'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            helperText={
              formik.errors.password &&
              formik.errors.password && 
              formik.errors.password  
            }
            placeholder='Password'
          />
          <Buttton
           type={'submit'} 
           disabled={formik.isSubmitting} 
           style={{width: "100%"}} 
          >
            {
              formik.isSubmitting?(
                 "Loading..." 
              ):(
                "Submit"
              )
            }
          </Buttton>
            <Divider label={'or'}/>

            <button 
            type='button'
             className={styles.theMovieDbBox}
             onClick={()=>handleLoginTheMovieDb()}
             
             >
              <span className={styles.themovie}>
              <svg  className={styles.theMovieLogo}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 273.42 35.52">
                    <defs>
                      <style>{`.cls-1 { fill: url(#linear-gradient); }`}</style>
                      <linearGradient id="linear-gradient" y1="17.76" x2="273.42" y2="17.76" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#90cea1" />
                        <stop offset="0.56" stopColor="#3cbec9" />
                        <stop offset="1" stopColor="#00b3e5" />
                      </linearGradient>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path className="cls-1" d="M191.85,35.37h63.9A17.67,17.67,0,0,0,273.42,17.7h0A17.67,17.67,0,0,0,255.75,0h-63.9A17.67,17.67,0,0,0,174.18,17.7h0A17.67,17.67,0,0,0,191.85,35.37ZM10.1,35.42h7.8V6.92H28V0H0v6.9H10.1Zm28.1,0H46V8.25h.1L55.05,35.4h6L70.3,8.25h.1V35.4h7.8V0H66.45l-8.2,23.1h-.1L50,0H38.2ZM89.14.12h11.7a33.56,33.56,0,0,1,8.08,1,18.52,18.52,0,0,1,6.67,3.08,15.09,15.09,0,0,1,4.53,5.52,18.5,18.5,0,0,1,1.67,8.25,16.91,16.91,0,0,1-1.62,7.58,16.3,16.3,0,0,1-4.38,5.5,19.24,19.24,0,0,1-6.35,3.37,24.53,24.53,0,0,1-7.55,1.15H89.14Zm7.8,28.2h4a21.66,21.66,0,0,0,5-.55A10.58,10.58,0,0,0,110,26a8.73,8.73,0,0,0,2.68-3.35,11.9,11.9,0,0,0,1-5.08,9.87,9.87,0,0,0-1-4.52,9.17,9.17,0,0,0-2.63-3.18A11.61,11.61,0,0,0,106.22,8a17.06,17.06,0,0,0-4.68-.63h-4.6ZM133.09.12h13.2a32.87,32.87,0,0,1,4.63.33,12.66,12.66,0,0,1,4.17,1.3,7.94,7.94,0,0,1,3,2.72,8.34,8.34,0,0,1,1.15,4.65,7.48,7.48,0,0,1-1.67,5,9.13,9.13,0,0,1-4.43,2.82V17a10.28,10.28,0,0,1,3.18,1,8.51,8.51,0,0,1,2.45,1.85,7.79,7.79,0,0,1,1.57,2.62,9.16,9.16,0,0,1,.55,3.2,8.52,8.52,0,0,1-1.2,4.68,9.32,9.32,0,0,1-3.1,3A13.38,13.38,0,0,1,152.32,35a22.5,22.5,0,0,1-4.73.5h-14.5Zm7.8,14.15h5.65a7.65,7.65,0,0,0,1.78-.2,4.78,4.78,0,0,0,1.57-.65,3.43,3.43,0,0,0,1.13-1.2,3.63,3.63,0,0,0,.42-1.8A3.3,3.3,0,0,0,151,8.6a3.42,3.42,0,0,0-1.23-1.13A6.07,6.07,0,0,0,148,6.9a9.9,9.9,0,0,0-1.85-.18h-5.3Zm0,14.65h7a8.27,8.27,0,0,0,1.83-.2,4.67,4.67,0,0,0,1.67-.7,3.93,3.93,0,0,0,1.23-1.3,3.8,3.8,0,0,0,.47-1.95,3.16,3.16,0,0,0-.62-2,4,4,0,0,0-1.58-1.18,8.23,8.23,0,0,0-2-.55,15.12,15.12,0,0,0-2.05-.15h-5.9Z"/>
                      </g>
                    </g>
                  </svg>  
              </span>  
            </button>       
        </div>
      </form>
    </div>
  )
}

export default Login
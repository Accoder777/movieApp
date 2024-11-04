import React from 'react'
import { toast } from 'react-toastify'

export const HandleApiRespErr = (error) => {
    if(error?.code === 'ERR_NETWORK'){
        toast.warning('connection Error')
    }else if(error?.response?.data?.status_message){
        toast.error(error?.response?.data?.status_message)
    }else if(error?.response?.data?.status_code){
        toast.error(error?.response?.data?.status_code)
    }
        //
}
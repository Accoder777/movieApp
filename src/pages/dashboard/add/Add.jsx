import React, { useEffect, useState } from 'react'
import styles from './Add.module.css'
import BodyTop from '../../../components/bodyTop/BodyTop';
import { HandleApiRespErr } from '../../../utils/HandleApiRespErr';
import { getTrending } from '../../../api/api';
import FilmsDisplay from '../../../components/filmDisplay/FilmsDisplay';

const Add = () => {
    const [InputValue, setInputValue] =useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(()=>{
      const fetchData = async()=>{
        setIsLoading(true)
        try {
          const res = await getTrending('all')
          if(res.status === 200 && res.data.results){
            setData(res.data.results)
          }
        } catch (error) {
          HandleApiRespErr(error)
        } finally{
          setIsLoading(false)
        }
      }
      fetchData();
    },[])

  return (
    <>
        <BodyTop BodyTopTitle={'Add new item'} value={InputValue} setValue={setInputValue}/>
        {
          isLoading?(
            <p>Loading....</p>
          ):(
            data.map((item)=>(
              <FilmsDisplay {...item} key={item.id}/>
            ))
          )
        }
    </>
  )
}

export default Add
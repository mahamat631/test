import React, { useState,useEffect } from "react";
import axios from "../../axios/axios";
import { useParams } from "react-router";
import DescribeCart from "../../components/DescribeCart"


const Describe = (props) => {
    const [series,setSeries] = useState('');
    const { id } = useParams();
    
    const getSerie =()=>{
        const header = {
            "Content-Type": "multipart/form-data"
        }
        axios.get(`/shows/display?id=${id}`, header)
            .then(({data}) => {
                if(data !== undefined && data.errors.length === 0){
                   setSeries(data.show);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
 
   
    useEffect(() => {
        getSerie();
    }, []);
    return(
           <>
             {series ?
                <DescribeCart 
                articles={series}
                />
             :null
            }   
         </>
    )
}
export default Describe;
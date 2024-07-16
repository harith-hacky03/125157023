import React,{useEffect} from "react";
import Axios from 'axios'
export default function MainPage() {

    useEffect(()=>{
        Axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000').then((res)=>[
            console.log(res)
        ])
    },[])

    return (
        <div>
        <h1 className="text-2xl ">Main Page</h1>
        </div>
    );
    }
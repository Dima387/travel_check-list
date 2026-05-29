import {useState,useEffect} from "react"

export default function useWishlist(){

    const[wishlist, setWishlist]=useState([])

    useEffect(()=>{
        const saved=localStorage.getItem("wishlist")
        if(saved){
            setWishlist(JSON.parse(saved))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    },[wishlist])

    return{wishlist, setWishlist}

}
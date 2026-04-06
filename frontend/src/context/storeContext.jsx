import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) =>{
    const [cartItems,setCartItem]=useState({})
    const url="https://backendofdelveryapp.onrender.com"
    const [token,setToken]=useState("")
    const addToCart= async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url +"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart=async (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if (token){ 
            await axios.post(url + '/api/cart/remove',{itemId},{headers:{token}})
        }
    }
    const fetchFoodList = async () => {
        const resp = await axios.get(url+"/api/food/list")
        setFoodList(resp.data.data)
    }
    const loadCartData = async (token) =>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItem(response.data.cartData)
    }
    const [food_list,setFoodList] = useState([])
    const getTotalExpenses=()=>{
        let s=0;
        Object.entries(cartItems).map(([key,value])=>{
            const item = food_list.find(food => food._id === key)
            if(item){
                s+=item.price*value
            }
        })
        return s
    }
    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token")
            if(savedToken){
                setToken(savedToken)
                await loadCartData(savedToken)
            }
        }
        loadData()
        },[])
    const contextValue ={
        food_list,
        cartItems,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalExpenses,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AppContext from './AppContext';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AppState = (props) => {

    const url = "http://localhost:8080/api"

    const [products, setProducts] = useState([])
    const [token, setToken] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const [user, setUser] = useState()
    const [cart, setCart] = useState([])

    const [reload, setReload] = useState(false); ""
    const [userAddress, setuserAddress] = useState("");



    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/all`, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
            console.log(api.data.products)
            setProducts(api.data.products)
            setFilteredData(api.data.products)
            userProfile()
        }
        fetchProduct()
        userCart()
        getAddress()
    }, [token, reload])


    useEffect(() => {
        let lstoken = localStorage.getItem('token')

        if (lstoken) {
            setToken(lstoken)
            setIsAuthenticated(true)
        }

    }, [])



    // register user
    const register = async (name, email, password) => {
        const api = await axios.post(`${url}/user/register`,
            { name, email, password },
            {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
        // alert(api.data.message)
        // console.log("user register ", api) 
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return api.data
    }
    // login user
    const login = async (email, password) => {
        const api = await axios.post(`${url}/user/login`,
            { email, password },
            {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
        // alert(api.data.message)
        // console.log("user register ", api) 
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        // console.log("user login ", api.data)
        setToken(api.data.token)
        setIsAuthenticated(true)
        localStorage.setItem('token', api.data.token)
        return api.data
    }

    // logout user
    const logout = () => {
        setIsAuthenticated(false);
        setToken(" ");
        localStorage.removeItem("token");
        toast.success("Logout Successfully...!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    // user profile
    const userProfile = async () => {
        const api = await axios.get(`${url}/user/profile`, {
            headers: {
                "Content-Type": "Application/json",
                "Auth": token
            },
            withCredentials: true
        })
        // console.log(api.data)
        setUser(api.data.user)

    }

    // add to cart

    const addToCart = async (productId, title, price, qty, imgSrc) => {
        console.log("product id = ", productId);
        const api = await axios.post(
            `${url}/cart/add`,
            { productId, title, price, qty, imgSrc },
            {
                headers: {
                    "Content-Type": "Application/json",
                    Auth: token,
                },
                withCredentials: true,
            }
        );
        setReload(!reload);
        // console.log("my cart ", api)
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    // user cart
    const userCart = async () => {
        const api = await axios.get(`${url}/cart/user`, {
            headers: {
                "Content-Type": "Application/json",
                "Auth": token
            },
            withCredentials: true
        })
        // console.log("User cart", api.data.cart)
        setCart(api.data.cart)
        // setUser("User cart",api)

    }

    // dec qty
    const decreaseQty = async (productId, qty) => {
        const api = await axios.post(
            `${url}/cart/--qty`,
            { productId, qty },
            {
                headers: {
                    "Content-Type": "Application/json",
                    Auth: token,
                },
                withCredentials: true,
            }
        );
        setReload(!reload);
        // console.log("decrease cart items ",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        //  setCart(api.data.cart);
        //  setUser("user cart ",api);
    };

    // remove from cart
    const removeFromCart = async (productId) => {
        const api = await axios.delete(`${url}/cart/remove/${productId}`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token,
            },
            withCredentials: true,
        });
        setReload(!reload);
        // console.log("remove item from cart ",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        //  setCart(api.data.cart);
        //  setUser("user cart ",api);
    };



    //  clear Cart
    const clearCart = async () => {
        const api = await axios.delete(`${url}/cart/clear`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token,
            },
            withCredentials: true,
        });
        setReload(!reload);
        // console.log("remove item from cart ",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        //  setCart(api.data.cart);
        //  setUser("user cart ",api);
    };


    // add shipping address
    const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
        const api = await axios.post(`${url}/address/add`,
            { fullName, address, city, state, country, pincode, phoneNumber },
            {

                headers: {
                    "Content-Type": "Application/json",
                    Auth: token,
                },
                withCredentials: true,
            });
        setReload(!reload);
        // console.log("remove item from cart ",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return api.data
        //  setCart(api.data.cart);
        //  setUser("user cart ",api);
    };

    // get address old
    const getAddress = async () => {
        const api = await axios.get(`${url}/address/get`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token,
            },
            withCredentials: true
        })
        // console.log("user address ", api.data.userAddress)

        setuserAddress(api.data.userAddress)

    }
    return (
        <AppContext.Provider value={{
            products, register,
            login, url, token,
            setIsAuthenticated, isAuthenticated,
            filteredData, setFilteredData,
            logout, user, addToCart, cart, decreaseQty,
            removeFromCart, clearCart, shippingAddress,
            userAddress
        }}>
            {props.children} </AppContext.Provider>

    )
}

export default AppState

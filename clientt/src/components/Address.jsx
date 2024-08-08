import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { useNavigate } from "react-router-dom"
const Address = () => {
    const { shippingAddress, userAddress } = useContext(AppContext);

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        phoneNumber: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const { fullName, address, city, state, country, pincode, phoneNumber } = formData;

    const submitHandler = async (e) => {
        e.preventDefault();
        const result = await shippingAddress(fullName, address, city, state, country, pincode, phoneNumber);
        // console.log(formData)
        // alert(formData)
        if (result.success) {
            navigate('/checkout')
        }

        // console.log(formData);


        setFormData(
            {
                fullName: "",
                address: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                phoneNumber: ""
            }
        )
    };

    return (
        <>
            <div className="container my-1 p-5" style={{ border: '2px solid yellow', borderRadius: '10px' }}>
                <h1 className="text-center">Shipping Adress</h1>
                <form onSubmit={submitHandler} className="my-3">

                    <div className="row">



                        <div className="mb-3 col-md-4">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                name="fullName"
                                value={formData.fullName}
                                onChange={onChangeHandler}
                                type="text"
                                className="form-control bg-dark text-light"
                                id="name"
                                placeholder="Enter name" />
                        </div>

                        <div className="mb-3 col-md-4">
                            <label htmlFor="email" className="form-label">Country</label>
                            <input
                                name="country"
                                value={formData.country}
                                onChange={onChangeHandler}
                                type="text"
                                className="form-control  bg-dark text-light"
                                id="email"
                                placeholder="Enter email" />
                        </div>

                        <div className="mb-3 col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <input
                                name="state"
                                value={formData.state}
                                onChange={onChangeHandler}
                                type="text"
                                className="form-control  bg-dark text-light"
                                id="password"
                                placeholder="Password" />
                        </div>
                    </div>


                    <div className="row">



                        <div className="mb-3 col-md-4">
                            <label htmlFor="name" className="form-label">City</label>
                            <input
                                name="city"
                                value={formData.city}
                                onChange={onChangeHandler}
                                type="text"
                                className="form-control bg-dark text-light"
                                id="name"
                                placeholder="Enter name" />
                        </div>

                        <div className="mb-3 col-md-4">
                            <label htmlFor="email" className="form-label">Pincode</label>
                            <input
                                name="pincode"
                                value={formData.pincode}
                                onChange={onChangeHandler}
                                type="number"
                                className="form-control  bg-dark text-light"
                                id="email"
                                placeholder="Enter email" />
                        </div>

                        <div className="mb-3 col-md-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label>
                            <input
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={onChangeHandler}
                                type="number"
                                className="form-control  bg-dark text-light"
                                id="password"
                                placeholder="Password" />
                        </div>
                    </div>

                    <div className="row">

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Address/Nearby</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={onChangeHandler}
                                type="text"
                                className="form-control  bg-dark text-light"
                                id="password"
                                placeholder="Password" />
                        </div>
                    </div>
                    <div className="d-grid col-6 mx-auto my-3">
                        <button type="submit" className="btn btn-primary"
                            style={{ fontWeight: 'bold' }}>Submit</button>
                    </div>
                </form>
                {userAddress && (
                    <div className="d-grid col-6 mx-auto my-3">
                        <button className="btn btn-warning"
                            onClick={() => navigate('/checkout')}
                            style={{ fontWeight: 'bold' }}
                        >
                            Use Old Address
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Address;

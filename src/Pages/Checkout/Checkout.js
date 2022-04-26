
import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    const handlePlaceOrder = event =>{
        event.preventDefault();
        const order = {
            email:user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('http://localhost:5000/order', order)
        .then(response =>{
            const {data} = response;
            if(data.insertedId){
                toast('Your order is booked!!');
                event.target.reset();
            }
        })
    }

    return (
        <div className='w-50 mx-auto mt-3'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" value={user?.displayName} name='name' placeholder='Name' required readOnly /> <br />
                <input className='w-100 mb-2' type="email" value={user?.email} name='email' placeholder='Email' required readOnly disabled /> <br />
                <input className='w-100 mb-2' type="text" value={service.name} name='service' placeholder='Service' readOnly required /> <br />
                <input className='w-100 mb-2' type="text" name='address' placeholder='Address' autoComplete='off' required /> <br />
                <input className='w-100 mb-2' type="text" name='phone' placeholder='Phone' autoComplete='off' required /> <br />
                <input className='btn btn-primary w-50' type="submit" value="Place Order" />
            </form>
            
        </div>
    );
};

export default Checkout;
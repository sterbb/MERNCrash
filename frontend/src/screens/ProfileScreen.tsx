import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../slices/authSlices';
import { Loader } from '../components/Loader';
import {useUpdateUserMutation} from '../slices/usersApiSlice'

import React from 'react'
import { toast } from 'react-toastify';


const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [update, {isLoading}] = useUpdateUserMutation();

  //set data from current user logged in

  useEffect(()=>{
    setName(userInfo.name)
    setEmail(userInfo.email)
  },[userInfo.name, userInfo.email])

  const submitHandler = async(e:any) =>{
    e.preventDefault();

    try {

        if(password === confirmPassword){
            const res = await update({_id: userInfo.id, name, email, password}).unwrap();
            dispatch(setCredentials({...res}))
            toast.success('Profile updated successfully')
            navigate('/'); 
        }else{
            toast.error('Passwords do not match');
        }
  
    } catch (error) {
        toast.error(error.data.message || error.message)
    }
    
  }


  return (
    <FormContainer>
        <h1>Update Profile</h1>    

        <Form onSubmit={submitHandler}>

            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}>        
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}>        
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}>        
                </Form.Control>

            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>        
                </Form.Control>

            </Form.Group>


            {isLoading && <Loader/>}
            <Button type='submit' variant='primary' className='mt-3'>
                Update
            </Button>

        </Form>
    </FormContainer>
  )
}

export default ProfileScreen
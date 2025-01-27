import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../slices/authSlices';
import { Loader } from '../components/Loader';

import React from 'react'
import { toast } from 'react-toastify';


const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [register, {isLoading}] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //check if logged in 

  useEffect(()=>{
    if(userInfo){
        navigate('/');
    }
  },[navigate, userInfo])

  const submitHandler = async(e:any) =>{
    e.preventDefault();


    try {

        if(password === confirmPassword){
            const res = await register({name,email,password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success('Registered Successfully')
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
        <h1>Sign Up</h1>    

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
                Sign Up
            </Button>

            <Row className="py-3">
                <Col>
                    Already have an account? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen
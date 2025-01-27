import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlices';
import {toast} from 'react-toastify'
import { Loader } from '../components/Loader';


import React from 'react'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  //to use the methods in slices?
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  //authSlices
  const { userInfo } = useSelector((state) => state.auth);

  //if Logged in
  useEffect(()=>{
    if(userInfo){
        navigate('/');
    }
  }, [navigate, userInfo])

  const submitHandler = async(e:any) =>{
    e.preventDefault();
    try{
        const res = await login({email, password}).unwrap()
        dispatch(setCredentials({...res}))
        toast.success('Logged In');
        navigate('/')
    }catch(error){
        toast.error(error?.data?.message || error?.error);
    }
    
  }


  return (
    <FormContainer>
        <h1>Sign in</h1>    

        <Form onSubmit={submitHandler}>
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

            {isLoading && <Loader/>}

            <Button type='submit' variant='primary' className='mt-3'>
                Sign In
            </Button>

            <Row className="py-3">
                <Col>
                    New Customer ? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default LoginScreen
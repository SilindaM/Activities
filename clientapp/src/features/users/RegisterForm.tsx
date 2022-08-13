import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Header, Label } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import * as Yup from 'yup'
import MyTextinput from '../../app/common/form/MyTextinput'
import ValidationErros from '../error/ValidationErros'




export default observer( function RegisterForm(){
    const {userStore} = useStore();
    return(
         <Formik
         initialValues={{ displaName: '',username: '',email:'',password: '', error: null}} 
         onSubmit={(values,{setErrors}) =>userStore.register(values).catch(error =>setErrors({error}))}
         validationSchema={Yup.object({
            displayName: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),

         })}
         >
            {({handleSubmit,isSubmitting,errors,isValid,dirty}) =>(
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivites' color='teal' textAlign='center' />
                    <MyTextinput name='displayName' placeholder='Display Name' />
                    <MyTextinput name='username' placeholder='Username' />
                    <MyTextinput name='email' placeholder='Email' />
                    <MyTextinput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage name='error'
                        render={()=>
                            <ValidationErros errors={errors.error}/>}
                        
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>

            )}
         </Formik>
    )
})
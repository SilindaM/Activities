import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Header, Label } from 'semantic-ui-react'
import MyTextinput from '../../app/common/form/MyTextinput'
import { useStore } from '../../app/stores/store'

export default  function LoginForm(){
    const {userStore}=useStore();

    return(
        <Formik 
            initialValues={{email:'',password:'',error:null}}
            onSubmit={(values,{setErrors})=>userStore.login(values)
            .catch(error=>setErrors({error:'Invalid Email or Password'}))}
         >
            {({handleSubmit,isSubmitting,errors})=>(
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login To Activities' color='teal' textAlign='center'/>
                    <MyTextinput name='email' placeholder='Email'/>
                    <MyTextinput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage
                        name='error' render={()=><Label style={{marginBottom:10}} basic color='red' content={errors.error}
                    />
                    }
                    />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid/>
                </Form>
            )}
         </Formik>
        
    )
}
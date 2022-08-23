import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import MyTextinput from "../../app/common/form/MyTextinput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { Button } from "semantic-ui-react";

interface Props{
setEditMode: (editMode: boolean) => void;
}

export default observer( function ProfileEditForm({setEditMode}:Props){
    const {profileStore: {profile,updateProfile}} = useStore();
    return(
        <Formik 
        initialValues={{displayName: profile?.displayName, bio:profile?.bio}}
        onSubmit={values =>{
            updateProfile(values).then(() => {
                setEditMode(false);
            })
        }}
        validationSchema ={Yup.object({
            displayName: Yup.string().required()
        })}
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form className='ui form'>
                    <MyTextinput placeholder='Display Name' name='displayName'/>
                    <MyTextArea  placeholder='Add your bio' name='bio'/>
                    <Button
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content='update profile'
                        floated='right'
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    )
})
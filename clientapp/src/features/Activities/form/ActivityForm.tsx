import { observer } from "mobx-react-lite";
import React, {  useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Activity, ActivityFormValues } from "../../../Models/activity";
import {v4 as uuid}  from 'uuid';
import { Formik,Form} from "formik";
import * as Yup from 'yup'
import MyTextinput from "../../../app/common/form/MyTextinput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectinput from "../../../app/common/form/MySelectinput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateinput from "../../../app/common/form/MyDateinput";
import { values } from "mobx";




export default observer (function ActivityForm(){

    const history=useHistory();
    const {activityStore}=useStore();
    const {loading,createActivity,updateActivity,loadActivity,loadingInitial}=activityStore;
    const {id}=useParams<{id:string}>();
    
    const [activity,setActivity]=useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema=Yup.object({
        title:Yup.string().required('The activity title is required'),
        description:Yup.string().required('The activity description is required'),
        category:Yup.string().required('The activity category is required'),
        date:Yup.string().required('The activity date is required').nullable(),
        city:Yup.string().required('The activity city is required'),
        venue:Yup.string().required('The activity venue is required'),
    })

    useEffect(()=>{
        if(id) loadActivity(id).then(activity=>setActivity(new ActivityFormValues(activity)))
    },[id,loadActivity]);


    function handleFormSubmit(activity:ActivityFormValues){
        if(!activity.id){
            let newActivity={
                ...activity,
                id:uuid()
            };
            createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`));
        }else{
            updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`))
        }
    }

    if(loadingInitial) return <LoadingComponent content='Loading Activity...'/>

    return(
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik
            validationSchema={validationSchema}
             enableReinitialize 
             initialValues={activity}
              onSubmit={values=>handleFormSubmit(values)}>
                {({handleSubmit,isValid,isSubmitting,dirty})=>(
                         <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        
                        <MyTextinput name='title' placeholder='Title'/>
                         <MyTextArea placeholder="Description"  name='description'/>
                         <MySelectinput placeholder="Category" name='category' options={categoryOptions}/>
                         <MyDateinput 
                             placeholderText="Date"
                             name='date'
                             showTimeSelect
                             timeCaption="time"
                             dateFormat='MMMM d,yyyy h:mm aa'
                         />
                         <Header content='Location Details' sub color='teal'/>
                         <MyTextinput placeholder="City"  name='city'/>
                         <MyTextinput placeholder="Venue"  name='venue'/>
                         <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated='right' positive type='submit' content='Submit'/>
                         <Button as={Link} to='/activities' floated='right'  type='button' content='Cancel'/>
                     </Form>
                )}
            </Formik>
        </Segment>
    )
})
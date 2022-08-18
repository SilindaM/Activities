import { toast } from "react-toastify";
import { resolve } from "path";
import { Activity, ActivityFormValues } from "../../Models/activity";
import { history } from "../..";
import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../stores/store";
import { config } from "process";
import { User, UserFormValues } from "../../Models/user";
import { Photo, Profile } from "../../Models/profile";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
 }
axios.defaults.baseURL='http://localhost:5000';

axios.interceptors.request.use(config=>{
    const token=store.commonStore.token;
    
    if(token) config.headers.Authorization= `Bearer ${token}`
    return config
     
})

axios.interceptors.response.use(async response=>{
   
        await sleep(1000);
        return response;
    },(error:AxiosError)=>{
        const {data,status,config}:{data:any;status:number;config:any}=error.response!;
        console.log(error.response);
        switch(status){
            case 400:
                if(typeof data==='string'){
                    toast.error(data);
                }
                if(config.method==='get' && data.errors.hasOwnProperty('id')){
                    history.push('/not-found');
                }
                if(data.errors){
                    const modalStateErrors=[];
                    for(const key in data.errors){
                        if(data.errors[key]){
                            modalStateErrors.push(data.errors[key])
                        }
                    }
                    throw modalStateErrors.flat();
                }else{
                    toast.error(data);
                }
                break;
            case 401:
                 toast.error('unauthorised');
                 break;
            case 404:
                 history.push('notfound');
                 break;
            case 500:
                 store.commonStore.setServerError(data);
                 history.push('/server-error');
                 break;
        }
        return Promise.reject(error);
    })

const responseBody=<T>(response:AxiosResponse<T>)=>response.data;

const requests={

    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:<T>(url:string,body:{})=>axios.post<T>(url, body).then(responseBody),
    put:<T>(url:string,body:{})=>axios.put<T>(url,body).then(responseBody),
    delete:<T>(url:string)=>axios.delete<T>(url).then(responseBody),
}
const Account={
    current:()=>requests.get<User>('/account'),
    login:(user:UserFormValues)=>requests.post<User>('/account/login',user),
    register:(user:UserFormValues)=>requests.post<User>('/account/register',user)
}
const Profiles={
    get:(username:string)=>requests.get<Profile>(`/Profile/${username}`),
    uploadPhoto:(file:Blob)=>{
        let formData=new FormData();
        formData.append('File',file);
        return axios.post<Photo>('photos',formData,{
            headers:{'Content-type':'multipart/form-data'}
        })
    },
    setMainPhoto:(id:string)=>requests.post(`/photos/${id}/setMain`,{}),
    deletePhoto:(id:string)=>requests.delete(`/photos/${id}`),
    updateFollowing:(username:string)=>requests.post(`/follow/${username}`,{})
}

const Activities={
    list:()=>requests.get<Activity[]>('/activities'),
    details:(id:string)=>requests.get<Activity>('/activities/${id}'),
    create:(activity:ActivityFormValues)=>requests.post<void>('/activities',activity),
    update:(activity:ActivityFormValues)=>requests.put<void>(`/activities/${activity.id}`,activity),
    delete:(id:string)=>requests.delete<void>(`/activities/${id}`),
    attend:(id:string)=>requests.post<void>(`/activities/${id}/attend`,{})
}

const agent={
    Activities,
    Account,
    Profiles
}

export default agent;
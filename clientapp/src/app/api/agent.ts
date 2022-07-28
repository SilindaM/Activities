import axios, { AxiosResponse } from "axios";
import { Activity } from "../../Models/activity";

axios.defaults.baseURL='http://localhost:5000';

const responseBody=<T>(response:AxiosResponse<T>)=>response.data;

const requests={

    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:<T>(url:string,body:{})=>axios.post<T>(url, body).then(responseBody),
    put:<T>(url:string,body:{})=>axios.put<T>(url,body).then(responseBody),
    delete:<T>(url:string)=>axios.delete<T>(url).then(responseBody),
}

const Activities={
    list:()=>requests.get<Activity[]>('/activities')
}

const agent={
    Activities
}

export default agent;
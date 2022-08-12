import { makeAutoObservable } from "mobx";
import { ServerError } from "../../Models/serverError";

export default class commonStore{
    error:ServerError |null =null;
    token:string|null=null;
    appLoaded=false;

 constructor(){
    makeAutoObservable(this)
 }
 setServerError=(error:ServerError)=>{
    this.error=error;
 }
 setToken=(token:string|null)=>{
   if(token) window.localStorage.setItem('jwt',token);
 }
 setAppLoaded=()=>{
this.appLoaded=true
 }
}
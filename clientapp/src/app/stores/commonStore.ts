import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../../Models/serverError";

export default class commonStore{
    error:ServerError |null =null;
    token:string|null=window.localStorage.getItem('jwt');
    appLoaded=false;

 constructor(){
    makeAutoObservable(this);

    //check if the is a token in the browser 
    reaction(
      ()=>this.token,
      token=>{
         if(token){
            window.localStorage.setItem('jwt',token)
         }
         else{
            window.localStorage.removeItem('jwt')
         }
      }
    )
 }
 setServerError=(error:ServerError)=>{
    this.error=error;
 }
 setToken=(token:string|null)=>{
   this.token=token;
 }
 setAppLoaded=()=>{
   this.appLoaded=true
 }
}
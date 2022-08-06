import { makeAutoObservable } from "mobx";
import { ServerError } from "../../Models/serverError";

export default class commonStore{
    error:ServerError |null =null;

 constructor(){
    makeAutoObservable(this)
 }
 setServerError=(error:ServerError)=>{
    this.error=error;
 }
}
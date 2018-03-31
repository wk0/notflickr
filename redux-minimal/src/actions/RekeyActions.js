import * as types from './actionTypes';
import axios from 'axios';
import toastr from 'toastr';
import toastrOptions from '../toastrOptions';
toastr.options = toastrOptions;

export function rekeySuccess(rekeyResults){
    return {
        type : types.rekeySuccess,
        rekeyResults
    };
}




export function rekey(){
    return function(dispatch, getState){
        
    }

}

export default {
    rekey
}
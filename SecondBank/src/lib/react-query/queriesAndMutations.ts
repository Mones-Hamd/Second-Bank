import {useQuery,useQueryClient,useMutation} from '@tanstack/react-query'
import { createAccount, signInAccount } from '../appwrite/api'
import { INewUser } from '@/types'

export const useCreateAccountMutation = () =>{
    return useMutation({
        mutationFn: (user:INewUser) =>  createAccount(user) 
    }
    )
}

export const useSignInAccountMutation = () =>{
    return useMutation({
        mutationFn: (user:{email:string,
        password: string}) =>  signInAccount(user) ,
    }
    )
}
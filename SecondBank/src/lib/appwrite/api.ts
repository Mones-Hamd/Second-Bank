/* eslint-disable no-useless-catch */
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID ,Query} from "appwrite";

// ============================== SAVE USER TO DB  ==============
export async function saveUserToDB(user: {
    userId: string;
    email: string;
    name: string;
    imageUrl: URL;
  }) {
    try {
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
      );
  
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
// ============================== SIGN UP ==============
export async function createAccount(user:INewUser) {
    try{
        const newAccount = await account.create(ID.unique(),
            user.email,
            user.password,
            user.name) 

        if (!newAccount) throw Error;

        const avatarUrl =  avatars.getInitials(user.name);
    
        const newUser = await saveUserToDB({
            userId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            imageUrl: avatarUrl,
        });
        return newUser
    }catch(err){
        console.error(err)
        throw err
    }

}
// ============================== SIGN IN ==============
export async function signInAccount (user:{email:string,password:string}) {
 
    try{
        const session = await account.createEmailSession(user.email,user.password)
        console.log(session)
        return session
    }catch(err){
     throw  err

    }
}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw error
    }
  }
  

export async function getCurrentUser() {
try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw new Error("User document not found");
    
    const currentUser = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [ Query.equal("userId", currentAccount.$id)]
    );

    return currentUser.documents[0];
} catch (error) {
    throw error
}
}
  
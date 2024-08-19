import { useState } from "react"
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "./useAuth";


const useStorage=()=>{
    const [progress,setProgress]=useState(0);
    const [error,setError]=useState(null);
    const {user} = useAuth()

    const startUpload=(file)=>{
      if(!file){
        return ;
      }  
      
     const fileId=uuidv4();
     const fileFormat=file.type.split('/')[1];
   
      const storageRef = ref(storage, `images/${fileId}.${fileFormat}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
     
      uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress(progress);
  }, 
  (error) => {
    setError(error);
  }, 
  async() => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
   const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
   setProgress(progress)
   await addDoc(collection(db, "images"), {
    imageUrl: downloadURL,
    createdAt: new Date(),
    userEmail:user.email
  });
}
);
}

    return {
        progress, error, startUpload
    }

}
export default useStorage
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 
  let unsubscribe;
  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(collection(db, collectionName),orderBy("createdAt","desc"));
         unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            const imageUrl = doc.data().imageUrl;
            const createdAt = doc.data().createdAt.toDate();
            const userEmail = doc.data().userEmail;
            images.push({imageUrl,createdAt,userEmail});
          });
          setDocs(images);
          setIsLoading(false); // Set loading to false once data is received
          setError(null); // Clear any previous errors
        }, (error) => {
          console.error("Error getting documents: ", error);
          setIsLoading(false); // Set loading to false in case of an error
          setError(error.message); // Set the error state for detailed logging
        });

        // Cleanup function to unsubscribe from the snapshot listener
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error in data fetching: ", error);
        setIsLoading(false); // Set loading to false in case of an error
        setError(error.message); // Set the error state for detailed logging
      }
    };

    getData();
    return  ()=>unsubscribe && unsubscribe()
  }, [collectionName]); // Add collectionName as a dependency to re-run useEffect when it changes
  return {
    docs,
    isLoading,
    error,
  };
};

export default useFirestore;

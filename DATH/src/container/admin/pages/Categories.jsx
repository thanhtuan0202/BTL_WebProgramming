import React, {useEffect, useState} from 'react';
import Loader from '../../../components/Loader';

export default function Categories (){
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    const fetchCategory = async () => {
        try {
          const res = await axios.get(
            `http://localhost/assignment/backend/index.php/categories`
          );
          setCategory(res.data.data);
          
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchCategory();
      }, []);

    return loading === true ? <Loader /> : (
        <div>
            <h2> Catogory page</h2>
        </div>
    );
}
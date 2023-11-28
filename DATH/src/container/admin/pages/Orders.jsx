import React, {useEffect, useState} from 'react';
import Loader from '../../../components/Loader';

export default function Orders (){
    const [loading, setLoading] = useState(true);
    return loading === true ? <Loader /> : (
        <div>
            <h1> Order page</h1>
        </div>
    );
}
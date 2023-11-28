import React, {useEffect, useState} from 'react';
import Loader from '../../../components/Loader';

export default function InfoAdmin (){
    const [loading, setLoading] = useState(true);
    return loading === true ? <Loader /> : (
        <div>
            <h1> info admin page</h1>
        </div>
    );
}
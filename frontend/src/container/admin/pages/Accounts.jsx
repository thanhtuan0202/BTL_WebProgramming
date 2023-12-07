import React, {useEffect, useState} from 'react';
import Loader from '../../../components/Loader';

export default function Accounts (){
    const [loading, setLoading] = useState(true);
    return loading === true ? <Loader /> : (
        <div>
            <h1> Quản lý tài khoản</h1>
        </div>
    );
}
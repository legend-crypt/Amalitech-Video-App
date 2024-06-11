import React, {ReactNode, useEffect,} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';

interface ProtectedPageProps {
    Component: ReactNode;
}



const  ProtectedPage: React.FC<ProtectedPageProps> = ({ Component }: ProtectedPageProps) =>  {
    const navigate = useNavigate();
    const {isUserLogin} = useSelector((state: RootState) => state.userAuth);

    useEffect(() => {
        if (!isUserLogin) {
            console.log(isUserLogin)
            navigate('/login');
        }
    
    }, [isUserLogin])

    return <>{isUserLogin ? Component: null}</>
}

export default ProtectedPage
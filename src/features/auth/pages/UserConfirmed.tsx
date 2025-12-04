import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import apiClient from '../../../services/config-client/apiClient';


const UserConfirmed = () => {

    const params = useParams();

    useEffect(() => {
        const confirmUser = async () => {
            try {

                console.log(params.id);
                
                const { data } = await apiClient.post(`/auth/confirm-user/${params.id}`);

                console.log(data);

            } catch (error) {
                console.log(error);
            }

        }
        confirmUser();
    }, [])


    return (
        <div className='flex justify-center items-center h-full'>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
                <p className="text-gray-800 text-lg mb-4">
                    This user has been confirmed. Please login.
                </p>
                <Link
                    to="/login"
                    className="inline-block px-6 py-2 bg-black text-white font-bold rounded hover:bg-gray-800 transition-colors"
                >
                    Login
                </Link>
            </div>
        </div>
    )
}


export default UserConfirmed

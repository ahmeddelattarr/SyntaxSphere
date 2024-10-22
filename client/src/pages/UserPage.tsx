import { useParams } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import useFetchWithToken from "../hooks/useFetchWithToken";

const UserPage = ()=>{

    const userId = useParams().userId!;
    const {data}=useFetchWithToken(`profiles/${userId}/`,"GET");
    console.log(data,'1');

    return(
        <>
        <Navbar/>
        </>
    )
}

export default UserPage;
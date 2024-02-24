

import { memo,Dispatch,SetStateAction } from 'react';
import {Clinic} from '../components/Searchclinic'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import ApiUrl from '../ApiUrl/URL'

function Clinicitem({Clinic,setRefreash}:{Clinic:Clinic,setRefreash:(Dispatch<SetStateAction<boolean>>)}) {
    const {WazeSite, Area,ClinicCode,ClinicName,_id} = Clinic;

    const Delete = async ()=>{
        try {
            const response = await axios.delete(`${ApiUrl}/deleteClinic?_id=${_id}`);
            if(response.status !==200) return alert('failed to remove');
            setRefreash((prev)=>{return !prev});
            alert('clinic removed');
        } catch (error) {
            console.log(error);
        }

    } 
    
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td className='px-6 py-4'><button onClick={Delete} className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'><MdDelete /></button></td>
    <td className='px-6 py-4'><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'><FaEdit /></button></td>
    <td className="px-6 py-4">
        {WazeSite}
    </td>
    <td className="px-6 py-4">
        {Area}
    </td>
    <td className="px-6 py-4">
        {ClinicCode}
    </td>
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {ClinicName}
    </th>
</tr>
  )
}

export default memo(Clinicitem);
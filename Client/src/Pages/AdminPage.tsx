import { useEffect, useState } from "react"
import Clinicitem from "../components/Clinicitem"
import axios from "axios"
import { Clinic } from "../components/Searchclinic"
import Url from '../ApiUrl/URL'

function AdminPage() {
    const [Clinics, setClinics] = useState<Clinic[]>([]);

    useEffect(()=>{
        async function GetClinics(){
            try {
                const response = await axios.get(`${Url}/getClinics`);
                setClinics(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        GetClinics();
    },[])

  return (
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr> 
                <th scope="col" className="px-6 py-3">
                    Waze
                </th>
                <th scope="col" className="px-6 py-3">
                    מנהלת
                </th>
                <th scope="col" className="px-6 py-3">
                    קוד מרפאה
                </th>
                <th scope="col" className="px-6 py-3">
                    שם מרפאה
                </th>
            </tr>
        </thead>
        <tbody>
            {Clinics.map((item)=>{
                return (
                <Clinicitem Clinic={item} />)
            })}
         
        </tbody>
    </table>
</div>

  )
}

export default AdminPage
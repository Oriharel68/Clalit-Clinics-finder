

import {Clinic} from '../components/Searchclinic'

function Clinicitem({Clinic}:{Clinic:Clinic}) {


  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                
    <td className="px-6 py-4">
        {Clinic.WazeSite}
    </td>
    <td className="px-6 py-4">
        {Clinic.Area}
    </td>
    <td className="px-6 py-4">
        {Clinic.ClinicCode}
    </td>
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {Clinic.ClinicName}
    </th>
</tr>
  )
}

export default Clinicitem
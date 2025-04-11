import { getfacilityById } from "@/actions/getFacilityById";
import AddFacilityForm from "@/components/facility/AddFacilityForm";
import { auth } from "@clerk/nextjs/server";

interface FacilityPageProps{
    params:{
        facilityId:string
    }
}
const Facility = async({params}:FacilityPageProps) => {
    const facility=await getfacilityById(params.facilityId)
    const { userId } = await auth();

    if (!userId) return <div>Not authenticated...</div>

    if (facility && facility.userId !== userId) return <div>Access denied...</div>
    return ( 
        <div>
            <AddFacilityForm facility={facility}/>
        </div>
     );
}
 
export default Facility;
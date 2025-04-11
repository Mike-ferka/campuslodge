import prismadb from "@/lib/prismadb"

export const getfacilityById=async(facilityId: string)=>{

    try{
  const facility=await prismadb.facility.findUnique({
    where:{id:facilityId},
    include:{
        equipment :true
    }
  })
if(!facility) return null;

return facility

    }catch(error:any){
        throw new Error(error)
    }
}
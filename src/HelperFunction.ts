
export const IsStudent = (id:string) =>{
 
    if(id.startsWith("STUD")){
        return true
    } else {
        return false
    }
}
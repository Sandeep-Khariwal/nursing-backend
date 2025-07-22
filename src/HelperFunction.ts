
export const IsStudent = (id:string) =>{
 
    if(id.startsWith("STUD")){
        return true
    } else {
        return false
    }
}
export const IsQuiz = (id:string) =>{
 
    if(id.startsWith("QUIZ")){
        return true
    } else {
        return false
    }
}
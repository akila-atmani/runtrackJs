function bisextile(année) {
    
    if (année % 4 === 0) {
       
        if (année % 100 === 0) {
            if (année % 400 === 0) {
                return true;  
            } else {
                return false; 
            }
        } else {
            return true; 
        }
    } else {
        return false; 
    }
}


console.log(bisextile(2027)); 


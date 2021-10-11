export const arrayRemove = (arr: any, value: any)  => { 
    
    return arr.filter((element: any) => { 
        return element != value; 
    });
}


const rolesOfNavigation = (navigations,roles)=>{

    let data = [];
    
    navigations.items.map((item)=>{
        let json = {}
        if(item.code =='default'){
            data.push(item);
        }
        
        roles.map((role)=>{
            if(role.role_code === item.code){  
                data.push(item);
            }
        });

    });


    navigations.items = data;
    //console.log(roles);


    return navigations;
    
};

export default rolesOfNavigation;
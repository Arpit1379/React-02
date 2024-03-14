export const verifyRoles=(allowedRoles)=>{
    return function(req,res,next){
        const userRole=req.user?.role;
    
        if (!userRole) {
            return res.status(403).json({ message: "Role not found, access denied" });
        }
        if(allowedRoles.includes('ADMIN'))
        next();
        else 
        return res.status(403).json({ message: "Insufficient role, access denied" });
    }
}
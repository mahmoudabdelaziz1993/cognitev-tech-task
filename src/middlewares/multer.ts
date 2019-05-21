import * as multer from 'multer'

/**
|--------------------------------------------------
| multer middlware  setup uploads storage and file type
|--------------------------------------------------
*/
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        
        cb(null,'./src/public/uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
});
const fileFlitter = (req:any,file:any,cb:any)=>{
    if (file.mimetype === 'image/jpeg'||file.mimetype === 'image/png'||file.mimetype === 'image/jgp') {
       cb(null,true);   
    }else{
       cb(null,false);
    }
}
export const upload = multer({storage:storage,fileFilter:fileFlitter});
//-------------------------------------------------------------------

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import S3FileUpload, { deleteFile } from 'react-s3';

const S3_BUCKET = 'shakeeb-crm';
const REGION = 'us-east-2';


const config = {
  bucketName: S3_BUCKET,
  dirName: 'videos', /* optional */
  region: REGION,
  accessKeyId: 'AKIA57IYNILPJ45CH7JK',
  secretAccessKey: '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',

}



function App() {

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }
  const uploadFile = (file) => {

    console.log("uploading....")
  
    S3FileUpload.uploadFile(file, config)
    .then(data => console.log("done ==> ",data))
    .catch(err => console.error(err))


  }

  const delteFile=()=>{

    console.log("delte....")
    S3FileUpload
    .deleteFile("zoom_0 (2).mp4", config)
    .then(response => console.log(response))
    .catch(err => console.error(err))
  }

 
 

  return (
    <div className="App">

<div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        <button onClick={() => delteFile()}>Delete</button>
       
    </div>
  );
}

export default App;













// import { Upload } from "@aws-sdk/lib-storage"
// import {S3Client,S3, Progress,AbortMultipartUploadCommand } from "@aws-sdk/client-s3"
// import React, { useState } from 'react'


// function App() {

//   const [progress , setProgress] = useState(0);

//   const  upload = (file) => {
//     console.log("start uploading...")
//     var file = file.target.files[0]
//     const target = {Bucket:"shakeeb-crm",Key:`video/${file.name}`,Body:file}
//     const creds = {accessKeyId: 'AKIA57IYNILPJ45CH7JK',secretAccessKey: '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'}
//     try{
//       const parallelUploads3 =new Upload({

//         client: new S3({region:"us-east-2",credentials:creds}) || new S3Client({region:"us-east-2",credentials:creds}),
//         // client: new S3Client({region:"us-east-2",credentials:creds}),
//         // queueSize:1,
//         // partSize:1024 * 1024 * 5,
//         leavePartsOnError:false,
//         params:target,
        
//       })

//       parallelUploads3.on("httpUploadProgress",(progress)=>{
//         console.log("progress",progress)
//         setProgress(Math.round((progress.loaded / progress.total) * 100))
//       });

//   parallelUploads3.done()


//     }
//     catch(e){
//       console.log("exception ",e)

//     }

//   }

//   return (
//     <div>

//       <div>Native SDK File Upload Progress is {progress}%</div>

//       <input type="file" onChange={upload}/>  


//     </div>

//   )



// }

// export default App;








































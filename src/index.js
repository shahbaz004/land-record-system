import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);






































// import { useState } from 'react';
// import './App.css';
// import { Button, Form } from 'react-bootstrap';
// import Loader from './Loader';
// import { encode as base64_encode } from 'base-64';
// require('dotenv').config()
// const IPFS = require('ipfs-api');

// let secrets = process.env.REACT_APP_INFURA_PROJECT_ID + ':' + process.env.REACT_APP_INFURA_PROJECT_SECRET;
// let encodedSecrets = base64_encode(secrets);
// const ipfs = new IPFS({
//   host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
//     Authorization: 'Basic ' + encodedSecrets
//   }
// });

// function App() {
//   const [buf, setBuf] = useState();
//   const [hash, setHash] = useState("");
//   const [loader, setLoader] = useState(false);
//   const [showLinks, setShowLinks] = useState(false);
//   const [showLinks1, setShowLinks2] = useState(false);
//   const captureFile = (event) => {
//     event.stopPropagation()
//     event.preventDefault()
//     const file = event.target.files[0]
//     let reader = new window.FileReader()
//     reader.readAsArrayBuffer(file)
//     reader.onloadend = () => convertToBuffer(reader)
//   };

//   const convertToBuffer = async (reader) => {
//     //file is converted to a buffer to prepare for uploading to IPFS
//     const buffer = await Buffer.from(reader.result);
//     setBuf(buffer);
//   };
//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setLoader(true);
//     let ipfsId
//     const buffer = buf
//     await ipfs.add(buffer)
//       .then((response) => {
//         ipfsId = response[0].hash
//         console.log("Generated IPFS Hash: ", ipfsId)
//         setHash(ipfsId);
//       }).catch((err) => {
//         console.error(err)
//         alert('An error occurred. Please check the console');
//       })
//     if (ipfsId)
//       setShowLinks(true)
      
//     else
//       setShowLinks(false)
//     setLoader(false);
//   }
//   if (ipfsId)
//   setShowLinks1(true)
// else
//   setShowLinks2(false)
// setLoader(false);
// }
//   if (ipfsId){
//   setShowLinks1(true)
// }
// else{
//   setShowLinks2(false)
// setLoader(false);
// }
//   if (loader) {
//     return (
//       <Loader />
//     )
//   }
//   return (
//     <div>
//       <h1>Upload files to IPFS</h1>
//       <h5> Choose file to upload to IPFS </h5>
//       <Form onSubmit={onSubmit}>
//         <input type="file" onChange={captureFile} required />

//         <Button type="submit">Upload</Button>
        
//       </Form>
    
//       {
//         showLinks ?
//           <div>
//             <p>---------------------------------------------------------------------------------------------</p>
//             <h6>IPFS Hash: {hash}</h6>
//             <p>Non clickabe Link: https://ipfs.io/ipfs/{hash}</p>
//             <a href={"https://ipfs.io/ipfs/" + hash}>Clickable Link to view file on IPFS </a>
//             <br></br><br></br>
//             <button>Create MetaData</button>
//             {
//               showLinks1 ?
//               <div>
//                 <input type='text' placeholder='Name'/>
//                 <input type='text' placeholder='Description'/>
//                 <button/>
//                 </div>:
//                 <p>

//                 </p>
//             }
//           </div> :
//           <p>

//           </p>

//       }


//     </div>
//   );


// export default App;




// import { useState } from 'react';
// import './App.css';
// import { Button, Form } from 'react-bootstrap';
// import Loader from './Loader';
// import { encode as base64_encode } from 'base-64';
// require('dotenv').config()
// const IPFS = require('ipfs-api');

// let secrets = process.env.REACT_APP_INFURA_PROJECT_ID + ':' + process.env.REACT_APP_INFURA_PROJECT_SECRET;
// let encodedSecrets = base64_encode(secrets);
// const ipfs = new IPFS({
//   host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
//     Authorization: 'Basic ' + encodedSecrets
//   }
// });

// function App() {
//   const [buf, setBuf] = useState();
//   const [hash, setHash] = useState("");
//   const [loader, setLoader] = useState(false);
//   const [showLinks, setShowLinks] = useState(false);
//   const [showMetadataForm, setShowMetadataForm] = useState(false);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [ipfsId, setIpfsId] = useState("");

//   const captureFile = (event) => {
//     event.stopPropagation()
//     event.preventDefault()
//     const file = event.target.files[0]
//     let reader = new window.FileReader()
//     reader.readAsArrayBuffer(file)
//     reader.onloadend = () => convertToBuffer(reader)
//   };

//   const convertToBuffer = async (reader) => {
//     const buffer = await Buffer.from(reader.result);
//     setBuf(buffer);
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setLoader(true);
//     const buffer = buf;
//     await ipfs.add(buffer)
//       .then((response) => {
//         const ipfsId = response[0].hash;
//         console.log("Generated IPFS Hash: ", ipfsId);
//         setHash(ipfsId);
//         setIpfsId(ipfsId);
//       })
//       .catch((err) => {
//         console.error(err);
//         alert('An error occurred. Please check the console');
//       });
//     setShowLinks(true);
//     setShowMetadataForm(false);
//     setLoader(false);
//   }

//   const onMetadataSubmit = async (event) => {
//     event.preventDefault();
//     console.log('Name: ', name);
//     console.log('Description: ', description);
//     setShowMetadataForm(false);
//   }

//   if (loader) {
//     return <Loader />;
//   }

//   return (
//     <div>
//       <h1>Upload files to IPFS</h1>
//       <h5>Choose file to upload to IPFS</h5>
//       <Form onSubmit={onSubmit}>
//         <input type="file" onChange={captureFile} required />
//         <Button type="submit">Upload</Button>
//       </Form>
//       {showLinks &&showLinks ?
//           <div>
//             <p>---------------------------------------------------------------------------------------------</p>
//             <h6>IPFS Hash: {hash}</h6>
//             <p>Non clickabe Link: https://ipfs.io/ipfs/{hash}</p>
//             <a href={"https://ipfs.io/ipfs/" + hash}>Clickable Link to view file on IPFS </a>
//             <br></br><br></br>
//             <button onClick={()=>{onMetadataSubmit()}}>Create MetaData</button>
//             {
//               {showMetadataForm && (
//                 <div>
//                   <form onSubmit={onMetadataSubmit}>
//                     <div>
//                       <label htmlFor="name">Name:</label>
//                       <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="description">Description:</label>
//                       <input
//                         type="text"
//                         id="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                       />
//                     </div>
//                     <button type="submit">Submit</button>
//                   </form>
//                 </div>
//               )}
              
                   
                
//                 <p>

//                 </p>
            
//           </div> :
//           <p>

//           </p>

//       }


//     </div>
//   );
//  }


// export default App;





























// import React, { useState } from 'react';
// import ipfsClient from 'ipfs-http-client';
// import { Form, Button } from 'react-bootstrap';
// import Loader from './Loader';

// const ipfs = ipfsClient({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
// });

// const App = () => {
//   const [buf, setBuf] = useState();
//   const [hash, setHash] = useState('');
//   const [loader, setLoader] = useState(false);
//   const [showLinks, setShowLinks] = useState(false);
//   const [showMetadataForm, setShowMetadataForm] = useState(false);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [ipfsId, setIpfsId] = useState('');

//   const captureFile = (event) => {
//     event.stopPropagation();
//     event.preventDefault();
//     const file = event.target.files[0];
//     let reader = new window.FileReader();
//     reader.readAsArrayBuffer(file);
//     reader.onloadend = () => convertToBuffer(reader);
//   };

//   const convertToBuffer = async (reader) => {
//     const buffer = await Buffer.from(reader.result);
//     setBuf(buffer);
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setLoader(true);
//     const buffer = buf;
//     try {
//       const response = await ipfs.add(buffer);
//       const ipfsId = response.path;
//       console.log('Generated IPFS Hash: ', ipfsId);
//       setHash(ipfsId);
//       setIpfsId(ipfsId);
//       setShowLinks(true);
//     } catch (err) {
//       console.error(err);
//       alert('An error occurred. Please check the console');
//     }
//     setLoader(false);
//   };

//   const onMetadataSubmit = (event) => {
//     event.preventDefault();
//     console.log('Name: ', name);
//     console.log('Description: ', description);
//     setShowMetadataForm(false);
//   };

//   if (loader) {
//     return <Loader />;
//   }

//   return (
//     <div>
//       <h1>Upload files to IPFS</h1>
//       <h5>Choose file to upload to IPFS</h5>
//       <Form onSubmit={onSubmit}>
//         <input type="file" onChange={captureFile} required />
//         <Button type="submit">Upload</Button>
//       </Form>
//       {showLinks && (
//         <div>
//           <p>---------------------------------------------------------------------------------------------</p>
//           <h6>IPFS Hash: {hash}</h6>
//           <p>
//             Non clickable Link: https://ipfs.io/ipfs/{hash}
//           </p>
//           <a href={`https://ipfs.io/ipfs/${hash}`}>
//             Clickable Link to view file on IPFS{' '}
//           </a>
//           <br />
//           <br />
//           <button onClick={() => setShowMetadataForm(true)}>
//             Create MetaData
          // </button>
          // {showMetadataForm ? (
          //   <form onSubmit={onMetadataSubmit}>
          //     <input
          //       type="text"
          //       placeholder="Name"
          //       onChange={(e) => setName(e.target.value)}
          //     />
          //     <input
          //       type="text"
          //       placeholder="Description"
          //       onChange={(e) => setDescription(e.target.value)}
          //     />
//               <button type="submit">Submit</button>
//             </form>
//           ) : (
//             <p></p>
//           )}
//         </div>)
// }
// </div>
//   )
// }
// export default App;
     

























// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import Loader from "./Loader";
// import ipfs from "./ipfs";

// const App = () => {
//   const [buf, setBuf] = useState();
//   const [hash, setHash] = useState("");
//   const [loader, setLoader] = useState(false);
//   const [showLinks, setShowLinks] = useState(false);
//   const [showMetadataForm, setShowMetadataForm] = useState(false);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [ipfsId, setIpfsId] = useState("");

//   const captureFile = async (event) => {
//     event.stopPropagation();
//     event.preventDefault();
//     const file = event.target.files[0];
//     const reader = new window.FileReader();
//     reader.readAsArrayBuffer(file);
//     reader.onloadend = () => convertToBuffer(reader);
//   };

//   const convertToBuffer = async (reader) => {
//     const buffer = await Buffer.from(reader.result);
//     setBuf(buffer);
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setLoader(true);
//     const buffer = buf;
//     try {
//       const response = await ipfs.add(buffer);
//       const ipfsId = response.path;
//       console.log("Generated IPFS Hash: ", ipfsId);
//       setHash(ipfsId);
//       setIpfsId(ipfsId);
//       setShowLinks(true);
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred. Please check the console");
//     }
//     setLoader(false);
//   };

//   const onMetadataSubmit = (event) => {
//     event.preventDefault();
//     console.log("Name: ", name);
//     console.log("Description: ", description);
//     setShowMetadataForm(false);
//   };

//   if (loader) {
//     return <Loader />;
//   }

//   return (
//     <div>
//       <h1>Upload files to IPFS</h1>
//       <h5>Choose file to upload to IPFS</h5>
//       <Form onSubmit={onSubmit}>
//         <input type="file" onChange={captureFile} required />
//         <Button type="submit">Upload</Button>
//       </Form>
//       {showLinks ? (
//         <div>
//           <p>---------------------------------------------------------------------------------------------</p>
//           <h6>IPFS Hash: {hash}</h6>
//           <p>Non-clickable Link: https://ipfs.io/ipfs/{hash}</p>
//           <a href={"https://ipfs.io/ipfs/" + hash}>
//             Clickable Link to view file on IPFS
//           </a>
//           <br />
//           <br />
//           <button onClick={() => setShowMetadataForm(true)}>
//             Create MetaData
//           </button>
//           {showMetadataForm ? (
//             <div>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 onChange={(event) => setName(event.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 onChange={(event) => setDescription(event.target.value)}
//               />
//               <button onClick={onMetadataSubmit}>Submit</button>
//             </div>
//           ) : (
//             <p></p>
//           )}
//         </div>
//       ) : (
//         <p></p>
//       )}
//     </div>
//   );
// };

// export default App;

import { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import Loader from './Loader';
import { encode as base64_encode } from 'base-64';
require('dotenv').config()
const IPFS = require('ipfs-api');
let secrets = process.env.REACT_APP_INFURA_PROJECT_ID + ':' + process.env.REACT_APP_INFURA_PROJECT_SECRET;
let encodedSecrets = base64_encode(secrets);
const ipfs = new IPFS({
  host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
    Authorization: 'Basic ' + encodedSecrets
  }
});
function App() {
  const [buf, setBuf] = useState();
  const [hash, setHash] = useState("");
  const [loader, setLoader] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showMetadataForm, setShowMetadataForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ipfsId, setIpfsId] = useState("");
  // const [WalletAddress,setWalletAddress] = useState("");

const createJSONFile = (data, fileName) => {
  // const jsonData = JSON.stringify(data);
  // const blob = new Blob([jsonData], { type: 'application/json' });
  // saveAs(blob, fileName);
  // console.log(data)

}
const myData = {
  Name: name,
    Description: description,
    Hash:hash,
};

const handleExport = () => {
  // console.log(myData)
  createJSONFile(myData, 'myData.json');
  console.log(myData,"MyjsonFile")
}
  const captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0];
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader)
  };

  const convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    setBuf(buffer);
  };






// const input = [
//   {
//     'id': '0x10',
//     'date': '14.07.2018'
//   },
//   {
//     'id': '0x20',
//     'date': '14.07.2018'
//   },
//   {
//     'id': '0x30',
//     'date': '14.07.2018'
//   }
// ]
const input = {
  Name: name,
    Description: description,
    Hash:hash,
};

ipfs.files.add(Buffer.from(JSON.stringify(input)))
  .then(res => {
    const hash = res[0].hash
    console.log('added data hash:', hash)
    return ipfs.files.cat(hash)
  })
  .then(output => {
    console.log('retrieved data:', JSON.parse(output))
  })

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    const buffer = buf;
    await ipfs.add(buffer)
      .then((response) => {
        const ipfsId = response[0].hash;
        setHash(ipfsId);
        setIpfsId(ipfsId);
        // setShowMetadataForm(true)
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred. Please check the console');
      });
    setShowLinks(true);
    // setShowMetadataForm(false);
    setLoader(false);
  }

// async function main() {
//   console.log('Requesting accounts...')

//   if (window.ethereum) {
//     console.log('Ethereum browser extension detected')

//     try {
//       const accounts = await window.ethereum.request({
//         method: 'eth_requestAccounts'
//       })
//        setWalletAddress(accounts[0]);
//       console.log('Retrieved accounts:', accounts)
//     } catch (error) {
//       console.error('Error retrieving accounts:', error)
//     }
//   } else {
//     console.log('No Ethereum browser extension detected')
//   }
// }


  const onMetadataSubmit =  (event) => {
    setShowMetadataForm(true); 
  }
  if (loader) {
    return <Loader />;
  }
  return (
      <div>
      <h1>Upload files to IPFS</h1>
      <h5>Choose file to upload to IPFS</h5>
      <Form onSubmit={onSubmit}>
        <input type="file" onChange={captureFile} required />
        <Button type="submit">Upload</Button>
        {/* <Button onClick={()=>{main()}}>Connect</Button>
        <h3>Wallet Adress:{WalletAddress}</h3> */}
      </Form>

      {showLinks && showLinks ?
          <div>
            <h6>IPFS Hash: {hash}</h6>
            <p>Non clickabe Link: https://ipfs.io/ipfs/{hash}</p>
            <a href={"https://ipfs.io/ipfs/" + hash}>Clickable Link to view file on IPFS </a>
            <br></br><br></br>
            <button onClick={()=>{onMetadataSubmit()}}>Create MetaData</button>
              {showMetadataForm && (
                <div>
                  <form onSubmit={(event) => {
  event.preventDefault();
  onMetadataSubmit();
}}>
                    <div>
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="description">Description:</label>
                      <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <button onClick={()=>{(handleExport())}}> Upload IPFS</button>
               
                  </form>
                </div>
                
              )}  
            <p>
          </p>  
              </div>
          : 
        <p>
        </p>  
              
      }
    

  </div>

  );
 }


export default App;

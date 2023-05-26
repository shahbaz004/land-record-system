import { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import Loader from './Loader';
import { encode as base64_encode } from 'base-64';
import dotenv from 'dotenv';
import IPFS from 'ipfs-api';

import React from "react";
import ABI from "./abi.json";
import { ethers } from "ethers";


dotenv.config();

const secrets = process.env.REACT_APP_INFURA_PROJECT_ID + ':' + process.env.REACT_APP_INFURA_PROJECT_SECRET;
const encodedSecrets = base64_encode(secrets);

const ipfs = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    Authorization: 'Basic ' + encodedSecrets,
  },
});

function Home() {
  const [buf, setBuf] = useState(null);
  const [hash, setHash] = useState('');
  const [updateHash, setupdateHash] = useState('');
  const [loader, setLoader] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showMetadataForm, setShowMetadataForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [tokenId, setTokenId] = useState('');
  const [metaData, setMetadata] = useState('');

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    setBuf(buffer);
  };

  const input = {
    name: name,
    description: description,
    image: 'https://ipfs.io/ipfs/' + hash,
  };

  const handlePush = async () => {
    try {
      const res = await ipfs.files.add(Buffer.from(JSON.stringify(input)));
      const result = res[0].hash;
      setupdateHash(result);
      const metaData = 'https://ipfs.io/ipfs/' + result;
      console.log("==========data=================",result)

      setMetadata(metaData)

      console.log('added data hash:', result);
      // const output = await ipfs.files.cat(result);
      console.log('retrieved data:',metaData);

    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (event) => {
    setLoader(true);
    const buffer = buf;
    await ipfs
      .add(buffer)
      .then((response) => {
        const ipfsId = response[0].hash;
        setHash(ipfsId);
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred. Please check the console');
      });
    setShowLinks(true);
    setLoader(false);
  };


  const onMetadataSubmit = (event) => {
    setShowMetadataForm(true);
  }
  if (loader) {
    return <Loader />;
  }

  async function meta(event) {
    event.preventDefault();

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const accounts = await provider.send("eth_requestAccounts");
      console.log(accounts[0]);
      const contractAddress = "0x24e6a79c00a9e7f61101ccb880cc3db3647518c2";
      const contractABI = ABI;
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      // whitelisting wallet address of users to mnt nft
      const whitelist = await contract.whitelist('0xd35B39AE7755c6daF75a5547cc204C2E203558f0')
      // blacklist wallet address of users
      // const blacklist = await contract.blacklist('0xd35B39AE7755c6daF75a5547cc204C2E203558f0')
      console.log("========whitelist=======",whitelist)
      const owner = await contract.owner();
      console.log("owner", owner);
      const tx = await contract.mint(
        owner,
        tokenId,
        metaData
      );
      console.log(tx);
    } else {
      console.log("Please install Metamask to use this feature");
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setTokenId(tokenId)
    console.log("==========token_id===========",tokenId)
  }

  return (
    <div>
      <h1>Upload files to IPFS</h1>
      <h5>Choose file to upload to IPFS</h5>
      <Form onSubmit={onSubmit}>
        <input type="file" onChange={captureFile} required />
        <Button type="submit">Upload</Button>
      </Form>

      {showLinks && showLinks ?
        <div>
          {/* <h6>IPFS Hash: {hash}</h6> */}
          {/* <p>Non clickabe Link: https://ipfs.io/ipfs/{hash}</p> */}
          <a href={"https://ipfs.io/ipfs/" + hash}>Clickable Link to view file on IPFS </a>
          <br></br><br></br>
          <button onClick={() => { onMetadataSubmit() }}>Create MetaData</button>
          {showMetadataForm && (
            <div>
              <form onSubmit={(event) => {
                event.preventDefault();
                onMetadataSubmit();
                onSubmit();
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

                <button onClick={handlePush}>Upload IPFS</button>
                {updateHash && showMetadataForm && (
                  <div>
                    {/* <p>{metaData}</p> */}
                    <a href={metaData}>Clickable Link to view file on IPFS</a>
                      <br></br>
                      <br></br>
                      <h1>MintNft</h1>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="tokenId">
                          <Form.Label>TokenId:</Form.Label>
                          <input
                            type="text"
                            value={tokenId}
                            className='form'
                            onChange={(e) => setTokenId(e.target.value)}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={meta}>
                          Mint NFT
                        </Button>
                      </Form>
                  </div>

                )}

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


export default Home;











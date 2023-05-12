const [buf1, setBuf1] = useState(null);
const [buf2, setBuf2] = useState(null);





const convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    setBuf1(buffer);
  };
  
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    const buffer = buf1;
    await ipfs.add(buffer)
      .then((response) => {
        const ipfsId = response[0].hash;
        setHash(ipfsId);
        setIpfsId(ipfsId);
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred. Please check the console');
      });
    setShowLinks(true);
    setLoader(false);
  };

  



  const convertToBuffer = async (reader) => {
    const buffer = new Uint8Array(reader.result);
    setBuf1(buffer);
  };
  
  const convertToBuffer1 = async (reader1) => {
    const buffer1 = new Uint8Array(reader1.result);
    setBuf2(buffer1);
  };

  

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    const buffer = buf1;
    await ipfs.add(buffer)
      .then((response) => {
        const ipfsId = response[0].hash;
        setHash(ipfsId);
        setIpfsId(ipfsId);
        setShowLinks(true);
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred. Please check the console');
        setLoader(false);
      });
  };
  
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function MintNFT() {
  const [tokenId, setTokenId] = useState('');
  const [address, setAddress] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit form data
  };

  return (
    <div>
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
        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <input
            type="text"
            value={address}
            className='form'
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default MintNFT;

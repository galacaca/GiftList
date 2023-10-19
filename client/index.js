const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const { toHex } = require("ethereum-cryptography/utils");

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
    const name = 'Norman Block';
    const merkleTree = new MerkleTree(niceList);
    const root = merkleTree.getRoot();
    const index = niceList.findIndex(n => n === name);
    const proof = merkleTree.getProof(index);
   // console.log(proof);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    person: name,
    proof: proof,


  });
  console.log({name});
  console.log({ gift });
}

main();




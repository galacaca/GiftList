const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');


const port = 1225;
const path = require('path')
const app = express();
app.use(express.json());
//app.use(express.static(path.join(__dirname, '../client')));

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix

const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();


app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {person,proof} = req.body;
  //const body = req.body;

  // TODO: prove that a name is in the list 
    
  const isInTheList = verifyProof(proof, person, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

//app.get('*', (req, res) => {
 // res.sendFile(path.join(__dirname, '../client/index.html'));
//});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

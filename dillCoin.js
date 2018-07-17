/////////THIS PACKAGE HELPS WITH HASHING
const SHA256 = require('crypto-js/sha256');

////////////THIS CREATES BLOCKS
class Block{
    constructor(index,timestamp,data,previousHash = ''){
        this.index=index;
        this.timestamp=timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.previousHash + this.timestamp +  JSON.stringify(this.data)+this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
    console.log("block mined"+ this.hash)
    }
}

/////////////THIS CREATES THE BLOCKCHAIN USING BLOCKs
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }
///THE FIRST BLOCK IN THE CHAIN
    createGenesisBlock(){
        return new Block(0,"07/16/2018", "Genesis Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
////USED TO CHECK IF DATA ON BLOCKCHAIN HAS BEEN ALTERED
    isChainValid(){
        for(let i=1; i < this.chain.length;i++ ){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            } 
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }

}


/////////TESTING IT

let dillCoin = new Blockchain();
console.log('mining block 1...')
dillCoin.addBlock(new Block(1,"07/16/2018", {amount:3}));
console.log('mining block 2...')
dillCoin.addBlock(new Block(2,"07/16/2018", {amount:33}));

// console.log(JSON.stringify(dillCoin, null, 4));
// console.log(dillCoin.isChainValid())

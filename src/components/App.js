import React, { useEffect, useRef, useState } from "react";
import getWeb3 from '../web3.js';
import '../styles/App.css';
import contractJson from '../contractAbi.json'
import Participant from "./Participant.js";
import Product from "./Product.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"


function App() {
  const [rowsData, setRowsData] = useState([]);
  const [product, setProduct] = useState({});
  const [participant, setParticipant] = useState({});
  const [account, setAccount] = useState('');
  const [owner, setOwner] = useState(false);
  const [web3, setWeb3] = useState();
  const [supplyChain, setSupplychain] = useState();
  const [provenance, setProvenance] = useState([]);
  const firstMount = useRef(true);

  useEffect(() => {
    const initWeb3 = async() => {
      await getWeb3().then((result) => {
        let web3Instance = result;
        setWeb3(web3Instance);
        firstMount.current = false;
      }); 
    }
    initWeb3();
  }, []);

  useEffect(() => {
    if(!firstMount.current){
      console.log(web3);
      const initContract = async() => {
        const networkId = await web3.eth.net.getId();
        const networkData = contractJson.networks[networkId];
        let supplyChainInstance = new web3.eth.Contract(contractJson.abi, networkData.address);
        setSupplychain(supplyChainInstance);
      }
      initContract();
    }
  }, [web3]);

  useEffect(() => {
    if(!firstMount.current){
      console.log(supplyChain);
      const initAccount = async() => {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      }
      initAccount();
    }
  }, [supplyChain]);

  useEffect(() => {
    if(!firstMount.current){
      console.log(account);
      getProduct();
      console.log('calling getProduct');
    }
  }, [account]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProduct(values => ({...values, [name]: value}))
  }

  const addProduct = async(event) => {
    event.preventDefault();

    await supplyChain.methods.addProduct(product._ownerId, product._modelNumber, product._partNumber, product._serialNumber, product._productCost)
    .send({ from : account }, (err, transactionHash) => {
      console.log(err, transactionHash);
    });
    getProduct();
    console.log('calling getProduct from addProduct');
  }

  const getProduct = async() => {
    var productCount;

    await supplyChain.methods.product_id()
    .call(function(err, res){
      productCount = res;
    }); 

    setRowsData([]);

    for (var i = 0; i < productCount; i++) {
      let product_id = i;
      await supplyChain.methods.products(i)
      .call(function(err, product){
        const newRow = {
          product_id: product_id,
          modelNumber: product[0],
          partNumber: product[1],
          serialNumber: product[2],
          productOwner: product[3],
          cost: product[4],
          mfgTimeStamp: product[5],
        };
        // console.log(newRow);
        setRowsData(oldData => [...oldData, newRow]);
      });
    }
  }

  const handleParticipantChange = (event) => {
    const {name, value} = event.target;
    setParticipant(values => ({...values, [name]: value}))
  }

  const addParticipant = async(event) => {
    event.preventDefault();

    supplyChain.methods.addParticipant(participant._name, participant._pass, participant._pAdd, participant._pType)
    .send({ from : account }, (err, transactionHash) => {
      console.log(err, transactionHash);
    });
  }

  const getParticipant = async (event) => {
    event.preventDefault();

    supplyChain.methods.getParticipant(participant._userId)
    .call({ from : account }, (err, transactionHash) => {
      setParticipant(values => ({...values, _name: transactionHash[0], _pAdd: transactionHash[1], _pType: transactionHash[2]}))
    })
  }

  const handleOwnerChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setOwner(values => ({...values, [name]: value}))
}
  const changeOwnership = async (event) => {
      event.preventDefault();
      console.log(account);
      await supplyChain.methods.newOwner(owner._user1Id, owner._user2Id, owner._prodId)
      .send({ from : account }, (err, transactionHash) => {
          console.log(err, transactionHash);
      });
  }

  const getOwnerships = async(ownership_Id) => {
    await supplyChain.methods.getOwnership(ownership_Id)
    .call({ from : account }, (err, res) => {
      console.log(err, res);
      setProvenance(oldData => [...oldData, res]);
    })
  }

  const getProvenance = async(e) => {
    e.preventDefault();
    setProvenance([]);
    await supplyChain.methods.getProvenance(e.target.value)
    .call((err, result) => {
      console.log(err, result);
      let upperLimit = result.length
      for(var i=0; i<upperLimit; i++){
        let ownership_Id = parseInt(result[i]);
        getOwnerships(ownership_Id);
      }
    });
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <h1> Welcome to Supply Chain DApp </h1>
      </header> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path='/supplyChainApp/participants'  element={
            <Participant  
              participant={participant}
              handleParticipantChange={handleParticipantChange}
              getParticipant={getParticipant}
              addParticipant={addParticipant}
            />
          }></Route>
          <Route path='/supplyChainApp/products' element={
            <Product
              owner={owner}
              supplyChain={supplyChain}
              product={product}
              rowsData={rowsData} 
              provenance={provenance}
              handleOwnerChange={handleOwnerChange}
              changeOwnership={changeOwnership}
              handleChange={handleChange} 
              addProduct={addProduct}
              getProvenance={getProvenance}
            />
          }></Route>
        </Routes>
      </Router>
      {/* <Participant
        participant={participant}
        handleParticipantChange={handleParticipantChange}
        getParticipant={getParticipant}
        addParticipant={addParticipant}
      />
      <hr/>
      <Product
        owner={owner}
        supplyChain={supplyChain}
        product={product}
        rowsData={rowsData} 
        provenance={provenance}
        handleOwnerChange={handleOwnerChange}
        changeOwnership={changeOwnership}
        handleChange={handleChange} 
        addProduct={addProduct}
        getProvenance={getProvenance}
      /> */}
    </div>
  );
}

export default App;
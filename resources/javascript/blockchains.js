const listRef = document.querySelector('#blockchains-list');
const btnRef = document.querySelector('#apply-btn');
const ulRef = document.querySelector('#nfts-list');
const loadingRef = document.querySelector('#loading');
let blockchains=[];

fetch('./assets/data/blockchains.json')
  .then(response => response.json())
  .then(data => {
    let listElements = '';
   blockchains = data;
    blockchains.forEach(b => {
        listElements += `<option value="${b.chainId}">${b.currentSymbol}</option>`;
    });

    listRef.innerHTML = listElements;
  });

  btnRef.addEventListener('click', (e) => {
    const wallet = document.querySelector('input').value;
    fetchNFTs(blockchains[listRef.selectedIndex].endpoint,wallet);
  });


 function fetchNFTs(url,wallet) {
  loadingRef.style.visibility =  'visible';
 let data = JSON.stringify({
    "id": 67,
    "jsonrpc": "2.0",
    "method": "qn_fetchNFTs",
    "params": {
      "wallet":wallet
    }
  });
  
  axios.post(url, data)
  .then(response => {
    const nfts = response.data.result.assets;
    let subListElements='';
    nfts.forEach((nft) => {
      ulRef.innerHTML +='<div class="col"> <div class="card shadow-sm"> <img width="100%" height="100%" alt="NFT" src="https://gateway.pinata.cloud/ipfs/QmbFyeWzoTkSdXgtQCkxWFLvq6TBRgqNb5cE6aQHV5mWJz?preview=1"/> <div class="card-body"> <p class="card-text">' +nft.name+'</p><p class="card-text">' + "Money Requested: $" + 0 +' USD</p><p class="card-text">' + "NFT Value: $" +0 +' USD</p><div class="d-flex justify-content-between align-items-center"> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="mint(\'' +  "--" + '\',\''+ 0 + '\',\''+ "--"+"\'," + "--" +')">Mint</button> </div></div></div></div>';
    }
    );
    loadingRef.style.visibility = 'hidden';
  }
  )
  .catch(function (error) {
    alert("Algo esta mal mi amigo/a :(")
    loadingRef.style.visibility = 'hidden';
    console.log(error);
  });

  }

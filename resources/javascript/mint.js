const listRef = document.querySelector('#blockchains-list');
const btnRef = document.querySelector('#apply-btn');
const ulRef = document.querySelector('#nfts-list');
const loadingRef = document.querySelector('#loading');

let blockchains=[];

btnRef.addEventListener('click', (e) => {
  const wallet = document.querySelector('#address').value;
  fetchNFTs(blockchains[listRef.selectedIndex].chainId,blockchains[listRef.selectedIndex].endpoint,blockchains[listRef.selectedIndex].blockExplorerUrl,wallet);
});
async function fetchNFTs(chainId,url,blockExplorerUrl,wallet) {
  ulRef.innerHTML="";
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
    nfts.forEach((nft) => {
      console.log(nft);
      let address=chainId=="0xSOL"?nft.tokenAddress:nft.collectionAddress;
      ulRef.innerHTML +=
      '<div class="col"> <div class="card shadow-sm"> <img width="100%" height="100%" alt="NFT" src='+nft.imageUrl+'/> <div class="card-body"> <p class="card-text">' +nft.name+'</p><div class="d-flex justify-content-between align-items-center"> <button type="button" class="btn btn-primary" onclick="mint(\'' + (blockExplorerUrl + address) + '\')">Block Explorer</button> </div></div></div></div>';
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



async function getBlockchains() {
  fetch('../resources/javascript/blockchains.json')
  .then(response => response.json())
  .then(data => {
    let listElements = '';
   blockchains = data;
    blockchains.forEach(b => {
        listElements += `<option value="${b.chainId}">${b.currentSymbol}</option>`;
    });

    listRef.innerHTML = listElements;
  });
}


async function login() {
  }
async function logOut() {
  }


  async function mint(address){
    window.location.href  = address;
  }




  async function onlyNumberKey(evt) {        
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
    {
        return false;
    }
  }

  window.onload = function() {
    getBlockchains();
  };

  async function dfhStore() {
    window.location.href="https://opensea.io/dfhcommunity";
  }

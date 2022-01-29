import React, { useState } from 'react';
import { ethers } from 'ethers';

export const WalletCard = () => {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectWalletHandler = async () => {
    if(window.ethereum) {
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await accountChangeHandler(account[0])

    } else {
      setErrorMessage('You may not have MetaMask installed')
    }
  }

  const accountChangeHandler = async (newAccount) => {
    setDefaultAccount(newAccount)
    await getUserBalance(newAccount)
  }

  const getUserBalance = async (address) => {
    const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] });
    setUserBalance(ethers.utils.formatEther(balance));
  }

  const chainChangeHandler = () => {
    window.location.reload();
  }

  // allows to  change account within the same chain
  window.ethereum.on('accountsChanged', accountChangeHandler)

  // reloads the page when user attempts to change network
  window.ethereum.on('chainChanged', chainChangeHandler)

  return (
    <>
      <button onClick={connectWalletHandler}>Connect</button>
      <h3>Address: {defaultAccount}</h3>
      <h3>Balance: {userBalance}</h3>
      <>{errorMessage}</>
    </>
  )
}

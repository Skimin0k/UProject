import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import ActionContract from 'artifacts/contracts/Auction.sol/Auction.json'
import {Auction as IAuction} from 'artifacts/typechain/contracts/Auction'
import {getEthereumSigner} from 'entities/Ethereum'
import {Contract, ethers} from 'ethers'
import {AuctionConnector, getAuctionLotsList} from 'feature/AuctionDetails'
import {getLotData, LotConnector} from 'feature/LotDetail'
import Button from 'shared/ui/Button/Button'
import Text from 'shared/ui/Text/Text'
import {PageWrapper} from 'widgets/Page'

const LotRender = ({lotAddress}: {lotAddress: string}) => {
    const lotInfo = useSelector(getLotData(lotAddress))
    return <div>
        <Text text={'======== Lot: ' + lotAddress + ' ========'}/>
        {
            lotInfo && lotInfo.price
        }
        <Text text={'____________'}/>
        <Text text={''}/>
    </div>
}

const AuctionRender = ({auctionAddress}: {auctionAddress: string}) => {
    const lotsList = useSelector(getAuctionLotsList(auctionAddress))
    return <div>
        <Text text={'Auction Loaded' + auctionAddress}/>
        {
            lotsList && lotsList.map(lotAddress => {
                return <LotConnector
                    key={lotAddress}
                    lotAddress={lotAddress}
                    lotRender={<LotRender lotAddress={lotAddress}
                    />
                    }
                />
            })
        }
    </div>
}

const MainPage = () => {
    const {t} = useTranslation()
    const [auctionContract, setAuctionContract] = useState<IAuction>()
    const [contractAddress, setContractAddress] = useState<string>()
    const signer = useSelector(getEthereumSigner)

    useEffect(() => {
        const contract = new Contract(process.env.__AUCTION_TOKEN__ as string, ActionContract.abi, signer) as unknown as IAuction
        setAuctionContract(contract)
        contract.getAddress().then(address => setContractAddress(address))
    }, [signer])

    const onCreateLotClickHandler = useCallback(() => {
        if(signer) {
            auctionContract?.createLot(ethers.parseEther('0.01'), ethers.parseEther('0.01')).catch(error => {})
        }
    }, [signer, auctionContract])

    return (
        <PageWrapper>
            <div>
                <Text text={t('Auction address is: ') + contractAddress}/>
                {auctionContract && <Button onClick={onCreateLotClickHandler}><Text text={t('createLot')}/> </Button> }

                <Text text={t('AuctionPage')}/>
                <AuctionConnector
                    auctionAddress={'0x6B0B0Ccb0aD7ce8D5CDA21c0AecD7e55e8cC64c7'}
                    auctionRender={<AuctionRender
                        auctionAddress={'0x6B0B0Ccb0aD7ce8D5CDA21c0AecD7e55e8cC64c7'}
                    />}
                />

            </div>
        </PageWrapper>
    )
}

export default MainPage
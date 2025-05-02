import React, {useCallback, useState} from 'react'
import {useSelector} from 'react-redux'
import {AuctionConnector, getAuctionContract, getAuctionData, getAuctionLotsList} from 'feature/AuctionDetails'
import {getLotContract,getLotData, LotConnector} from 'feature/LotDetail'
import Button from 'shared/ui/Button/Button'
import {Input} from 'shared/ui/Input/Input'
import Text from 'shared/ui/Text/Text'
import {PageWrapper} from 'widgets/Page'

const LotRender = ({lotAddress}: {lotAddress: string}) => {
    const lotInfo = useSelector(getLotData(lotAddress))
    const lotContract = useSelector(getLotContract(lotAddress))
    const participateClickHandler = useCallback(() => {
        lotContract?.raiseHand()
    }, [lotContract])

    const downHandClickHandler = useCallback(() => {
        lotContract?.downHand()
    }, [lotContract])

    const buyButtonClickHandler = useCallback(() => {
        lotContract?.buy()
    }, [lotContract])

    return <div>
        <Text text={'======== Lot: ' + lotAddress + ' ========'}/>
        <Text text={'Title: ' + lotInfo?.data?.title}/>
        <Text text={'tokenID: ' + lotInfo?.tokenID}/>
        <Text text={'price: ' + lotInfo?.price}/>
        <Text text={'members: ' + lotInfo?.members}/>
        <Text text={'isWaiting: ' + lotInfo?.isWaiting}/>
        <Text text={'isMember: ' + lotInfo?.isMember}/>
        <Text text={'isNFTOwner: ' + lotInfo?.isNFTOwner}/>
        <Text text={'status: ' + lotInfo?.waitingStatus}/>
        {
            lotInfo?.isMember && lotInfo?.members > 1 && !lotInfo?.isWaiting && <Button onClick={downHandClickHandler}>
                <Text text={'Опустить руку'}/>
            </Button>
        }
        {
            !lotInfo?.isMember && !lotInfo?.isNFTOwner && lotInfo?.isWaiting && <Button onClick={participateClickHandler}>
                <Text text={'Участвовать'}/>
            </Button>
        }
        {
            !lotInfo?.isNFTOwner && lotInfo?.isMember && lotInfo?.members == 1 && !lotInfo?.isWaiting && <div>
                <Button onClick={buyButtonClickHandler}>
                    <Text text={'Купить лот'}/>
                </Button>
            </div>
        }
        <Text text={'__________________________________________________________________________________'}/>
        <Text text={''}/>
    </div>
}

const AuctionRender = ({auctionAddress}: {auctionAddress: string}) => {
    const auctionContract = useSelector(getAuctionContract(auctionAddress))
    const lotsList = useSelector(getAuctionLotsList(auctionAddress))
    const auctionData = useSelector(getAuctionData(auctionAddress))

    const onCreateLotButtonClick = useCallback(() => {
        if(!auctionContract) {
            return
        }
        auctionContract.createLot('0.001', '0.001', {title: 'хомяк воскрешен!'})
    }, [auctionContract])
    
    const [inputValue, setInputValue] = useState('')

    const removeAuction = useCallback(() => {
        auctionContract?.removeLot(inputValue)
    }, [auctionContract, inputValue])

    return <div>
        <Text text={`##### ${auctionData?.title} ` + auctionAddress + ' #####'} />
        <Button onClick={onCreateLotButtonClick}><Text text="click to createLot" /> </Button>
        <div>
            <Input onChange={setInputValue} value={inputValue} /> <Button onClick={removeAuction}><Text text="remove Lot" /> </Button>
        </div>
        {
            lotsList && lotsList.map(lotAddress => {
                return <LotConnector
                    key={lotAddress}
                    lotAddress={lotAddress}
                    lotRender={<LotRender lotAddress={lotAddress}/>}
                />
            })
        }

    </div>
}

const MainPage = () => {
    const auctionAddress = '0x2b0F09f00166A55De778b0a033aa4392Aa3dc9ED'
    return (
        <PageWrapper>
            <div>
                <AuctionConnector
                    auctionAddress={auctionAddress}
                    auctionRender={<AuctionRender
                        auctionAddress={auctionAddress}
                    />}
                />

            </div>
        </PageWrapper>
    )
}

export default MainPage
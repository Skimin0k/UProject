import React, {useCallback, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {AuctionConnector, getAuctionData, getAuctionLotsList} from 'feature/AuctionDetails'
import {createLot} from 'feature/AuctionDetails/model/services/createLot'
import {removeLot} from 'feature/AuctionDetails/model/services/removeLot'
import {getLotData, LotConnector} from 'feature/LotDetail'
import {downHand} from 'feature/LotDetail/model/services/downHand'
import {pullMoneyBack} from 'feature/LotDetail/model/services/pullMoneyBack'
import {raiseHand} from 'feature/LotDetail/model/services/raiseHand'
import {getIpfsUrl} from 'shared/lib/utils/ipfs/ipfsClient'
import Button from 'shared/ui/Button/Button'
import {FileUploadButton} from 'shared/ui/FileUploadButton/FileUploadButton'
import {Image} from 'shared/ui/Image/Image'
import {Input} from 'shared/ui/Input/Input'
import {TemperatureChart} from 'shared/ui/LineChart/LineChart'
import Text from 'shared/ui/Text/Text'
import {PageWrapper} from 'widgets/Page'

const LotRender = ({lotAddress}: {lotAddress: string}) => {
    const dispatch = useAppDispatch()
    const lotInfo = useSelector(getLotData(lotAddress))

    const onRaiseHandClickHandler = useCallback(() => {
        dispatch(raiseHand(lotAddress))
    }, [dispatch, lotAddress])

    const onDownHandClickHandler = useCallback(() => {
        dispatch(downHand(lotAddress))
    }, [dispatch, lotAddress])

    const onPullMoneyClickHandler = useCallback(() => {
        dispatch(pullMoneyBack(lotAddress))
    }, [dispatch, lotAddress])

    const imageSrc = useMemo(() => getIpfsUrl(lotInfo?.data?.image), [lotInfo])

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
        {imageSrc && <Image src={imageSrc} size={'80px'}/>}
        {lotInfo?.data?.temperature &&
            <TemperatureChart
                data={lotInfo?.data?.temperature.map(point => ({...point, timeLabel: new Date(point.x).toLocaleString()}))}
                height={400}
                xKeyDataLabel={'timeLabel'}
                labelFormatter={(label) => `Time: ${label}`}
                formatter={(value: any) => [`${value} °C`, 'Temperature']}
            />}
        {
            lotInfo?.isMember && lotInfo?.members > 1 && !lotInfo?.isWaiting && <Button onClick={onDownHandClickHandler}>
                <Text text={'Опустить руку'}/>
            </Button>
        }
        {
            !lotInfo?.isMember && !lotInfo?.isNFTOwner && lotInfo?.isWaiting && <Button onClick={onRaiseHandClickHandler}>
                <Text text={'Участвовать'}/>
            </Button>
        }
        {
            !lotInfo?.isNFTOwner && lotInfo?.isMember && lotInfo?.members == 1 && !lotInfo?.isWaiting && <div>
                <Button onClick={onPullMoneyClickHandler}>
                    <Text text={'Купить лот'}/>
                </Button>
            </div>
        }
        <Text text={'__________________________________________________________________________________'}/>
        <Text text={''}/>
    </div>
}

const AuctionRender = ({auctionAddress}: {auctionAddress: string}) => {
    const dispatch = useAppDispatch()
    const lotsList = useSelector(getAuctionLotsList(auctionAddress))
    const auctionData = useSelector(getAuctionData(auctionAddress))
    
    const [inputValue, setInputValue] = useState('')

    const removeAuction = useCallback(() => {
        dispatch(removeLot({lotAddress: inputValue}))
    }, [dispatch, inputValue])

    return <div>
        <Text text={`##### ${auctionData?.title} ` + auctionAddress + ' #####'} />
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
const temperaturePoints = Array(20).fill(0).map((_, i) => {
    return {
        x: 1628208000000, y: 5 + Math.ceil(Math.random() * 5)
    }
})

const MainPage = () => {
    const auctionAddress = '0xffb5acD4d41Db0E81b8ecB02cB4801b08092593b'

    const dispatch = useAppDispatch()

    const [initialData, setInitialData] = React.useState({
        imgFile: undefined,
        title: 'хомяк воскрешен!',
        temperature: temperaturePoints
    })

    const onCreateLotButtonClick = useCallback(() => {
        dispatch(createLot({
            auctionAddress,
            eth_step: '0.001',
            eth_price: '0.001',
            initialData
        }))
    }, [initialData, dispatch, auctionAddress])

    const onUploadImg = useCallback((file) => {
        setInitialData({
            ...initialData,
            imgFile: file
        })
    }, [initialData, setInitialData])

    return (
        <PageWrapper>
            <div>
                <Text text={'------ Регистрация лота ------'}/>
                <div>
                    <FileUploadButton onFileSelected={onUploadImg} text={'загрузить файл'}/>
                    <TemperatureChart
                        data={temperaturePoints.map(point => ({...point, timeLabel: new Date(point.x).toLocaleString()}))}
                        height={400}
                        xKeyDataLabel={'timeLabel'}
                        labelFormatter={(label) => `Time: ${label}`}
                        formatter={(value: any) => [`${value} °C`, 'Temperature']}
                    />

                </div>
                <div>
                    <Button onClick={onCreateLotButtonClick}><Text text="click to createLot" /> </Button>

                </div>
                <Text text={'------------'}/>
            </div>

            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Text text={'------ Аукцион ------'}/>
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
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { RateCardForm, RateType } from '@/components/forms/rate-card-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Page } from '@/components/ui/page'
import { Typography } from '@/components/ui/typography'
import { useGetRandomCardQuery, useRateCardMutation } from '@/services/cards/card.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.sevice'

import s from './learn.page.module.scss'

export const LearnPage = () => {
  const [rate, setRate] = useState<boolean>(false)

  const { deckId } = useParams()
  const [rateCard] = useRateCardMutation()
  const { data: deckData } = useGetDeckByIdQuery({ id: deckId! })
  const { data: cardData } = useGetRandomCardQuery({ id: deckId! })

  const handleOpenRate = () => {
    setRate(true)
  }
  const onSubmit = async (data: RateType) => {
    try {
      await rateCard({ cardId: cardData!.id, grade: +data.grade, packId: deckId! }).unwrap()
      setRate(false)
    } catch (error) {
      console.error('Failed to rate card:', error)
    }
  }

  return (
    <Page className={s.root}>
      <Card className={s.content}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          {`Learn "${deckData?.name}"`}
        </Typography>
        <div className={s.question}>
          <Typography variant={'body1'}>
            <b>{'Question: '}</b>
            {cardData?.question}
          </Typography>
          <Typography className={s.caption} variant={'body2'}>
            {`Count of attempts: ${cardData?.shots}`}
          </Typography>
          {cardData?.questionImg && (
            <img alt={'Question Image'} className={s.cover} src={cardData.questionImg} />
          )}
        </div>
        {rate ? (
          <>
            <div className={s.answer}>
              <Typography className={s.answerText} variant={'body1'}>
                <b>{'Answer: '}</b> {cardData?.answer}
              </Typography>
              {cardData?.answerImg && (
                <img alt={'Question Image'} className={s.cover} src={cardData.answerImg} />
              )}
            </div>
            <Typography className={s.rate} variant={'body1'}>
              <b>{'Rate yourself:'}</b>
            </Typography>
            <RateCardForm onSubmit={onSubmit} />
          </>
        ) : (
          <Button fullWidth onClick={handleOpenRate}>
            {'Show Answer'}
          </Button>
        )}
      </Card>
    </Page>
  )
}

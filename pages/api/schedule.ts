import { addHours, differenceInHours, format } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'

import { firebaseServer } from '../../config/firebase/server'

const db = firebaseServer.firestore()

const profile = db.collection('profile')
const appointments = db.collection('appointments')

const startAt = new Date(2021, 1, 1, 8, 0)
const endAt = new Date(2021, 1, 1, 17, 0)
const totalHours = differenceInHours(endAt, startAt)

const timeBlocks = []

for(let blockIndex = 0; blockIndex <= totalHours; blockIndex++){
  const time = format(addHours(startAt, blockIndex), 'HH:mm')
  timeBlocks.push(time)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {    
  const { when } = req.query
  const { username } = req.query

  try{ 
    // const profileDoc = await profile
    //   .where('username', '==', username)
    //   .get()

    // console.log('Profile Doc', profileDoc)    

    // const snapshot = await appointments
    //   .where('user_id', '==', profileDoc)
    //   .where('when', '==', when)
    //   .get()

    console.log({
      when,
      username,
      timeBlocks
    })

    return res.status(200).json({
      when,
      username,
      timeBlocks
    })

  } catch(error) {
      console.log('FB ERROR: ', error.message)
      return res.status(500)
  }
}

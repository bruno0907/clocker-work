import { NextApiRequest, NextApiResponse } from 'next'
import { firebaseServer } from '../../config/firebase/server'

const db = firebaseServer.firestore()
const schedule = db.collection('schedule')
const profile = db.collection('profile')

export default async (req: NextApiRequest, res: NextApiResponse) => {    
  const { when } = req.query
  const { username } = req.query

  try{ 
    const snapshot = await schedule
      .where('username', '==', username)
      .where('when', '==', when)
      .get()

    return res.status(200).json(snapshot.docs)

  } catch(error) {
      console.log('FB ERROR: ', error.message)
      return res.status(500)
  }
}

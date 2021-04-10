import { NextApiRequest, NextApiResponse } from 'next'
import { firebaseServer } from '../../config/firebase/server'

const db = firebaseServer.firestore()
const schedule = db.collection('schedule')

export default async (req: NextApiRequest, res: NextApiResponse) => {  
  const { authorization } = req.headers   
  
  if(!authorization) return res.status(401)
  
  const { when } = req.query

  if(!when) return res.status(401)

  const token = authorization.replace('Bearer ', '') 
  
  const { user_id } = await firebaseServer.auth().verifyIdToken(token)

  try{ 
    const snapshot = await schedule
      .where('user_id', '==', user_id)
      .where('when', '==', when)
      .get()

    return res.status(200).json(snapshot.docs)

  } catch(error) {
      console.log('FB ERROR: ', error.message)
      return res.status(500)
  }
}

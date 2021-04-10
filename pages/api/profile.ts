
import { NextApiRequest, NextApiResponse } from 'next'
import { firebaseServer } from '../../config/firebase/server'

const db = firebaseServer.firestore()
const profile = db.collection('profiles')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization } = req.headers
  const { username } = req.body

  const token = authorization.replace('Bearer ', '')  
  
  try{  
    const { user_id } = await firebaseServer.auth().verifyIdToken(token)

    const userProfile = await profile.doc(username).set({
      user_id,
      username
    })

    return res.status(201).json(userProfile)

  } catch(error) {
    console.log('ERROR ', error.message)

    return res.status(500).json({
      error: error.message
    })

  }
}

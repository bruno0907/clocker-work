import { NextApiRequest, NextApiResponse } from 'next'
import { firebaseServer } from '../../config/firebase/server'

const db = firebaseServer.firestore()
const appointments = db.collection('appointments')

export default async (req: NextApiRequest, res: NextApiResponse) => {  
  const { authorization } = req.headers   
  
  if(!authorization) return res.status(401)
  
  const { when } = req.query

  if(!when) return res.status(401)
  
  try{ 
    const token = authorization.replace('Bearer ', '') 
    
    const { user_id } = await firebaseServer.auth().verifyIdToken(token)
    
    const snapshot = await appointments
      .where('user_id', '==', user_id)      
      .get()        
    
    return res.status(200)

  } catch(error) {
      console.log('FB ERROR: ', error.message)
      return res.status(500)
  }
}

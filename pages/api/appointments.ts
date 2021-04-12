import { NextApiRequest, NextApiResponse } from 'next'
import { firebaseServer } from '../../config/firebase/server'
import { addHours, differenceInHours, format } from 'date-fns'

const db = firebaseServer.firestore()
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
  const { authorization } = req.headers   
  
  if(!authorization) return res.status(401)
  
  const { date } = req.query

  if(!date.length) return res.status(401)
  
  try{ 
    const token = authorization.replace('Bearer ', '')     
    
    const { user_id } = await firebaseServer.auth().verifyIdToken(token)
    
    const snapshot = await appointments
      .where('user_id', '==', user_id)  
      .where('date', '==', date)    
      .get() 
      
    const allAppointments = snapshot.docs.map(doc => doc.data())     
    
    return res.status(200).json(allAppointments)

  } catch(error) {      
      return res.status(500).json({ error: error.message })
  }
}

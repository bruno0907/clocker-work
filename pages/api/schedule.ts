import { addHours, differenceInHours, format } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'

import { firebaseServer } from '../../config/firebase/server'

const db = firebaseServer.firestore()

const profile = db.collection('profiles')
const appointments = db.collection('appointments')

const startAt = new Date(2021, 1, 1, 8, 0)
const endAt = new Date(2021, 1, 1, 17, 0)
const totalHours = differenceInHours(endAt, startAt)

const timeBlocks = []

for(let blockIndex = 0; blockIndex <= totalHours; blockIndex++){
  const time = format(addHours(startAt, blockIndex), 'HH:mm')
  timeBlocks.push(time)
}

const getUserId = async (username: string | string[]) => {
  const profileDoc = await profile
    .where('username', '==', username)
    .get()

  if(!profileDoc.docs.length) return false
  
  const { user_id } = profileDoc.docs[0].data()  

  return user_id
}

const setSchedule = async (req: NextApiRequest, res: NextApiResponse) => {    
  const { 
    username, 
    name, 
    phoneNumber, 
    hour,
    date 
  } = req.body

  try {
    const user_id = await getUserId(username)    

    const docId = `${user_id}#${date}#${hour}`

    const hasAppointments = await appointments.doc(docId).get()
  
    if(hasAppointments.exists) return res.status(400).json({
      message: 'Appointment hour not available!'
    })
  
    const appointment = await appointments.doc(docId).set({
      user_id,
      date,
      hour,
      name,
      phoneNumber
    })
  
    return res.status(201).json(appointment)

  } catch(error) {
    return res.status(500).json({ error: error.message })

  }

}

const getSchedule = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query    
  const { date } = req.query
  
  try { 
    const user_id = await getUserId(username)    

    if(!user_id) throw new Error('User not found')

    const snapshot = await appointments
      .where('user_id', '==', user_id)
      .where('date', '==', date)
      .get()    

    const dates = snapshot.docs.map(doc => doc.data())

    const result = timeBlocks.map(hour => ({
      hour,
      isBooked: !!dates.find(date => date.hour === hour)
    }))    

    return res.status(200).json({
      user_id,
      result,      
    })  

  } catch(error) {      
      return res.status(500).json({ error: error.message })

  }  
}

const methods = {
  POST: setSchedule,
  GET: getSchedule
}

export default async (req: NextApiRequest, res: NextApiResponse) => methods[req.method]
  ? methods[req.method](req, res)
  : res.status(405)


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

const getUserId = async (username: string) => {
  const profileDoc = await profile
    .where('username', '==', username)
    .get()
  
  const { user_id } = profileDoc.docs[0].data()

  return user_id
}

const setSchedule = async (req: NextApiRequest, res: NextApiResponse) => {    
  const { 
    username, 
    name, 
    phoneNumber, 
    when 
  } = req.body

  try{
    const user_id = await getUserId(username)

    if(!user_id) return res.status(400).json({
      message: 'User not found'
    })

    const hasAppointments = await appointments.doc(`${user_id}#${when}`).get()
  
    if(hasAppointments.exists) return res.status(400).json({
      message: 'Appointment hour not available!'
    })
  
    const appointment = await appointments.doc(`${user_id}#${when}`).set({
      user_id,
      when,
      name,
      phoneNumber
    })
  
    return res.status(201).json(appointment)

  } catch(error){
    return res.status(500).json({
      error: error.message
    })
  }

}

const getSchedule = async (req: NextApiRequest, res: NextApiResponse) => {
  const { when } = req.query
  const { username } = req.query  
  
  try{ 
    const profileDoc = await profile
      .where('username', '==', username)
      .get()  

    const doc = profileDoc.docs[0].data()


    return res.status(200).json({
      doc,
      timeBlocks
    })  

  } catch(error) {
      console.log('FB ERROR: ', error.message)
      return res.status(500)
  }  
}

const methods = {
  POST: setSchedule,
  GET: getSchedule
}

export default async (req: NextApiRequest, res: NextApiResponse) => methods[req.method]
  ? methods[req.method](req, res)
  : res.status(405)


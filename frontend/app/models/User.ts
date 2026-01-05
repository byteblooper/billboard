import { ObjectId, Filter } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export interface IUser {
  _id?: ObjectId
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

async function getCollection() {
  const client = await clientPromise
  return client.db().collection<IUser>('users')
}

const UserModel = {
  async findOne(query: Filter<IUser>) {
    const collection = await getCollection()
    return collection.findOne(query)
  },

  async create(userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await getCollection()
    const now = new Date()
    const result = await collection.insertOne({
      ...userData,
      createdAt: now,
      updatedAt: now
    } as IUser)
    return { ...userData, _id: result.insertedId, createdAt: now, updatedAt: now }
  },

  async updateOne(query: Filter<IUser>, update: Partial<IUser>) {
    const collection = await getCollection()
    return collection.updateOne(query, { $set: { ...update, updatedAt: new Date() } })
  }
}

export default UserModel

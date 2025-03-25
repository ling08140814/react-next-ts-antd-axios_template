"use client"
import { useState, useEffect } from 'react'
import { GET } from '@/service/axios/method'
import { api } from '@/service/api'

const Test = () => {
  const [content, setContent] = useState<string>('')
  
  const getContent = async () => {
    const { data } = await GET(`${api.test}`)
    setContent(data?.content)
  }

  useEffect(() => {
    getContent()
  }, [])

  return <div className='text-2xl'>
    {content}
  </div>
}

export default Test
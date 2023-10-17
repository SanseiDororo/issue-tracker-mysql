'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // Make a GET request to the API route
        const response = await axios.get('/api/issues')

        // Handle the response data here and set it in the state
        setData(response.data)
        console.log('Data from the API:', response.data)
      } catch (error) {
        // Handle any errors here
        console.error('Error fetching data from the API:', error)
      }
    }

    // Call the fetchIssues function immediately
    fetchIssues()
  }, [])

  return (
    <div>
      {data ? (
        <div>
          {data.map((issue) => (
            <div key={issue.id}>
              <p>Title: {issue.title}</p>
              <p>Description: {issue.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

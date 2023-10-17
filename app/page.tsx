'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Card, Flex, Box, Text } from '@radix-ui/themes'

interface Issue {
  id: number
  title: string
  description: string
}

export default function Home() {
  const [data, setData] = useState<Issue[] | null>(null)

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('/api/issues')
        setData(response.data)
        console.log('Data from the API:', response.data)
      } catch (error) {
        console.error('Error fetching data from the API:', error)
      }
    }
    fetchIssues()
  }, [])

  return (
    <div>
      {data ? (
        <div className="flex flex-row gap-6 ml-6">
          {data.map((issue) => (
            <div key={issue.id}>
              <Card style={{ maxWidth: 240 }}>
                <Flex gap="3" align="center">
                  <Box>
                    <Text as="div" size="4" weight="bold" color="red" mb="4">
                      {issue.title}
                    </Text>
                    <Text as="div" size="3" color="gray">
                      {issue.description}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="ml-11">Loading data...</p>
      )}
    </div>
  )
}

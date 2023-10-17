import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createIssueSchema } from '../../../app/validationSchema'

export async function POST(request: NextRequest) {
  const body = await request.json()
  //validating response
  const validation = createIssueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  })

  return NextResponse.json(newIssue, { status: 201 })
}

export async function GET(request: NextRequest) {
  try {
    const issues = await prisma.issue.findMany()
    return NextResponse.json(issues, { status: 201 })
  } catch (error) {
    console.log('There was an error catching issues', error)
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createIssueSchema } from '../../../app/validationSchema'
import { EnumLike } from 'zod'

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

export async function PUT(request: NextRequest) {
  try {
    // Extract the ID and new status from the request body
    const { id, status } = await request.json()

    // Check if ID and status are valid
    if (id === undefined || status === undefined) {
      return NextResponse.json(
        { error: 'Missing id or status in request payload' },
        { status: 400 }
      )
    }

    // Update the issue status
    const updatedIssue = await prisma.issue.update({
      where: { id },
      data: { status },
    })

    if (updatedIssue) {
      return NextResponse.json(updatedIssue, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error updating issue:', error)
    return NextResponse.json(
      { error: 'Failed to update issue' },
      { status: 500 }
    )
  }
}

'use client'

import { Button, TextField } from '@radix-ui/themes'
import { Butcherman } from 'next/font/google'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

const NewIssuePage = () => {
  return (
    <div className="max-w-4xl space-y-3 m-auto mt-20">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  )
}
export default NewIssuePage

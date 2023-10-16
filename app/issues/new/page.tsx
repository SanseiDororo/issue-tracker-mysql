'use client'

import { useForm, Controller } from 'react-hook-form'
import { Button, TextField } from '@radix-ui/themes'
import { Butcherman } from 'next/font/google'
import SimpleMDE from 'react-simplemde-editor'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const router = useRouter()
  return (
    <form
      className="max-w-4xl space-y-3 m-auto mt-20"
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data)
          router.push('/issues')
        } catch (error) {
          console.log(error)
        }
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  )
}
export default NewIssuePage

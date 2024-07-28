'use server'

import { Session } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function setSession(data: Session) {
  if (data) {
    cookies().set('user_id', data.user.id)

    cookies().set('user_token', `${data.token_type} ${data.access_token}`)

    cookies().set('email', data.user.email!)
  }
}

export async function getSession() {
  return cookies().get('user_id')
}

export async function getUserEmail() {
  const data = cookies().get('email')

  return data?.value
}

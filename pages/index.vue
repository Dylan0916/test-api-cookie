<template>
  <div>
    <div>
      <h3>check-login</h3>
      <button @click="refreshCheckLoginData()">refreshCheckLoginData</button>
      <pre>{{ checkLoginData }}</pre>
    </div>
    <div>
      <h3>login</h3>
      <button @click="executeCheckLoginData()">login</button>
      <pre>{{ loginData }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FetchOptions } from 'ofetch'

let client: ReturnType<typeof createApiClient>

const createApiClient = (options?: FetchOptions) => {
  const baseURL = '/api'

  return $fetch.create({
    baseURL,
    credentials: 'include',
    onRequest({ options }) {
      const cookie = useRequestHeader('cookie')

      console.log('== cookie ==', cookie)

      options.headers = {
        ...options.headers,
      }
    },
    ...options,
  })
}

const useApiClient = () => {
  if (!client) {
    client = createApiClient()
  }
  return client
}

const getCheckLogin = async () => {
  const api = useApiClient()
  const result = await api(`/check-login`)

  return result
}
const postLogin = async () => {
  const api = useApiClient()
  const result = await api(`/login`, {
    method: 'POST',
    body: { username: 'testname' },
  })

  return result
}

const { data: checkLoginData, refresh: refreshCheckLoginData } = await useAsyncData(getCheckLogin)
const { data: loginData, execute: executeCheckLoginData } = await useAsyncData(postLogin, { immediate: false })
</script>

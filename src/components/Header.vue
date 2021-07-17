<template>
  <div>
    <nav class="bg-white shadow dark:bg-gray-800">
      <div class="px-8 mx-auto max-w-7xl">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center ">
            <a
              class="flex-shrink-0"
              href="/"
            >
              <img
                class="w-8 h-8"
                src="/icons/logo.svg"
                alt="Workflow"
              >
            </a>
            <div class="hidden md:block">
              <div class="flex items-baseline ml-10 space-x-4">
                <router-link
                  class="menu-link"
                  to="/"
                >
                  Log
                </router-link>
                <router-link
                  class="menu-link"
                  to="/log"
                >
                  Settings
                </router-link>
                <select
                  class="px-5 menu-button"
                  :value="currentLog"
                  @change="onLogChange($event.target.value)"
                >
                  <option
                    v-for="log in logList"
                    :key="log.id"
                    :value="log.id"
                  >
                    {{ log.name }}
                  </option>
                </select>
                <router-link
                  class="menu-button"
                  to="/log/new"
                >
                  New log
                </router-link>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="flex items-center ml-4 md:ml-6" />
          </div>
          <div class="flex -mr-2 md:hidden">
            <button class="inline-flex items-center justify-center p-2 text-gray-800 rounded-md dark:text-white hover:text-gray-300 focus:outline-none">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                class="w-8 h-8"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-gray-800 dark:hover:text-white"
            href="/#"
          >
            Home
          </a>
          <a
            class="block px-3 py-2 text-base font-medium text-gray-800 rounded-md dark:text-white"
            href="/#"
          >
            Gallery
          </a>
          <a
            class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-gray-800 dark:hover:text-white"
            href="/#"
          >
            Content
          </a>
          <a
            class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-gray-800 dark:hover:text-white"
            href="/#"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/runtime-core'
import { useStore } from '../store'
import { ActionTypes } from '../store/actions'

export default defineComponent({
  setup () {
    const store = useStore()
    const logList = computed(() => store.state.logList)
    const currentLog = computed(() => store.state.user.currentLog)

    const onLogChange = (value) => {
      store.dispatch(ActionTypes.UpdateUser, { currentLog: parseInt(value) })
    }

    return {
      logList,
      currentLog,
      onLogChange
    }
  }
})
</script>

<style scoped lang="postcss">
  .menu-button {
    @apply px-4 py-2  text-base rounded-full text-white  bg-indigo-500
  }

  .menu-link {
    @apply text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium
  }

  .menu-link.active {
    @apply rounded-full bg-gray-700 text-gray-800 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 text-sm font-medium
  }
</style>

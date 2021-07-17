<template>
  <div>
    <SettingsPartial v-if="station">
      <h1 class="mb-10 border-b">
        Station informations
      </h1>
      <!-- Proposed inputs by n1mm+ https://n1mmwp.hamdocs.com/getting-started/installing-and-upgrading-n1mm-logger/#edit-station-information :
        Call
        Name
        Address
        Address
        City, State, Zip
        Country
        Grid Square, CQ Zone, ITU Zone
        Licence, Latitude, Longitude
        ? Station TX/RX, Power
        Antenna, Ant. Height, ?a.s.l
        ARRL Section, ?Packet Node
        Rover QTH
        Club
        Email
       -->

      <!-- Notice -->
      <div
        class="container relative flex items-center px-4 py-3 mb-10 text-sm font-bold text-white bg-blue-500"
        role="alert"
      >
        <svg
          width="20"
          height="20"
          fill="currentColor"
          class="w-4 h-4 mr-2"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1216 1344v128q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64v-384h-64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h384q26 0 45 19t19 45v576h64q26 0 45 19t19 45zm-128-1152v192q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-192q0-26 19-45t45-19h256q26 0 45 19t19 45z" />
        </svg>
        <p>
          Changing these parameters will affect all logs depending on this station. If you want to change anything here, you might want to create a new station. These fields are mostly used for exported Cabrillo log files.
        </p>
        <!-- <button class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6 text-white" viewBox="0 0 1792 1792">
                  <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z">
                  </path>
              </svg>
          </button> -->
      </div>

      <!-- Input -->
      <div class="grid grid-cols-2 gap-4">
        <FormElement
          type="text"
          label="Callsign"
          :value="station.call"
          @update="updateStation({ call: $event })"
        />
        <FormElement
          type="text"
          label="Name"
          :value="station.name"
          @update="updateStation({ name: $event })"
        />
      </div>
      <FormElement
        type="text"
        label="Address 1"
        :value="station.address1"
        @update="updateStation({ address1: $event })"
      />
      <FormElement
        type="text"
        label="Address 2"
        :value="station.address2"
        @update="updateStation({ address2: $event })"
      />
      <FormElement
        type="text"
        label="City"
        class="max-w-md"
        :value="station.city"
        @update="updateStation({ city: $event })"
      />

      <div class="grid max-w-2xl grid-cols-3 gap-4">
        <FormElement
          type="text"
          label="State"
          :value="station.state"
          @update="updateStation({ state: $event })"
        />
        <FormElement
          type="text"
          label="Zip"
          :value="station.zip"
          @update="updateStation({ zip: $event })"
        />
        <FormElement
          type="text"
          label="Country"
          :value="station.country"
          @update="updateStation({ country: $event })"
        />
      </div>

      <div class="grid max-w-2xl grid-cols-3 gap-4">
        <FormElement
          type="text"
          label="Gridsquare"
          :value="station.grid"
          @update="updateStation({ grid: $event })"
        />
        <FormElement
          type="text"
          label="CQ Zone"
          :value="station.cq"
          @update="updateStation({ cq: $event })"
        />
        <FormElement
          type="text"
          label="ITU Zone"
          :value="station.itu"
          @update="updateStation({ itu: $event })"
        />
      </div>

      <div class="grid max-w-2xl grid-cols-3 gap-4">
        <FormElement
          type="text"
          label="Licence"
          :value="station.licence"
          @update="updateStation({ licence: $event })"
        />
        <FormElement
          type="text"
          label="Latitude"
          :value="station.latitude"
          @update="updateStation({ latitude: $event })"
        />
        <FormElement
          type="text"
          label="Longitude"
          :value="station.longitude"
          @update="updateStation({ longitude: $event })"
        />
      </div>

      <div class="grid max-w-md grid-cols-2 gap-4">
        <FormElement
          type="text"
          label="Station TX/RX"
          :value="station.tx"
          @update="updateStation({ tx: $event })"
        />
        <FormElement
          type="text"
          label="Power"
          :value="station.power"
          @update="updateStation({ power: $event })"
        />
      </div>

      <div class="grid max-w-md grid-cols-2 gap-4">
        <FormElement
          type="text"
          label="Antenna"
          :value="station.antenna"
          @update="updateStation({ antenna: $event })"
        />
        <FormElement
          type="text"
          label="Antenna Height"
          :value="station.antennaHeight"
          @update="updateStation({ antennaHeight: $event })"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <FormElement
          type="text"
          label="ARRL Section"
          :value="station.arrlSection"
          @update="updateStation({ arrlSection: $event })"
        />
        <FormElement
          type="text"
          label="E-Mail"
          :value="station.email"
          @update="updateStation({ email: $event })"
        />
      </div>

      <!-- Select -->

      <div class="relative mb-10">
        <label
          class="text-gray-700 dark:text-white"
          for="animals"
        >
          Animals
          <select
            id="animals"
            class="block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm dark:text-gray-700 w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            name="animals"
          >
            <option value="">
              Select an options
            </option>
            <option value="dog">
              Dog
            </option>
            <option value="cat">
              Cat
            </option>
            <option value="hamster">
              Hamster
            </option>
            <option value="parrot">
              Parrot
            </option>
            <option value="spider">
              Spider
            </option>
            <option value="goldfish">
              Goldfish
            </option>
          </select>
        </label>
      </div>

      <!-- Checks -->

      <div class="relative mb-10">
        <label
          class="text-gray-700 dark:text-white"
          for="animals"
        >
          Animals
        </label>
        <label class="flex items-center mb-3 space-x-3">
          <input
            type="checkbox"
            name="checked-demo"
            class="w-6 h-6 bg-white border border-gray-300 rounded-md appearance-none form-tick bg-check checked:bg-indigo-700 checked:border-transparent focus:outline-none"
          >
          <span class="font-normal text-gray-700 dark:text-white">
            Blue
          </span>
        </label>
      </div>

      <!-- Toggle Switch -->

      <div class="relative mb-10">
        <label
          class="text-gray-700 dark:text-white"
          for="animals"
        >
          Animals
        </label>
        <div class="mb-3">
          <div class="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              id="Blue"
              type="checkbox"
              name="toggle"
              class="absolute block w-6 h-6 duration-200 ease-in bg-white border-4 rounded-full outline-none appearance-none cursor-pointer checked:bg-indigo-700 focus:outline-none right-4 checked:right-0"
            >
            <label
              for="Blue"
              class="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
            />
          </div>
          <span class="font-medium text-gray-400">
            Blue
          </span>
        </div>
      </div>
    </SettingsPartial>
  </div>
</template>

<script lang="ts">
import SettingsPartial from '../components/SettingsPartial.vue'
import FormElement from '../components/FormElement.vue'
import { useStore } from '../store'
import { computed, defineComponent } from '@vue/runtime-core'
import { ActionTypes } from '../store/actions'

export default defineComponent({
  components: {
    SettingsPartial,
    FormElement
  },
  setup () {
    const store = useStore()

    const station = computed(() => store.getters.station)
    const updateStation = (data) => store.dispatch(ActionTypes.UpdateStation, data)

    return {
      station,
      updateStation
    }
  }
})
</script>

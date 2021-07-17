<template>
  <tr
    :class="{ selected, editable }"
  >
    <td>
      <span v-if="editable">
        <input
          v-model="qsoCopy.datetime.month"
          type="text"
          size="2"
          @blur="$emit('edit', qsoCopy)"
          @focus="$event.target.select()"
          @keypress.enter="onEnter()"
        >-<input
          v-model="qsoCopy.datetime.day"
          type="text"
          size="2"
          @blur="$emit('edit', qsoCopy)"
          @focus="$event.target.select()"
          @keypress.enter="onEnter()"
        >
        <input
          v-model="qsoCopy.datetime.time"
          type="text"
          size="4"
          @blur="$emit('edit', qsoCopy)"
          @focus="$event.target.select()"
          @keypress.enter="onEnter()"
        >
      </span>
      <span v-else>
        {{ qso.datetime.month }}-{{ qso.datetime.day }} {{ prettyTime(qso.datetime.time) }}
      </span>
    </td>
    <td>
      <input
        v-if="editable"
        v-model="qsoCopy.call"
        type="text"
        :size="fieldSize(qsoCopy.call)"
        @blur="$emit('edit', qsoCopy)"
        @focus="$event.target.select()"
        @keypress.enter="onEnter()"
      >
      <span v-else>
        {{ qso.call }}
      </span>
    </td>
    <td>
      <input
        v-if="editable"
        v-model="qsoCopy.vfo.frequency"
        type="text"
        :size="fieldSize(qsoCopy.vfo.frequency)"
        @blur="$emit('edit', qsoCopy)"
        @focus="$event.target.select()"
        @keypress.enter="onEnter()"
      >
      <span v-else>
        {{ qso.vfo.frequency }}
      </span>
    </td>
    <td>
      <input
        v-if="editable"
        v-model="qsoCopy.vfo.mode"
        type="text"
        :size="fieldSize(qsoCopy.vfo.mode)"
        @blur="$emit('edit', qsoCopy)"
        @focus="$event.target.select()"
        @keypress.enter="onEnter()"
      >
      <span v-else>{{ qso.vfo.mode }}</span>
    </td>
    <td
      v-for="field in fields"
      :key="field"
    >
      <input
        v-if="editable"
        v-model="qsoCopy[field]"
        type="text"
        :size="fieldSize(qsoCopy[field])"
        @blur="$emit('edit', qsoCopy)"
        @focus="$event.target.select()"
        @keypress.enter="onEnter()"
      >
      <span v-else>
        {{ qso[field] }}
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/runtime-core'

export default defineComponent({
  props: {
    qso: {
      type: Object,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['edit', 'wipe'],
  setup (props, { emit }) {
    const qsoCopy = ref({})

    watch(() => props.editable, () => Object.assign(qsoCopy.value, props.qso))

    const prettyTime = (time) => time ? `${time.slice(0, 2)}:${time.slice(2)}` : ''
    const fieldSize = (data, min = 3, max = 10) => Math.min(max, Math.max(min, `${data || ''}`.length))
    const onFocusOut = () => console.log('focus out of TD')
    const onEnter = () => {
      console.log('will edit qso.copy', JSON.parse(JSON.stringify(qsoCopy.value)))
      emit('edit', qsoCopy.value)
      emit('wipe')
    }
    return {
      qsoCopy,
      prettyTime,
      onFocusOut,
      onEnter,
      fieldSize
    }
  }
})
</script>

<style scoped lang="postcss">
  td {
    @apply border px-4 py-2
  }
</style>

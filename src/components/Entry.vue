<template>
  <div class="entry">
    <form
      v-if="contest && contest.entry"
      class="flex flex-row"
      @submit="onSubmit"
      @keydown.space.prevent="onSpace"
      @keydown.tab="onTab"
      @keydown.enter="onSubmit"
    >
      <EntryInput
        ref="callElement"
        :value="modelValue.call.value"
        :input-regex="/[\dA-Za-z\/\?]/"
        :size="10"
        :regex="contest.entry.regex"
        @input="
          updateModelValue(
            $event.target.value && $event.target.value.toUpperCase(),
            'call'
          )
        "
      />

      <EntryInput
        v-if="!contest.entry.sent.hide"
        label="Snt"
        :size="1"
        :value="modelValue.sent.value"
        :input-regex="/\d/"
        @focus="onRstFocus($event, 'sent')"
        @input="updateModelValue($event.target.value, 'sent')"
      />

      <EntryInput
        v-if="!contest.entry.received.hide"
        label="Rcv"
        :size="1"
        :input-regex="/\d/"
        :value="modelValue.received.value"
        @focus="onRstFocus($event, 'received')"
        @input="updateModelValue($event.target.value, 'received')"
      />

      <EntryInput
        v-if="!contest.entry.receivedExchange.hide"
        :label="contest.entry.receivedExchange.label"
        :size="contest.entry.receivedExchange.size || 1"
        :input-regex="contest.entry.receivedExchange.inputRegex"
        :regex="contest.entry.receivedExchange.regex"
        :allow-space="contest.entry.receivedExchange.allowSpace"
        :value="modelValue.receivedExchange.value"
        @input="updateModelValue($event.target.value, 'receivedExchange')"
      />

      <!-- Custom Entries -->

      <EntryInput
        v-for="(input, key) in contest.entry.custom"
        :key="key"
        :label="input.label"
        :input-regex="input.inputRegex"
        :regex="input.regex"
        :allow-space="input.allowSpace"
        :size="input.size"
        :value="modelValue[key] && modelValue[key].value"
        @input="updateModelValue($event.target.value, key)"
      />

      <!-- <EntryInput
        label="Name"
        :size="4"
        :value="modelValue.name.value"
        @input="updateModelValue($event.target.value, 'name')"
      />

      <EntryInput
        label="Comment"
        class="flex-1"
        :value="modelValue.comment.value"
        :allow-space="true"
        @input="updateModelValue($event.target.value, 'comment')"
      /> -->
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import EntryInput from './EntryInput.vue'

// import { prefixes } from '../files/wl_cty'

export default defineComponent({
  components: {
    EntryInput
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue', 'frequencyUpdate', 'modeUpdate', 'submit', 'wipe'],
  setup (props, { emit }) {
    const store = useStore()
    const contest = computed(() => store.getters.contest)
    const callElement = ref<typeof EntryInput>(null)

    const reset = () => callElement.value.focus()
    const updateModelValue = (value, key) => {
      emit('update:modelValue', {
        ...props.modelValue,
        [key]: {
          ...props.modelValue[key],
          value
        }
      })
    }
    const onRstFocus = ({ select }, key) => {
      if (!props.modelValue[key].value) {
        // @todo: Use constants instead of strings
        updateModelValue(props.mode === 'CW' ? 599 : 59, key)
      }
      nextTick(select)
    }

    const onSpace = () => { console.log('space') }
    const onTab = () => { console.log('tab') }

    const onSubmit = ($event) => {
      const call = props.modelValue.call.value

      // Check if call is frequency
      if (call.match(/^\d+$/)) {
        emit('frequencyUpdate')
        // @todo: Use constants instead of strings
      } else if (['SSB', 'CW', 'DIGI', 'AM', 'FM'].includes(call)) {
        emit('modeUpdate')
      } else if (validate()) {
        console.log('submit')
        emit('submit', $event)
      }
    }

    const wipe = () => emit('wipe')
    const focus = () => callElement.value.focus()

    const validate = () => {
      return Object.keys(props.modelValue).every((key) => {
        if (props.modelValue[key].required && !props.modelValue[key].value) {
          console.error(`Missing value for key [${key}]`)
          return false
        } else {
          return true
        }
      })
    }

    return {
      callElement,
      contest,
      reset,
      updateModelValue,
      wipe,
      focus,
      onRstFocus,
      onSpace,
      onTab,
      onSubmit
    }
  }
})
</script>

<style lang="postcss">
.entry div:first-child input {
  @apply rounded-l;
}
.entry div:last-child input {
  @apply rounded-r;
}
</style>

<script lang="ts">
export default {
  name: 'DashboardPage',
}
</script>

<script setup lang="ts">
import '@fullcalendar/core/vdom'
import FullCalendar, {
  CalendarOptions,
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventAddArg,
  EventChangeArg,
  EventRemoveArg,
} from '@fullcalendar/vue3'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { reactive, ref } from 'vue'

const currentEvents = ref<EventApi[]>([])

const calendarOptions = reactive({
  plugins: [resourceTimeGridPlugin, interactionPlugin],
  initialView: 'resourceTimeGridDay',
  schedulerLicenseKey: import.meta.env.VITE_SCHEDULER_LICENSE_KEY,
  eventColor: '#0d9488',
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  eventAdd: handleEventAdd,
  eventChange: handleEventChange,
  eventRemove: handleEventRemove,
  resources: [
    {
      id: 'a',
      title: 'Room A',
    },
    {
      id: 'b',
      title: 'Room B',
      eventColor: 'green',
    },
  ],
  events: [
    {
      id: '1',
      resourceId: 'a',
      start: '2022-11-13T02:00:00',
      end: '2022-11-13T07:00:00',
      title: 'event 1',
      // color: 'red',
    },
    {
      id: '2',
      resourceId: 'b',
      start: '2022-11-13T02:00:00',
      end: '2022-11-13T07:00:00',
      title: 'event 1',
    },
  ],
}) as CalendarOptions

function handleDateSelect(selectInfo: DateSelectArg) {
  let title = prompt('Please enter a new title for your event')
  let calendarApi = selectInfo.view.calendar
  calendarApi.unselect() // clear date selection
  if (title) {
    calendarApi.addEvent({
      id: '3',
      title,
      resourceId: 'b',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    })
  }
}

function handleEventClick(clickInfo: EventClickArg) {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}

function handleEvents(events: EventApi[]) {
  currentEvents.value = events
}

function handleEventAdd(event: EventAddArg) {
  console.log('eventAdd', event)
}

function handleEventChange(event: EventChangeArg) {
  console.log('eventChange', event)
}

function handleEventRemove(event: EventRemoveArg) {
  console.log('eventRemove', event)
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
    <div class="py-4">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

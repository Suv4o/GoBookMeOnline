<script lang="ts">
export default {
  name: 'FullCalendar',
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
import scrollGridPlugin from '@fullcalendar/scrollgrid'
import { reactive, ref } from 'vue'

const currentEvents = ref<EventApi[]>([])

const calendarOptions = reactive({
  plugins: [resourceTimeGridPlugin, interactionPlugin, scrollGridPlugin],
  initialView: 'resourceTimeGridDay',
  schedulerLicenseKey: import.meta.env.VITE_SCHEDULER_LICENSE_KEY,
  headerToolbar: {
    left: 'prevYear,prev,today,next,nextYear',
    center: 'title',
    right: 'resourceTimeGridDay,resourceTimeGridWeek',
  },
  eventColor: '#0d9488',
  resourceAreaWidth: '100%',
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  nowIndicator: true,
  eventOverlap: false,
  slotEventOverlap: false,
  allDaySlot: false,
  contentHeight: 'auto',
  dayMinWidth: 240,
  //   slotMinTime: '22:00:00',
  //   slotMaxTime: '23:00:00',
  //   scrollTime: '06:00',
  //   slotDuration: '00:05:00',
  //   slotLabelInterval: '00:05:00',
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  eventAdd: handleEventAdd,
  eventChange: handleEventChange,
  eventRemove: handleEventRemove,
  resources: [
    {
      id: 1,
      title: 'Room A',
      businessHours: {
        start: '10:00:00',
        end: '18:00:00',
        daysOfWeek: [0, 3, 6], // Sunday, Wednesday, Saturday
      },
    },
    {
      id: 2,
      title: 'Room B',
      eventColor: 'green',
    },
    {
      id: 3,
      title: 'Room C',
    },
    {
      id: 4,
      title: 'Room D',
    },
    {
      id: 5,
      title: 'Room E',
    },
    {
      id: 6,
      title: 'Room F',
    },
    {
      id: 7,
      title: 'Room G',
    },
    {
      id: 8,
      title: 'Room H',
    },
    {
      id: 9,
      title: 'Room I',
    },
    {
      id: 10,
      title: 'Room J',
    },
    {
      id: 11,
      title: 'Room K',
    },
    {
      id: 12,
      title: 'Room L',
    },
    {
      id: 13,
      title: 'Room M',
    },
  ],
  events: [
    {
      id: '1',
      resourceId: 1,
      start: '2022-11-14T02:00:00',
      end: '2022-11-14T07:00:00',
      title: 'event 1',
      // color: 'red',
    },
    {
      id: '2',
      resourceId: 2,
      start: '2022-11-14T02:00:00',
      end: '2022-11-14T07:00:00',
      title: 'event 2',
    },
  ],
}) as CalendarOptions

function handleDateSelect(selectInfo: DateSelectArg) {
  let title = prompt('Please enter a new title for your event')
  let calendarApi = selectInfo.view.calendar
  calendarApi.unselect()
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
  <FullCalendar :options="calendarOptions" />
</template>

<style>
.fc-header-toolbar button {
  border-color: #4b5563 !important;
  background-color: #0d9488 !important;
  color: white !important;
}

@media screen and (max-width: 999px) {
  .fc-header-toolbar {
    flex-direction: column;
  }
}
</style>

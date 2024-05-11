<!-- This component allows a user to update a specific event's information. -->
<template>
  <main>
    <div>
      <!--Header-->
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Event Details
      </h1>
    </div>
    <div class="px-10 py-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Event Details</h2>
        <!-- Event Name input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Event Name</span>
            <span style="color: #ff0000">*</span>
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="state.event.name"
            />
            <span v-if="v$.event.name.$error" class="text-red-500">
              Event Name is required
            </span>
          </label>
        </div>

        <!-- Date input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Date</span>
            <span style="color: #ff0000">*</span>
            <input
              type="date"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="state.event.date"
            />
            <span v-if="v$.event.date.$error" class="text-red-500">
              <span v-if="v$.event.date.required.$invalid">
                Event Date is required
              </span>
              <span
                v-else-if="
                  !v$.event.date.required.$invalid &&
                  v$.event.date.validDate.$invalid
                "
              >
                Event Date must be a valid date
              </span>
            </span>
          </label>
        </div>

        <div></div>
        <div></div>
        <!-- Description input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Description</span>
            <textarea
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="2"
              v-model="state.event.description"
            ></textarea>
          </label>
        </div>
      </div>

      <!-- Services Offered at Event checkboxes -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-10"
      >
        <h2 class="text-2xl font-bold">Services Offered at Event</h2>
        <div class="flex flex-col grid-cols-3">
          <div>
            <ul v-if="state.services.length" class="space-y-2">
              <li
                v-for="service in state.services"
                :key="service._id"
                :data-service-id="service._id"
                class="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 transition-colors relative"
              >
                <label class="block w-full h-full">
                  <input
                    type="checkbox"
                    :id="service._id"
                    :value="service._id"
                    :checked="state.event.services.includes(service._id)"
                    v-model="state.event.services"
                    :disabled="service.status === 'Inactive'"
                    class="rounded border-gray-300 disabled:opacity-50 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                  />
                  <span class="font-medium">{{ service.name }}</span>
                </label>
              </li>
            </ul>
            <!--If there are no active services for the user's organization, this will appear instead of list of checkboxes-->
            <p v-else class="text-gray-600">No Active Services Available</p>
          </div>
        </div>
      </div>

      <!-- grid container -->
      <div
        class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Address</h2>
        <!-- Address 1 input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 1</span>
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder
              v-model="state.event.address.line1"
            />
          </label>
        </div>
        <!-- Address 2 input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 2</span>
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder
              v-model="state.event.address.line2"
            />
          </label>
        </div>
        <!-- City input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">City</span>
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder
              v-model="state.event.address.city"
            />
          </label>
        </div>
        <div></div>
        <!-- County input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">County</span>
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder
              v-model="state.event.address.county"
            />
          </label>
        </div>
        <!-- Zip Code input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Zip Code</span>
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder
              v-model="state.event.address.zip"
            />
          </label>
        </div>
      </div>

      <!-- grid container -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div></div>
        <!--Update Event button-->
        <div class="flex justify-between mt-10 mr-20">
          <button
            @click="submitEventUpdate"
            type="submit"
            class="bg-green-700 disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'"
          >
            Update Event
          </button>
        </div>
        <!--Delete Event button-->
        <div class="flex justify-between mt-10 mr-20">
          <button
            @click="submitDeleteEvent"
            type="submit"
            class="bg-red-700 disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'"
          >
            Delete Event
          </button>
          <!--Go back button-->
        </div>
        <div class="flex justify-between mt-10 mr-20">
          <button
            type="reset"
            class="border border-red-700 bg-white text-red-700 rounded"
            @click="this.$router.back()"
          >
            Go back
          </button>
        </div>
      </div>

      <hr class="mt-10 mb-10" />

      <!-- grid container -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div>
          <h2 class="text-2xl font-bold">List of Attendees</h2>
          <h3 class="italic">Click table row to view client details</h3>
        </div>
        <!--Table showing the list of attendees for the selected event-->
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr>
                <th class="p-4 text-left">Name</th>
                <th class="p-4 text-left">City</th>
                <th class="p-4 text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="
                  $router.push({
                    name: 'clientdetails',
                    params: { id: client._id }
                  })
                "
                v-for="client in state.clients"
                :key="client._id"
                class="cursor-pointer"
                :class="{ hoverRow: state.hoverId === client._id }"
                @mouseenter="state.hoverId = client._id"
                @mouseleave="state.hoverId = null"
              >
                <td class="p-2 text-left">
                  {{ client.firstName + ' ' + client.lastName }}
                </td>
                <td class="p-2 text-left">{{ client.address.city }}</td>
                <td class="p-2 text-left">
                  {{ client.phoneNumber.primary }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// Importing necessary functionalities and components
import { reactive, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useLoggedInUserStore } from '../store/loggedInUser';
import {
  getEventById,
  getEventAttendees,
  getServices,
  updateEvent,
  deleteEvent
} from '../api/api';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';

// Initializing toast notifications
const toast = useToast();

export default {
  setup() {
    // Accessing the logged-in user's store
    const user = useLoggedInUserStore();

    // Accessing the current route
    const route = useRoute();
    const router = useRouter();

    // Reactive state to hold event data, clients, services, and hoverId
    const state = reactive({
      event: {
        name: null,
        description: null,
        date: null,
        address: {
          line1: null,
          line2: null,
          city: null,
          county: null,
          zip: null
        },
        attendees: [],
        services: []
      },
      clients: [],
      services: [],
      hoverId: null
    });

    // Custom validation for date format
    const validDate = (value) => {
      const date = new Date(value);
      return !isNaN(date);
    };

    // Defining validation rules
    const rules = {
      event: {
        name: { required },
        date: { required, validDate }
      }
    };

    // Using Vuelidate for form validation
    const v$ = useVuelidate(rules, state);

    // Method to update event details
    const submitEventUpdate = async () => {
      // Triggering validation
      await v$.value.$validate();

      // Checking for validation errors
      if (v$.$error) {
        // If form is invalid, stop execution
        return;
      }

      try {
        // Updating event details via API call
        const response = await updateEvent(route.params.id, state.event);
        // Displaying success message
        toast.success(response);
        // Navigating to 'findevents' route upon successful update
        router.push('/findevents');
      } catch (error) {
        // Displaying error message if update fails
        toast.error('Error updating event', error);
      }
    };

    // Method to delete event
    const submitDeleteEvent = async () => {
      try {
        // Checking if event has attendees
        if (state.event.attendees.length > 0) {
          // Displaying info message if event has attendees and cannot be deleted
          toast.info('Event cannot be deleted since it has attendees.');
          return;
        }

        // Deleting event via API call
        const response = await deleteEvent(route.params.id);
        // Displaying success message
        toast.success(response);
        // Navigating to 'findevents' route upon successful deletion
        router.push('/findevents');
      } catch (error) {
        // Displaying error message if deletion fails
        toast.error(error);
      }
    };

    // Method to fetch data when the component is mounted
    const loadData = async () => {
      try {
        // Fetching event details, attendees, and services concurrently
        const [eventResponse, clientsResponse, servicesResponse] =
          await Promise.all([
            getEventById(route.params.id),
            getEventAttendees(route.params.id),
            getServices()
          ]);

        // Formatting date to ISO string
        eventResponse.date = new Date(eventResponse.date)
          .toISOString()
          .substring(0, 10);

        // Updating state with fetched data
        state.event = eventResponse;
        state.clients = clientsResponse;
        state.services = servicesResponse;

        // Resetting validation state
        v$.value.$reset();
      } catch (error) {
        // Handling error and displaying toast notification
        console.log(error);
        toast.error('Error loading data', error);
      }
    };

    // Fetch data when the component is mounted
    onMounted(loadData);

    // Returning reactive state, Vuelidate instance, and methods for use in the template
    return { state, v$, user, submitEventUpdate, submitDeleteEvent };
  }
};
</script>

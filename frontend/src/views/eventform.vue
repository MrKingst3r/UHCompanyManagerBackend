<!-- This view allows for the creation of a new event -->
<template>
  <main>
    <div>
      <!--Header-->
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Create New Event
      </h1>
    </div>
    <div class="px-10 py-20">
      <!--Form-->
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="handleSubmitForm">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Event Details</h2>

          <!-- Event Name Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Event Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="state.event.name"
              />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.event.name.$error" class="text-red-500">
              Event Name is required
            </span>
          </div>

          <!-- Date input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Date</span>
              <span style="color: #ff0000">*</span>
              <input
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="state.event.date"
                type="date"
              />
            </label>
            <!-- Validation error messages -->
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
              <span
                v-else-if="
                  !v$.event.date.required.$invalid &&
                  !v$.event.date.validDate.$invalid &&
                  v$.event.date.notBeforeToday.$invalid
                "
              >
                New Event Date cannot be in the past.
              </span>
            </span>
          </div>

          <div></div>
          <div></div>
          <!-- Description input field -->
          <div class="flex col-span-2 flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
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
              <ul v-if="state.activeServices.length" class="space-y-2">
                <li
                  v-for="service in state.activeServices"
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
                      class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
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
          <!-- Zip code field -->
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

        <!--Add New Event submit button-->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div></div>
          <div class="flex justify-between mr-20">
            <button class="bg-red-700 text-white rounded" type="submit">
              Add New Event
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
// Importing necessary Composition API functions and validators
import { reactive, ref, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { getServices, createEvent } from '../api/api';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

// Initializing toast notifications
const toast = useToast();

export default {
  setup() {
    const router = useRouter();

    // Using the reactive function to create a reactive state for the event and services
    const state = reactive({
      event: {
        name: null,
        description: null,
        date: null,
        services: [],
        address: {
          line1: null,
          line2: null,
          city: null,
          county: null,
          zip: null
        },
        attendees: []
      },
      activeServices: [],
      openDescriptions: []
    });

    // Custom validation rules
    const validDate = (value) =>
      new Date(value) instanceof Date && !isNaN(new Date(value));
    const notBeforeToday = (value) => {
      const today = new Date();
      return value >= today.toISOString().split('T')[0];
    };

    // Defining the validation schema
    const rules = {
      event: {
        name: { required },
        date: { required, validDate, notBeforeToday }
      }
    };

    // Initializing Vuelidate with the state and validation rules
    const v$ = useVuelidate(rules, state);

    // Function to load active services from the API
    const loadServices = async () => {
      try {
        const response = await getServices();
        // Filter for active services and assign to reactive state
        state.activeServices = response.filter(
          (item) => item.status === 'Active'
        );
      } catch (error) {
        toast.error(error);
      }
    };

    // Fetch services when the component is mounted
    onMounted(loadServices);

    // Handling form submission
    const handleSubmitForm = async () => {
      // Trigger validation
      await v$.value.$validate();

      if (v$.value.$error) {
        toast.error('Please fix input field errors');
        // Form is invalid, do not proceed
        return;
      }

      try {
        // API call to create a new event
        const response = await createEvent(state.event);
        // Redirect after successful creation
        router.push('/findevents');
        // Show success message
        toast.success(response);
      } catch (error) {
        toast.error(`error creating new event: ${error}`);
      }
    };

    // Exposing state, validation, and methods to the template
    return {
      state,
      v$,
      handleSubmitForm
    };
  }
};
</script>

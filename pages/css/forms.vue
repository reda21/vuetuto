<template>
  <div>
    <p class="text-sm text-gray-800 dark:text-gray-200 mb-4">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis dolores in
      reiciendis voluptatibus cum quia rem nulla totam. Eveniet quod odio,
      accusantium amet expedita ad veritatis saepe fuga! Earum, aspernatur!
    </p>
    <div class="card flex justify-center">
      <Form
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col gap-2 w-full sm:w-1/2"
      >
        <Form-control :form="$form">
          <InputText name="username" type="text" placeholder="Username" fluid />
        </Form-control>
        <div class="flex flex-col gap-1">
          <Message
            v-if="$form.username?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.username.error?.message }}
          </Message>
          <CascadeSelect
            class="mt-3"
            v-model="selectedCity"
            :options="countries"
            optionLabel="cname"
            optionGroupLabel="name"
            :optionGroupChildren="['states', 'cities']"
            placeholder="Select a City"
          />
        </div>
        <Button type="submit" severity="secondary" label="Submit" />
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const selectedCity = ref();

interface FormValues {
  username: string;
}

const initialValues = reactive({
  username: "",
  city: null,
});

const countries = ref([
  {
    name: "Australia",
    code: "AU",
    states: [
      {
        name: "New South Wales",
        cities: [
          { cname: "Sydney", code: "A-SY" },
          { cname: "Newcastle", code: "A-NE" },
          { cname: "Wollongong", code: "A-WO" },
        ],
      },
      {
        name: "Queensland",
        cities: [
          { cname: "Brisbane", code: "A-BR" },
          { cname: "Townsville", code: "A-TO" },
        ],
      },
    ],
  },
  {
    name: "Canada",
    code: "CA",
    states: [
      {
        name: "Quebec",
        cities: [
          { cname: "Montreal", code: "C-MO" },
          { cname: "Quebec City", code: "C-QU" },
        ],
      },
      {
        name: "Ontario",
        cities: [
          { cname: "Ottawa", code: "C-OT" },
          { cname: "Toronto", code: "C-TO" },
        ],
      },
    ],
  },
  {
    name: "United States",
    code: "US",
    states: [
      {
        name: "California",
        cities: [
          { cname: "Los Angeles", code: "US-LA" },
          { cname: "San Diego", code: "US-SD" },
          { cname: "San Francisco", code: "US-SF" },
        ],
      },
      {
        name: "Florida",
        cities: [
          { cname: "Jacksonville", code: "US-JA" },
          { cname: "Miami", code: "US-MI" },
          { cname: "Tampa", code: "US-TA" },
          { cname: "Orlando", code: "US-OR" },
        ],
      },
      {
        name: "Texas",
        cities: [
          { cname: "Austin", code: "US-AU" },
          { cname: "Dallas", code: "US-DA" },
          { cname: "Houston", code: "US-HO" },
        ],
      },
    ],
  },
]);

interface FormErrors {
  username?: { message: string }[];
}

const resolver = ({ values }: { values: FormValues }) => {
  const errors: FormErrors = {};

  if (!values.username) {
    errors.username = [{ message: "Username is required." }];
  }

  return {
    errors,
  };
};

const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
  }
};
</script>

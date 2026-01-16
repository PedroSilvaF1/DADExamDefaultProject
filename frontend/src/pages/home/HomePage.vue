<script setup>
import {inject} from 'vue'
import {RouterLink} from 'vue-router'

const studentName = inject('studentName')
const studentNumber = inject('studentNumber')
</script>

<template>
  <div>
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      DAD Practical Exam
    </h2>
    <p class="my-4 text-center text-lg text-gray-600">
      The examinee (student) information is as follows:
    </p>
    <p class="my-2 text-center">
      <span class="inline-block w-40 text-lg font-bold">Student Number:</span>
      <span>
                {{ studentNumber }}
            </span>
    </p>
    <p class="my-2 text-center">
      <span class="inline-block w-40 text-lg font-bold">Student Name:</span>
      <span>{{ studentName }}</span>
    </p>

    <div class="mt-8 flex justify-center">
      <RouterLink
          to="/notes"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
      >
        Gerir as Minhas Notas
      </RouterLink>
    </div>

    <div class="mt-8 flex justify-center">
      <RouterLink
          to="/store"
          class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-md"
      >
        Visitar a Loja Online
      </RouterLink>
    </div>
  </div>
</template>

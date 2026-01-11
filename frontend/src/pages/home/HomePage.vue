<script setup>
    import { inject } from 'vue'   
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
    </div>
</template>

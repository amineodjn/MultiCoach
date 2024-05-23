<template> 
  <div class="container mx-auto py-6"> 
    <div class="flex justify-between items-center mb-4"> 
      <h2 class="text-2xl font-bold">Projects</h2> 
      <div class="relative"> 
        <input type="text" v-model="searchQuery" placeholder="Search" class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" /> 
        <svg class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4a8 8 0 1016 16m-2-2l4-4"/> 
        </svg> 
      </div> 
    </div> 
    <ul> 
      <li v-for="project in filteredProjects" :key="project.id" class="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md" >
         <div class="flex items-center"> 
          <img :src="project.image" alt="" class="w-10 h-10 rounded-full mr-4"> 
          <div> <h3 class="text-lg font-semibold">{{ project.name }}</h3> 
            <p class="text-sm text-gray-500">Updated {{ project.updated }}</p> 
          </div> 
        </div> 
        <div class="flex space-x-2"> 
          <button class="p-2 text-gray-500 hover:text-gray-700"> 
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/> </svg> 
            </button> 
            <button class="p-2 text-gray-500 hover:text-gray-700"> 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/> </svg> 
              </button> 
            </div> 
          </li> 
        </ul> 
        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">View all projects</button> 
       </div> 
</template> 
<script setup> 
import { ref, computed } from 'vue' 
const searchQuery = ref('') 
const projects = ref([ 
  { id: 1, name: 'Get a complete audit store', updated: '5 days ago', image: 'path/to/image1.png' }, 
  { id: 2, name: 'Build stronger customer relationships', updated: '2 months ago', image: 'path/to/image2.png' }, 
  { id: 3, name: "James' UI/UX project", updated: '3 hours ago', image: 'path/to/image3.png' }, 
  { id: 4, name: 'Tailwind CSS', updated: '45 minutes ago', image: 'path/to/image4.png' }, ]) 
  const filteredProjects = computed(() => { return projects.value.filter(project => project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ) }) 
</script> 

<style scoped> 
  .container { 
    max-width: 800px; } 
</style>
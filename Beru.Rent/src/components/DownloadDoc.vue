<template>
    <v-btn @click="downloadContract" prepend-icon="file-document-check-outline" variant="outlined">
      Скачать договор
    </v-btn>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      async downloadContract() {
        try {
          const apiEndpoint = `https://localhost:7296/api/deal/generatedoc/${yourId}`;
          
          // Make a GET request to the API endpoint
          const response = await axios.get(apiEndpoint, {
            responseType: 'blob', // Important for handling binary data (like PDFs)
          });
  
          // Create a blob from the response data
          const blob = new Blob([response.data], { type: 'application/pdf' });
  
          // Create a link element to trigger the download
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
  
          // Set the filename for the download
          link.download = 'contract.pdf';
  
          // Append the link to the document and trigger the download
          document.body.appendChild(link);
          link.click();
  
          // Remove the link from the document after the download
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading contract:', error);
          // Handle the error, e.g., show a notification to the user
        }
      },
    },
  };
  </script>
  
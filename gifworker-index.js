// gifworker-index.js

// Import any necessary functions or variables

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
    const { action, caseName } = event.data;
  
    // Handle the message and change GIFs accordingly
    if (action === 'changeGIFPerson') {
      // Handle changing the person's GIF
      const gifURL = cases_person[caseName] || cases.default;
      self.postMessage({ action: 'updateGIFPerson', gifURL });
    } else if (action === 'changeGIFTrex') {
      // Handle changing the T-Rex's GIF
      const gifURL = cases_trex[caseName] || cases.default;
      self.postMessage({ action: 'updateGIFTrex', gifURL });
    }
  });
  
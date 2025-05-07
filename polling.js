function apiCall() {
  console.log("API called at", new Date().toLocaleTimeString())

  // Simulate a random success response
  return new Promise((resolve) => {
    const isSuccess = Math.random() > 0.8
    setTimeout(() => {
      resolve({ success: isSuccess })
    }, 1000) // simulate 1s API response delay
  })
}

function poll(func, pollInterval = 5000, maxTimeout = 120000) {
  const startTime = Date.now()

  async function executePoll() {
    const elapsed = Date.now() - startTime

    if (elapsed >= maxTimeout) {
      console.log("⏰ Stopping polling: timeout exceeded")
      return
    }

    try {
      const result = await func()

      if (result.success) {
        console.log("✅ Success! Stopping polling.")
        return
      }

      // Retry after the specified interval
      setTimeout(executePoll, pollInterval)
    } catch (err) {
      console.error("❌ Polling error:", err)
      setTimeout(executePoll, pollInterval) // Optionally retry on error
    }
  }

  executePoll()
}

// Usage
poll(apiCall, 5000, 120000) // poll every 5s, timeout after 2 mins

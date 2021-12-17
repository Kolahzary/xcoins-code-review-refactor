process.on('unhandledRejection', (err) => {
  console.error(['unhandled promise rejection', err])
  fail(err)
})

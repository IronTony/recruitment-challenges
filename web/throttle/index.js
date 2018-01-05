const throttlePromises = async (limit, promises) => {
  let results = []
  let i = 0
  let promisesWorking = 0

  const resolveNextPromise = () => {
    if (!promises.length) return

    const promise = promises.pop()
    promisesWorking++

    if (promisesWorking < limit) {
      resolveNextPromise()
    }

    return promise().then((res) => {
      results[i] = res
      i++
      promisesWorking--

      return resolveNextPromise()
    })
  }

  await resolveNextPromise()

  return results
}

module.exports = throttlePromises

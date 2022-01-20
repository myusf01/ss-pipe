import fs from 'fs'

// will take an array of files and callback
// func will delete each file exists in array
// when no files left then delete working directory
export function cleanUp(listOfPNGs, callback) {
  let i = listOfPNGs.length

  listOfPNGs.forEach(filepath => {
    // unlink method to remove files exists in array

    fs.unlink(filepath, function (err) {
      // decrease one from length
      i--
      if (err) {
        callback(err)
        return
      } else if (i <= 0) {
        callback(null)
      }
    })
  })
}


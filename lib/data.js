const fs = require("fs");
const path = require("path");
const lib = {};

lib.baseDir = path.join(__dirname, "../");
lib.create = function (dir, file, data, callback) {
  // Use path.join for consistent path handling
  const filePath = path.join(lib.baseDir, dir, `${file}.json`);
  
  // First read existing data
  fs.readFile(filePath, 'utf8', (readErr, existingData) => {
    let dataToWrite = [];
    
    // If file exists and has data, merge with new data
    if (!readErr && existingData) {
      try {
        const parsedData = JSON.parse(existingData);
        // Always convert to array if it's not already
        dataToWrite = Array.isArray(parsedData) ? parsedData : [parsedData];
      } catch (parseErr) {
        callback("Error parsing existing data");
        return;
      }
    }
    
    // Add new data to array
    dataToWrite.push(data);

    // Write combined data back to file
    fs.writeFile(filePath, JSON.stringify(dataToWrite, null, 2), (writeErr) => {
      if (!writeErr) {
        callback(false);
      } else {
        callback("Error writing to file");
      }
    });
  });
};

lib.read = function (dir, file, callback) {
  fs.readFile(
    lib.baseDir + dir + "/" + file + ".json",
    "utf-8",
    (err, data) => {
      if (!err && data) {
        const parsedData = JSON.parse(data);
        callback(false, parsedData);
      } else {
        callback(err, data);
      }
    }
  );
};

lib.update = function (dir, file, data, callback) {
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
          const stringData = JSON.stringify(data);
          fs.ftruncate(fileDescriptor, (err) => {
            if (!err) {
              fs.writeFile(fileDescriptor, stringData, (err) => {
                if (!err) {
                  fs.close(fileDescriptor, (err) => {
                    if (!err) {
                      callback(false);
                    } else {
                      callback("Error closing file");
                    }
                  });
                } else {
                  callback("Error writing to existing file");
                }
              });
            } else {
              callback("Error truncating file");
            }
          });
      }
    }
  );
};


lib.delete = (dir, file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback(`Error deleting file`);
        }
    });
};

module.exports = lib;

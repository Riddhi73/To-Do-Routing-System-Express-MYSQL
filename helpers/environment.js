// Environment container
const environments = {};  

// Staging config
environments.staging = {
    port: 3000,
    envName: "staging",
};

// Production config
environments.production = {  
    port: 4000,
    envName: "production",
};

// Get current environment
const currentEnv =
    typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// Select environment config
const environmentToExport =
    typeof environments[currentEnv] === "object"  
        ? environments[currentEnv]
        : environments.staging;

// Export config
module.exports = environmentToExport;

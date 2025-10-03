import admin, { ServiceAccount } from "firebase-admin";

// Define the structure of the Service Account (for type safety and fallback)
// NOTE: This interface represents the structure of the full Service Account JSON file.
interface ServiceAccountJson {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
}

console.log("file running...");

// 1. Define the fallback configuration as a JavaScript object.
const FALLBACK_CONFIG: ServiceAccountJson = {
    type: "service_account",
    project_id: "nurture-nerve",
    private_key_id: "7286ff37f10615bf490f49c94e671ef2410024e7",
    // ❗ IMPORTANT: Insert your full private key here. Newlines should be escaped (\n).
    private_key: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n", 
    client_email: "firebase-adminsdk-fbsvc@nurture-nerve.iam.gserviceaccount.com",
    client_id: "101505716848548594818",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40nurture-nerve.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
};

// 2. Determine the final configuration object.
// We use the custom interface for the variable that holds the full JSON structure.
let serviceAccount: ServiceAccountJson;
const envConfigString = process.env.FIREBASE_CONFIG;

if (envConfigString) {
    // If the environment variable exists, it is a STRING. We MUST parse it.
    try {
        serviceAccount = JSON.parse(envConfigString);
        console.log("Service Account loaded from FIREBASE_CONFIG environment variable.");
    } catch (error) {
        console.error("Critical Error: Failed to parse FIREBASE_CONFIG JSON string. Using fallback.");
        serviceAccount = FALLBACK_CONFIG;
    }
} else {
    // If the environment variable is missing, use the raw JavaScript object.
    console.warn("FIREBASE_CONFIG environment variable is missing. Using hardcoded fallback.");
    serviceAccount = FALLBACK_CONFIG;
}

// 3. Initialize Firebase, passing the verified JavaScript/TypeScript OBJECT.
// FIX: We use 'as ServiceAccount' type assertion to satisfy the Admin SDK's
// type check, resolving the 'not assignable' error.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

console.log(`Firebase Admin SDK initialized successfully for project: ${serviceAccount.project_id}`);

export default admin;
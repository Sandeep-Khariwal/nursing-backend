import admin from "firebase-admin";

// 1. Get the raw string from the environment variable
console.log("file runing..........");

let serviceAccountString = process.env.FIREBASE_CONFIG || {
  type: "service_account",
  project_id: "nurture-nerve",
  private_key_id: "7286ff37f10615bf490f49c94e671ef2410024e7",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJHuO8xYgX36Rn\n0WBxYAGmErsPeTmp7BKuYZJRX5nNZbVmdmG6boQTX6ACT/RLVXq68wkS9gvrPiCe\nYUK6QIwW+WruySWUSVJ9Hy7+lytFK5qwfjLyudwj1fcofLN4YEASDnWv1dlnKhez\nEHjMMAUHUa6Ol20E8l6TfDazGVWPmJyqPAemitRGZHGs3v8dqLnSQe8bfkM5ZB2i\nI4nPKtnL6XYqoakwDsLEY2XCAcMilWsDnGyStU1HOdbQzrn41xy4z047GIQfvMXc\nb3PUFlqofjCXuqaOLEruXgd4rMNCxE9NYmDIW9vJeASJmHKOsw/CXdszL/q2ShwD\n0kCvEwrXAgMBAAECggEAC1G+PosdiD5xidhKZcciAJ9QQOQxPyOGv6LFMehAB0Pg\nrEYgZPZAX7jDkC3A0ZabhDcWfSc074X9HvzZXRMx7z8VaiAPCeQAjQM6yWBnsops\nN9+6bVfRkIDD2tb94NoF8R44OG/APyKq18ynB9LyDYHm4aabH6qmcQWOLJFR8/Vo\n01iG4wjzuwaP3D/qXJRTQMO5XcbHNk/ZYFsKHph9WX3pEApZgk5gmFmAyVEY+oXe\nWeSYeE/SZ78AUlJFRdOvGBOXjxifoJRsDLKWyPOlzl37vBmK7nKT6QfKFGeU7JBy\nmQ2PCiC+U40LXCd3wDkuSkfbs7Zc6i6Uhl13jiT5SQKBgQDvtjI2Se5Pwlf6uy0U\nm//0ZQxneyhH0lqt4PLHfhMTRbcoAF16nToGLQFXDh4PclJ6yBTUJZjSn7BTQSt6\n4MUaNzpF70SKGyT1x8yREVzWgw+Kw3BFnwCMVDcuxAgMW2Rqre1hOKG1ZHqeGj3Q\nshSse9Jyzdcf7CLNPPJ2CtC5TwKBgQDWyWY23LWWzjjkRRm88Ui59/N7YFWixCOo\nlUNTm0d14IJKa6/Bj/VmBxVbBqDPTaXQfxB4rg3R0oFaqMGAHqHSfp6Z00JQnwP4\nrJa02LItE6T8GAKuZAxQYTDv8VyLlcNoj8K5sUPIeB6vm9HgYeGAW+BTbkLYLxGR\n02b/c3cj+QKBgQCk0yuthqJVt3UVU3TI8gdJ/d1MnjNxRyPQ4ZcuMvNc0hgBalbc\ng5WtP27ndC6ZQmuSP1eLFBsD4Ie2h14lTL5aq1TnV4FSUR3V3j88FKs4WL/sEzx0\nssMGurWC84nxLTpb3CIYMn+GoYNqiPKuOHTcsPtgs0bTjWPUqa6yGfexIwKBgEAC\nd1bEQc22mZfVzAzV73GUplhPZlYClAnqqczhytMjXFDndNJ/n4ePdtrQx93f6xmO\ntI7yeCXe0TP+dOREvL8pgwSew/WY3ise7C7rIXZzk0iZszrbkBvoSxhG2uiycjDY\nHxUN8gBtY9+71TlEklqZhun2Qy+AH4FQ+jII7CmpAoGBAMjD7H0p06dNRwK6HAIo\nveJKGC2l2kxy8Zoj1OJloXNmzne3tZGOr+PA/qn/azFLZpA7FgyzSRT8SJBgOr1j\np+mEAaEtVThvrX6vT26esq4h6YGkgC9JRqh6sUtBB56TUcP/lIZJ3tpINysm+Sig\njHjB9k8jo2oP8Q5mTgg5s3i/\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@nurture-nerve.iam.gserviceaccount.com",
  client_id: "101505716848548594818",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40nurture-nerve.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

serviceAccountString = JSON.stringify(serviceAccountString)

console.log("serviceAccountString : ", serviceAccountString);

// 2. Check if the variable exists (to prevent the "undefined" error)
if (!serviceAccountString) {
  console.error("FIREBASE_CONFIG environment variable is missing.");
  // Throw an error to halt execution if a critical config is missing
  throw new Error(
    "Missing FIREBASE_CONFIG. Check your .env file and deployment environment."
  );
}

// 3. Safely parse the JSON string
const serviceAccount = JSON.parse(serviceAccountString);

// 4. Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;

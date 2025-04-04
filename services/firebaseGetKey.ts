"use server";
interface FirebasePublicKeys {
  [key: string]: string;
}

export async function getFirebasePublicKeys(): Promise<FirebasePublicKeys> {
  const response = await fetch(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Firebase public keys");
  }

  return response.json();
}

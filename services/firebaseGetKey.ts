export async function getFirebasePublicKeys() {
  try {
    const response = await fetch(
      "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
      {
        next: { revalidate: 3600 }, // 1시간마다 캐시 갱신
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch public keys");
    }

    return response.json();
  } catch (error) {
    console.error("공개 키 가져오기 실패:", error);
    throw error;
  }
}

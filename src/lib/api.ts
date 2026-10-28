
export const API_BASE_URL = "http://localhost:3100/api/v1";

export async function uploadArticleImage(
  file: File,
  token: string
): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/media/images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "آپلود تصویر ناموفق بود");
  }

  return `${API_BASE_URL.replace("/api/v1", "")}${result.data.url}`;
}

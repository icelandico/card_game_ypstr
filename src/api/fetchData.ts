export interface IApiResponse<T> {
  data: T,
  error?: Error,
  success?: boolean;
}

export const fetchData = async <T>(url: string, options = {}): Promise<IApiResponse<T>> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { success: false, error };
  }
};
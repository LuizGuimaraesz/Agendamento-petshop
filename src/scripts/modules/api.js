const apiUrl = "http://localhost:3000";

// Função para buscar os agendamentos da API
export async function getSchedules() {
  try {
    const response = await fetch(`${apiUrl}/schedules`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

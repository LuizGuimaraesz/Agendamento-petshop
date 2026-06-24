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
    alert("Não foi possível listar os agendamentos.");
    return [];
  }
}

// Função para adicionar um novo agendamento
export async function newSchedule(scheduleData) {
  try {
    const response = await fetch(`${apiUrl}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduleData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating schedule:", error);
    alert("Não foi possível salvar o agendamento.");
    return null;
  }
}

export async function deleteSchedule(id) {
  try {
    if (!confirm("Tem certeza que deseja remover este agendamento?")) {
      return false;
    }
    const response = await fetch(`${apiUrl}/schedules/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting schedule:", error);
    alert("Não foi possível remover o agendamento.");
    return false;
  }
}

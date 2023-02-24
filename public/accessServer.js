// get tasks array from server
export const getDataFromServer = async (end) => {
  let response;
  try {
    response = await fetch('http://127.0.0.1:8080' + end, {
      method: 'get',
    });
  } catch(error) {
    return null;
  }

  return await response.json();
}

// get clients from server
export const getClientsFromServer = async () => {
  return await getDataFromServer('/clients');
}

// get tasks from server
export const getTasksFromServer = async () => {
  return await getDataFromServer('/tasks');
}
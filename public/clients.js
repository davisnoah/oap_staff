// get clients array from server
export const getClientsFromServer = async () => {
  let response;
  try {
    response = await fetch('http://localhost:8080/clients', {
      method: 'get',
    });
  } catch(error) {
    return null;
  }

  return await response.json();
}
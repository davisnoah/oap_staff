// get clients array from server
export const getClientsFromServer = async () => {
  let response;
  try {
    response = await fetch('http://127.0.0.1:8080/clients', {
      method: 'get',
    });
  } catch(error) {
    return null;
  }

  return await response.json();
}
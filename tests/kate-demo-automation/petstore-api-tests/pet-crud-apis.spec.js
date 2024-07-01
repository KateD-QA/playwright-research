const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const baseUrl = 'https://petstore.swagger.io/v2';

test('Create a new pet record with valid data using POST addPet API', async () => {
  // Pass new pet details into parameters for add new Pet API
  const createPetResponse = await fetch(`${baseUrl}/pet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 88, // Normally, would leave this as '0', Assuming ID is auto-generated as PK
      name: 'Pebbles',
      status: 'available',
    }),
  });
  // Check the response message returns same data sent in request
  const createdPet = await createPetResponse.json();
  expect(createPetResponse.status).toBe(200);
  expect(createdPet.name).toBe('Pebbles');
  expect(createdPet.status).toBe('available');
});

  test('Retrive an existing Pet record using GET getPetById API', async () => {
  const getPetResponse = await fetch(`${baseUrl}/pet/1`, {
    method: 'GET',
  });
  // Check the response message returns same data sent in request
  const retrievedPet = await getPetResponse.json();
  expect(getPetResponse.status).toBe(200);
  expect(retrievedPet.name).toBe('doggie');
  expect(retrievedPet.status).toBe('available');
});


test('Attempt to retrive a non-existent Pet record using GET getPetById API', async () => {
    const getPetResponse = await fetch(`${baseUrl}/pet/16`, {
      method: 'GET',
    });
    // Check the response message returns expected error message
    const retrievedPet = await getPetResponse.json();
    expect(getPetResponse.status).toBe(404);
    expect(retrievedPet.message).toBe('Pet not found');
  });


test('Update a valid existing Pet using PUT updatePet API', async () => {
  const updatedPetResponse = await fetch(`${baseUrl}/pet`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 88,
      name: 'Pebbles Junior',
      status: 'unavailable',
    }),
  });
  // Check the response message returns same data sent in request
  const updatedPet = await updatedPetResponse.json();
  expect(updatedPetResponse.status).toBe(200);
  expect(updatedPet.name).toBe('Pebbles Junior');
  expect(updatedPet.status).toBe('unavailable');
});


test('Delete an existing Pet with DELETE deletePet API', async () => {
  const deletePetResponse = await fetch(`${baseUrl}/pet/88`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'api_key':'special-key'} //In reality I would definately not declare an auth key like this!
  });
  expect(deletePetResponse.status).toBe(200);
  // Verify this pet was actually removed from Petstore records
  const verifyDeleteResponse = await fetch(`${baseUrl}/pet/88`, {
    method: 'GET',
  });
  expect(verifyDeleteResponse.status).toBe(404);
});


test('Delete an invalid Pet with DELETE deletePet API', async () => {
    const deletePetResponse = await fetch(`${baseUrl}/pet/89`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'api_key':'special-key'}
    });
    expect(deletePetResponse.status).toBe(404);
  });

  

const API_BASE_URL = 'https://c4-mobile-api.tafeit.com';

export async function createUser(userData: {
  fullName: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  deactivated: boolean;
}) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log('User error:', response.status, errorText);
    throw new Error('Unable to create user');
  }

  return response.json();
}

export async function createRegistration(registrationData: {
  eventId: number;
  userId: number;
  name: string;
  email: string;
  phone: string;
}) {
  const response = await fetch(`${API_BASE_URL}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registrationData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log('Registration error:', response.status, errorText);
    throw new Error('Unable to create registration');
  }

  return response.json();
}
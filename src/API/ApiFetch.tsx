import {response} from './api';

export const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjZiZjU0ZDBjNjI5M2Q5MjBkNzEyZSIsImlhdCI6MTcxNDYzNDI3NH0.joB4xOSvP0Vy3zl1gSL9yXxVDHQdwEJw-AfLynlDMr4';
export const ApiFetch = {
  GET: async (url: string): Promise<response> => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const resjson = await res.json();

    return resjson;
  },
};

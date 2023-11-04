type UserInfo = {
  email: string;
  nickname: string;
  sub: string;
};

const addNewUser = async (user: UserInfo) => {
  const body = {
    email: user.email,
    username: user.nickname,
    user_id: user.sub,
  };

  try {
    const response = await fetch('http://localhost:8080/client/new-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding new user:', error);
    // Optionally re-throw the error if you want calling code to be able to catch it too
    // throw error;
  }
};

export default addNewUser;

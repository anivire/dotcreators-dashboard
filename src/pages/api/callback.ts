import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { accessToken, refreshToken, expiresIn } = req.body;

  if (!accessToken || !refreshToken || !expiresIn) {
    console.log('Error');
    return res.status(400).json({
      message: 'Access token, refresh token and expires time are required',
    });
  }

  let isPass = false;

  try {
    const response = await fetch(`${process.env.API_URL}auth/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.response === true) isPass = true;
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error('An error occurred while user verification:', error);
  }

  if (!isPass) {
    console.log('Error');
    return res.status(400).json({
      message: 'User is not admin.',
    });
  }

  console.log('Tokens received');

  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  };

  const cookieAccessToken = serialize('accessToken', accessToken, options);
  const cookieRefreshToken = serialize('refreshToken', refreshToken, options);
  const cookieExpiresIn = serialize('expiresIn', expiresIn, options);

  res.setHeader('Set-Cookie', [
    cookieAccessToken,
    cookieRefreshToken,
    cookieExpiresIn,
  ]);

  res.status(200).json({ message: 'Successfully set cookies!' });
}

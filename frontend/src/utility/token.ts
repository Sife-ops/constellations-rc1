let accessToken: string = "";

export const getAccessToken = (): string => {
  return accessToken;
};

export const setAccessToken = (newAccessToken: string): string => {
  accessToken = newAccessToken;
  return accessToken;
};

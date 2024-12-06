export interface LoginFormType {
  email: string;
  password: string;
}

export interface UserType {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  providerData: ProviderDataType[];
  stsTokenManager: StsTokenManagerType;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

export interface ProviderDataType {
  providerId: string;
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string;
}

export interface StsTokenManagerType {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

export interface TokenResponseType {
  federatedId: string;
  providerId: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  fullName: string;
  lastName: string;
  photoUrl: string;
  localId: string;
  displayName: string;
  idToken: string;
  context: string;
  oauthAccessToken: string;
  oauthExpireIn: number;
  refreshToken: string;
  expiresIn: string;
  oauthIdToken: string;
  rawUserInfo: string;
  kind: string;
}

export interface LoginResponseType {
  user: UserType;
  providerId: string;
  _tokenResponse: TokenResponseType;
  operationType: string;
}

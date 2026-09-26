import { SessionUser } from './session-user.interface';

export interface LoginRequest {
  email: string;
  password: string;
}

// TODO(back): confirmar contrato de la respuesta del login.
export interface AuthResponse {
  token: string;
  roles: string[];
  user: SessionUser;
}

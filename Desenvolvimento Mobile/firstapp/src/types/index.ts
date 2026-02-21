/**
 * Tipos TypeScript globais da aplicação
 */

// Exemplo de tipo para um serviço
export interface IService {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  imageUri?: string;
}

export type ServiceCategory = 'plumber' | 'electrician' | 'locksmith' | 'other';

// Exemplo de tipo para usuario
export interface IUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
}

// Exemplo de tipo para chamado
export interface ICall {
  id: string;
  userId: string;
  serviceCategory: ServiceCategory;
  description: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  status: CallStatus;
}

export type CallStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

/**
 * Funções de formatação
 */

/**
 * Formata um número de telefone para padrão brasileiro
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

/**
 * Formata uma data para formato brasileiro
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR');
};

/**
 * Formata uma data e hora
 */
export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('pt-BR');
};

/**
 * Converte uma moeda para formato brasileiro
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export interface User {
  id: string;
  role: 'admin' | 'barbeiro' | 'cliente';
  nome: string;
  email: string;
  telefone?: string;
  senha_hash?: string;
  barbearia_id?: string;
  status: 'ativo' | 'inativo' | 'suspenso';
  created_at: string;
  updated_at: string;
}

export interface Barbearia {
  id: string;
  nome: string;
  slug: string;
  logo?: string;
  bio?: string;
  endereco?: string;
  whatsapp?: string;
  cores?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  plano_id: string;
  plano_expira_em: string;
  fotos?: string[];
  created_at: string;
  updated_at: string;
}

export interface Barbeiro {
  id: string;
  user_id: string;
  barbearia_id: string;
  nome?: string;
  ativo: boolean;
  especialidades?: string[];
  foto?: string;
  created_at: string;
  updated_at: string;
}

export interface Servico {
  id: string;
  barbearia_id: string;
  nome: string;
  preco: number;
  duracao_min: number;
  buffer_min: number;
  descricao?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Horario {
  id: string;
  barbearia_id: string;
  turnos: {
    [key: string]: {
      inicio: string;
      fim: string;
      ativo: boolean;
    };
  };
  excecoes: {
    data: string;
    tipo: 'bloqueio' | 'feriado' | 'personalizado';
    turnos?: any;
  }[];
  created_at: string;
  updated_at: string;
}

export interface Agendamento {
  id: string;
  barbearia_id: string;
  barbeiro_id: string;
  cliente_id: string;
  servico_id: string;
  inicio: string;
  fim: string;
  status: 'pending' | 'confirmed' | 'canceled' | 'no_show' | 'completed';
  notas?: string;
  valor?: number;
  created_at: string;
  updated_at: string;
}

export interface Cliente {
  id: string;
  user_id?: string;
  barbearia_id: string;
  nome: string;
  telefone?: string;
  email?: string;
  tags?: string[];
  notas?: string;
  ultimo_agendamento?: string;
  total_agendamentos: number;
  created_at: string;
  updated_at: string;
}

export interface Produto {
  id: string;
  barbearia_id: string;
  nome: string;
  preco: number;
  estoque?: number;
  foto_url?: string;
  descricao?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  autor_user_id: string;
  barbearia_id: string;
  categoria: 'tecnico' | 'financeiro' | 'geral' | 'bug';
  titulo: string;
  descricao: string;
  status: 'aberto' | 'em_atendimento' | 'resolvido' | 'fechado';
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  anexos?: string[];
  respostas: {
    id: string;
    autor_id: string;
    mensagem: string;
    created_at: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface NotificacaoWhatsApp {
  id: string;
  agendamento_id: string;
  tipo: 'confirmacao' | 'lembrete_24h' | 'lembrete_2h' | 'remarcacao' | 'cancelamento' | 'avaliacao';
  status: 'pendente' | 'enviado' | 'entregue' | 'lido' | 'erro';
  log?: string;
  tentativas: number;
  created_at: string;
  updated_at: string;
}

export interface Plano {
  id: string;
  nome: string;
  preco: number;
  ciclo: 'mensal' | 'anual';
  recursos: string[];
  limite_barbeiros?: number;
  limite_agendamentos?: number;
  status: 'ativo' | 'inativo';
  created_at: string;
  updated_at: string;
}

export interface WhatsAppConfig {
  id: string;
  barbearia_id: string;
  tipo: 'qr_session' | 'cloud_api';
  configuracao: any;
  status: 'conectado' | 'desconectado' | 'erro';
  ultimo_teste?: string;
  created_at: string;
  updated_at: string;
}

// Tipos para componentes
export interface TimeSlot {
  time: string;
  available: boolean;
  barbeiro_id?: string;
  barbeiro_nome?: string;
}

export interface DaySchedule {
  date: string;
  slots: TimeSlot[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface BookingContextType {
  selectedService: Servico | null;
  selectedBarbeiro: Barbeiro | null;
  selectedDate: string | null;
  selectedTime: string | null;
  setSelectedService: (service: Servico | null) => void;
  setSelectedBarbeiro: (barbeiro: Barbeiro | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  resetBooking: () => void;
}
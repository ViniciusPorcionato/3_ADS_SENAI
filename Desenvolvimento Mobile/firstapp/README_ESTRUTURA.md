# SOS Manutenção - Estrutura do Projeto

## 📁 Estrutura de Pastas

```
firstapp/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   └── index.ts
│   │
│   ├── screens/            # Telas da aplicação
│   │   ├── HomeScreen.tsx
│   │   └── index.ts
│   │
│   ├── navigation/         # Configuração de navegação
│   │   └── (a ser implementado)
│   │
│   ├── constants/          # Constantes da aplicação
│   │   ├── colors.ts       # Paleta de cores
│   │   ├── typography.ts   # Estilos de texto
│   │   ├── spacing.ts      # Sistema de espaçamento
│   │   └── index.ts
│   │
│   ├── styles/             # Estilos globais
│   │   └── commonStyles.ts # Estilos comuns reutilizáveis
│   │
│   ├── services/           # Serviços (API, autenticação, etc)
│   │   ├── api.ts          # Cliente HTTP
│   │   └── index.ts
│   │
│   ├── types/              # Tipos TypeScript globais
│   │   └── index.ts
│   │
│   ├── utils/              # Funções utilitárias
│   │   ├── validators.ts   # Validações
│   │   ├── formatters.ts   # Formatações
│   │   └── index.ts
│   │
│   └── contexts/           # Context API
│       ├── AuthContext.tsx # Contexto de autenticação
│       └── index.ts
│
├── assets/                 # Imagens e recursos
├── App.tsx                 # Componente raiz
├── app.json               # Configuração do Expo
└── package.json           # Dependências
```

## 🎨 Paleta de Cores

- **Vermelho Escuro (Primary)**: `#8B0000` - Cores de ação principais
- **Vermelho Muito Escuro (Primary Dark)**: `#4d0000` - Headers e backgrounds
- **Branco**: `#FFFFFF` - Backgrounds e textos
- **Preto**: `#000000` - Textos principais
- **Cinza Escuro**: `#1a1a1a` - Backgrounds alternativos
- **Cinza Médio**: `#4a4a4a` - Textos secundários
- **Cinza Claro**: `#e0e0e0` - Borders e divisores

## 📝 Descrição das Pastas

### `/components`
Componentes React Native reutilizáveis como Button, Card, Input, etc.

### `/screens`
As telas principais da aplicação (HomeScreen, LoginScreen, ProfileScreen, etc)

### `/navigation`
Configuração de rotas e navegação (React Navigation)

### `/constants`
Valores constantes como cores, fontes, espaçamentos que são reutilizados em todo o app

### `/styles`
Estilos globais e reutilizáveis que são aplicados em múltiplos componentes

### `/services`
Serviços da aplicação como:
- API Client (requisições HTTP)
- Autenticação
- Localização
- Notificações Push

### `/types`
Definição de tipos e interfaces TypeScript globais

### `/utils`
Funções utilitárias como:
- Validadores (email, telefone, etc)
- Formatadores (data, moeda, telefone)
- Helpers

### `/contexts`
Context API para estado global como:
- Autenticação
- Tema
- Usuário

## 🚀 Como Usar

1. Importe componentes do `/components`:
```tsx
import { Button } from '../components';
```

2. Use as constantes de cores e espaçamento:
```tsx
import { COLORS, SPACING } from '../constants';
```

3. Importe tipos quando necessário:
```tsx
import { IUser, ICall } from '../types';
```

4. Use contextos para estado global:
```tsx
import { useAuth } from '../contexts';
const { user, login } = useAuth();
```

## ✨ Próximos Passos

- [ ] Configurar React Navigation
- [ ] Implementar autenticação
- [ ] Criar telas de login/signup
- [ ] Implementar chamadas de serviço
- [ ] Adicionar mapa para localização
- [ ] Integração com backend API

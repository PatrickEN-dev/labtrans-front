# LabTrans UFSC - Sistema de Autenticação (SPA)

Sistema web moderno configurado como Single Page Application (SPA) para o Laboratório de Transportes e Logística da UFSC. Desenvolvido para funcionar com back-end separado e deploy no Vercel.

## ✨ Arquitetura

### 🏗️ **Configuração SPA**

- **Next.js com Export Estático** - Aplicação totalmente client-side
- **API Externa** - Comunicação com back-end via REST API
- **Deploy no Vercel** - Como site estático com roteamento client-side
- **Separação de Responsabilidades** - Front-end independente do back-end

### 🔗 **Integração com Backend**

- **API Service** configurado para comunicação com servidor externo
- **Variáveis de ambiente** para URLs da API
- **Autenticação por Token** com armazenamento local
- **Headers customizáveis** para todas as requisições

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação

- **Login/Registro** - Formulários com validação completa
- **Recuperação de Senha** - Sistema via email
- **Autenticação Social** - Preparado para Google/GitHub
- **Gestão de Tokens** - Armazenamento e renovação automática

### 🎨 Design & UX

- **Interface Moderna** - Design "instagramável" e profissional
- **Responsive** - Adaptado para todos os dispositivos
- **Dark Mode** - Suporte automático
- **Notificações** - Feedback visual com toast messages

## 🛠️ Instalação e Configuração

### 1. **Instalar Dependências**

```bash
npm install
```

### 2. **Configurar Variáveis de Ambiente**

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite com suas configurações
# NEXT_PUBLIC_API_URL=https://sua-api.com/api
```

### 3. **Executar em Desenvolvimento**

```bash
npm run dev
```

### 4. **Build para Produção**

```bash
npm run build
```

### 5. **Servir Localmente (Simulando Vercel)**

```bash
npm run serve
```

## 🔧 Estrutura do Projeto

```
app/
├── login/               # Página de login
├── register/           # Página de cadastro
├── forgot-password/    # Recuperação de senha
├── page.tsx           # Landing page
└── layout.tsx         # Layout global

lib/
├── auth-schemas.ts    # Schemas Zod para validação
├── auth-service.ts    # Serviços de autenticação
└── api-config.ts      # Configuração da API

out/                   # Build estático (gerado)
```

## 🌐 Configuração da API

### Variáveis de Ambiente (.env.local)

```bash
# URL base da sua API
NEXT_PUBLIC_API_URL=https://api.labtrans.ufsc.br

# Endpoints específicos (opcionais)
NEXT_PUBLIC_AUTH_LOGIN_URL=/auth/login
NEXT_PUBLIC_AUTH_REGISTER_URL=/auth/register
NEXT_PUBLIC_AUTH_FORGOT_PASSWORD_URL=/auth/forgot-password
```

### Estrutura Esperada da API

```typescript
// POST /auth/login
{
  "email": "user@example.com",
  "password": "password123",
  "remember": true
}

// Resposta esperada
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": "123",
      "name": "João Silva",
      "email": "joao@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

## 🚀 Deploy no Vercel

### 1. **Método Automático (Recomendado)**

```bash
# Conecte seu repositório GitHub ao Vercel
# O deploy será automático a cada push
```

### 2. **Método Manual**

```bash
# Instale a CLI do Vercel
npm i -g vercel

# Faça deploy
vercel --prod
```

### 3. **Configuração no Vercel**

- **Framework Preset**: Next.js
- **Output Directory**: Deixe vazio (Next.js detecta automaticamente)
- **Build Command**: `npm run build`
- **Environment Variables**: Adicione suas variáveis de API

## ⚙️ Scripts Disponíveis

- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Build para produção (gera SPA)
- `npm run serve` - Serve arquivos estáticos localmente
- `npm run lint` - Executa linting do código

## 🔒 Autenticação

### **Como Funciona**

1. Usuário faz login → Recebe JWT token
2. Token é armazenado no localStorage (se "lembrar")
3. Token é enviado no header Authorization em todas as requisições
4. Back-end valida token e retorna dados

### **Gerenciamento de Estado**

```typescript
// Verificar se está logado
AuthService.isAuthenticated();

// Obter dados do usuário
AuthService.getCurrentUser();

// Fazer logout
AuthService.logout();
```

## 🚨 Considerações Importantes

### **Vantagens da Configuração SPA**

- ✅ Deploy simples e barato no Vercel
- ✅ Escala globalmente via CDN
- ✅ Front-end totalmente independente do back-end
- ✅ Ideal para APIs REST/GraphQL existentes
- ✅ Performance excelente após carregamento inicial

### **Limitações**

- ❌ Sem SEO dinâmico (todas as páginas têm mesmo meta)
- ❌ Carregamento inicial pode ser mais lento
- ❌ JavaScript obrigatório no cliente

## 🔮 Próximos Passos

- [ ] **Implementar autenticação social real**
- [ ] **Adicionar interceptors de request/response**
- [ ] **Implementar refresh token automático**
- [ ] **Adicionar sistema de roles/permissões**
- [ ] **Configurar PWA (Progressive Web App)**
- [ ] **Implementar cache de dados**

## 👥 Desenvolvimento

Para contribuir com o projeto:

1. Clone o repositório
2. Configure suas variáveis de ambiente (.env.local)
3. Execute `npm run dev`
4. Desenvolva suas features
5. Teste com `npm run build` e `npm run serve`
6. Abra um Pull Request

## 📄 Licença

Projeto desenvolvido para uso acadêmico do LabTrans UFSC.

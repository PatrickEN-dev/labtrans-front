# LabTrans UFSC - Sistema de Agendamento

Sistema web moderno e elegante para o Laboratório de Transportes e Logística da UFSC, desenvolvido com Next.js 15, React Hook Form, Zod e Shadcn/ui.

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação ( apenas visual ) 

- **Página de Login** (`/login`) - Interface elegante com validação completa
- **Página de Cadastro** (`/register`) - Formulário de registro com validação de senha forte
- **Recuperação de Senha** (`/forgot-password`) - Sistema para redefinir senha via email
- **Validação com Zod** - Schemas robustos para validação de dados
- **React Hook Form** - Formulários performáticos com validação em tempo real

### 🎨 Design Moderno

- **Shadcn/ui Components** - Biblioteca de componentes moderna e acessível
- **Tailwind CSS** - Estilização responsiva e customizável
- **Gradientes e Animações** - Visual "instagramável" e profissional
- **Dark Mode Support** - Tema escuro automático
- **Responsive Design** - Adaptado para todos os dispositivos

### 🚀 Experiência do Usuário

- **Login Opcional** - Acesso livre à página principal sem obrigatório
- **Autenticação Social** - Botões para Google e GitHub (prontos para implementação)
- **Feedback Visual** - Notificações toast com Sonner
- **Loading States** - Estados de carregamento em todas as ações
- **Acessibilidade** - Componentes acessíveis por padrão

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário
- **Shadcn/ui** - Biblioteca de componentes
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação e parsing de esquemas
- **Sonner** - Notificações toast
- **React Icons** - Biblioteca de ícones
- **Lucide React** - Ícones modernos

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

## 🎯 Páginas Disponíveis

### 🏠 Página Principal (`/`)

- Landing page do LabTrans UFSC
- Links para login e cadastro
- Informações sobre o laboratório
- Acesso opcional (não obrigatório fazer login)

### 🔑 Autenticação (apenas visual )

- **Login**: `/login` - Tela de entrada com email/senha
- **Cadastro**: `/register` - Formulário de criação de conta
- **Esqueceu a Senha**: `/forgot-password` - Recuperação de senha

## 🔧 Estrutura de Arquivos

```
app/
├── login/page.tsx          # Página de login
├── register/page.tsx       # Página de cadastro
├── forgot-password/page.tsx # Recuperação de senha
├── page.tsx               # Página principal
├── layout.tsx             # Layout global com Toaster
└── globals.css            # Estilos globais

lib/
└── auth-schemas.ts        # Schemas Zod para validação

components/
└── ui/                    # Componentes Shadcn/ui
```

## 🎨 Schemas de Validação

### Login Schema

```typescript
{
  email: string (email válido, obrigatório)
  password: string (mínimo 6 caracteres)
  remember: boolean (opcional)
}
```

### Registro Schema

```typescript
{
  name: string (mínimo 2 caracteres)
  email: string (email válido, obrigatório)
  password: string (forte: maiúscula, minúscula, número)
  confirmPassword: string (deve coincidir)
  terms: boolean (deve ser true)
}
```

## 🔮 Próximos Passos

- [ ] Implementar autenticação real (Firebase, Auth0, etc.)
- [ ] Adicionar autenticação social (Google, GitHub)
- [ ] Implementar sistema de roles e permissões
- [ ] Adicionar verificação de email
- [ ] Criar dashboard pós-login
- [ ] Implementar 2FA (Two-Factor Authentication)

## 🎨 Personalização

O design foi criado pensando no visual "instagramável" solicitado:

- **Gradientes modernos** em azul/índigo (login) e verde/esmeralda (cadastro)
- **Cards com backdrop blur** para efeito glassmorphism
- **Animações suaves** com hover effects
- **Tipografia elegante** com gradientes em texto
- **Ícones contextuais** para melhor UX
- **Feedback visual** com estados de loading e notificações

## 👥 Contribuição

Este projeto foi desenvolvido para o LabTrans UFSC. Para contribuições:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Projeto desenvolvido para uso acadêmico do LabTrans UFSC.

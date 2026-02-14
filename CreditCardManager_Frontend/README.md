# Credit Card Manager - Frontend

Aplicação frontend moderna para gerenciamento completo de cartões de crédito, seja para uso pessoal ou compartilhado entre múltiplos usuários. Organize suas dívidas, acompanhe despesas e mantenha registros estruturados de todas as transações.

## Sobre o Projeto

O Credit Card Manager oferece uma solução intuitiva e responsiva para controlar faturas de cartões de crédito com suporte a compartilhamento de cartões, gerenciamento de dívidas e rastreamento detalhado de despesas.

### Gerenciamento de Usuários
- **Cadastro de Usuários**: Crie novas contas com informações pessoais;
- **Autenticação Segura**: Login com tokens JWT para sessões seguras;
- **Controle de Perfil**: Visualize e atualize informações de usuário;
- **Logout Seguro**: Finalização de sessão com limpeza de tokens.

### Gerenciamento de Cartões de Crédito
- **Criar Cartões**: Registre novos cartões com limite e informações bancárias;
- **Visualizar Detalhes**: Acesse informações completas de cada cartão;
- **Acompanhar Saldo**: Visualize limite disponível e saldo utilizado;
- **Selecionar Cartão Ativo**: Escolha qual cartão gerenciar em tempo real.

### Compartilhamento de Cartões
- **Adicionar Usuários**: Inclua múltiplos usuários em um único cartão;
- **Gerenciar Usuários**: Remova ou atualize usuários associados;
- **Controle de Permissões**: Apenas proprietários podem gerenciar usuários.

### Controle de Dívidas e Despesas
- **Registrar Despesas**: Crie novas dívidas com descrição, valor e data;
- **Acompanhar Status**: Visualize quais despesas estão pendentes ou pagas;
- **Editar Dívidas**: Corrija informações de despesas registradas;
- **Marcar como Paga**: Registre o pagamento de dívidas;
- **Histórico de Dívidas**: Consulte todas as despesas com filtros por cartão;
- **Cálculo Automático**: Soma de dívidas atualizada em tempo real.

### Autorização e Segurança
- **Controle em Cascata**: Apenas proprietários de cartões podem gerenciar usuários e dívidas;
- **Proteção por Autenticação**: Todas as operações são protegidas por JWT;
- **Validação de Dados**: Verificação de entrada em formulários e na API.

### Interface e Experiência
- **Design Responsivo**: Totalmente adaptável para desktop, tablet e mobile;
- **Tema Claro/Escuro**: Alterne entre temas de acordo com preferência;
- **Componentes Reutilizáveis**: Arquitetura modular e escalável;
- **Navegação Intuitiva**: Interface clara e fácil de usar.

## Tecnologias Utilizadas

- **React JS**: Framework JavaScript para interfaces dinâmicas;
- **TypeScript**: Tipagem estática para maior segurança;
- **Vite**: Bundler moderno e rápido;
- **Tailwind CSS**: Framework CSS utilitário para estilos responsivos;
- **Axios**: Cliente HTTP para requisições à API;
- **Lucide React**: Biblioteca de ícones SVG;
- **React Context API**: Gerenciamento de estado global (autenticação e tema).

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com usando React + TypeScript**

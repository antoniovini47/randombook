## RandomBook - A face-book but with random data

Uma simples aplicação para demonstração do consumo de uma API pública https://randomuser.me/ utilizando **Typescript, Next.js (App Router), Tailwind CSS, ShadCN, React Query e Axios**.

---

## Comentário para o teste técnico:

Durante toda a aplicação busque EXATAMENTE por:

```
/* Comentário para o teste técnico:
```

Haverão comentários sobre cada código e meu raciocínio por trás dele.

#### Uso de Git (GitFlow):

Utilizei do **GitFlow** durante toda a implementação do projeto, para fins de demonstração.
Pode-se consultar o histórico das branches main, develop e as de features para exemplos.

#### Continuous Deploy usando Vercel (CD):

A branch **main** está como **production** configurada em https://randombook.rotec.dev/
A branch **develop** está como **preview** configurada em https://staging.rotec.dev/

---

## Como instalar

###### Clone o repositório:

```
git clone https://github.com/antoniovini47/randombook.git
```

###### Entre na pasta:

```
cd ./randombook
```

###### Configure as variáveis de ambiente em um arquivo **.env** baseado no arquivo **.env.example**:

```
NEXT_PUBLIC_RANDOM_USER_BASE_URL=https://randomuser.me/api/
```

###### Instale as dependências:

```
pnpm i
```

###### Rode a aplicação:

```
pnpm dev
```

###### Acesse:

```
http://localhost:3000
```

---

## Ou teste online (production) em:

##### Domínio Próprio - https://randombook.rotec.dev/

##### Vercel Deploy - https://randombook-nine.vercel.app/

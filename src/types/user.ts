/* Comentário para o teste técnico: 
Aqui quis demonstrar um pouco sobre a tipagem do TypeScript,
como podemos tipar uma requisição de API,
e como podemos criar um tipo para o retorno dela.

Além de usar um tipo dentro do outro, para reutilização de tipos.

Tudo isso pra facilitar a manutenção e o entendimento do código.
Evitando o uso de "any"

Alguns tipos foram declarados opcionais com o "?" para facilitar a leitura do código e
controle de erros.

Esses foram gerados diretamente com base na documentação da API do RandomUser.me.
No searchParams eu optei por já aproveitá-lo para tipar os parametros da busca por nome
*/

export type User = {
  gender?: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location?: {
    street?: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode?: string;
    coordinates?: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login?: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered?: {
    date: string;
    age: number;
  };
  phone?: string;
  cell?: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

export type RandomUserResponse = {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};

type IncludeExcludePossibleFields = keyof User;

export type SearchParams = {
  name?: string;
  results?: number;
  page?: number;
  seed?: string;
  inc?: IncludeExcludePossibleFields[];
  exc?: IncludeExcludePossibleFields[];
};

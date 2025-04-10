/* Comentário para o teste técnico: 
Aqui fiz somente um arquivo para demonstrar onde colocaria funções utilitárias,
o exemplo foi para função de formatar data e calcular dias desde o último aniversário.

E a reutilização da função para mostrar ou não a data desde o último aniversário.

Não me preocupei muito em fazer algo mais complexo e bem profissional,
apenas algo que funcionasse para o teste.
*/

function transformForTwoDigits(value: number) {
  if (value <= 9) {
    return `0${value}`;
  }
  return value;
}

function printDaysSinceLastBirthday(birthDate: string) {
  const birthDateObject = new Date(birthDate);
  const today = new Date();
  const currentYear = today.getFullYear();
  const lastBirthday = new Date(currentYear, birthDateObject.getMonth(), birthDateObject.getDate());

  if (today < lastBirthday) {
    lastBirthday.setFullYear(currentYear - 1);
  }

  const diffTime = Math.abs(today.getTime() - lastBirthday.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${transformForTwoDigits(diffDays)} days since last birthday`;
  } else if (diffDays < 90) {
    const diffWeeks = Math.floor(diffDays / 7);
    return `${transformForTwoDigits(diffWeeks)} weeks since last birthday`;
  } else {
    const diffMonths = Math.floor(diffDays / 30);
    return `${transformForTwoDigits(diffMonths)} months since last birthday`;
  }
}

function formatBirthDate({
  date,
  showDaysSinceLastBirthday,
}: {
  date: string;
  showDaysSinceLastBirthday?: boolean;
}) {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return `${transformForTwoDigits(day)}/${transformForTwoDigits(month)}/${year}${
    showDaysSinceLastBirthday ? `, ${printDaysSinceLastBirthday(date)}` : ""
  }`;
}

export default formatBirthDate;

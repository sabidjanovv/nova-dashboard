// src/utils/extensions.ts
export {}; // Global declare uchun shart

declare global {
  interface String {
    plateNumberFormat(): string;
    telFormat(): string;
    dateFormat(): string;
    timeFormat(): string;
  }

  interface Number {
    reduceNumber(): string;
  }
}

Number.prototype.reduceNumber = function (this: number): string {
  const num = this;
  if (num >= 1_000_000_000) return `${+(num / 1_000_000_000).toFixed(1)} mlrd`;
  if (num >= 1_000_000) return `${+(num / 1_000_000).toFixed(1)} mln`;
  if (num >= 1_000) return `${+(num / 1_000).toFixed(1)} min`;
  return `${num}`;
};

String.prototype.plateNumberFormat = function (this: string): string {
  return this.replace(
    /(?<=[A-Za-z])(?=\d)|(?<=\d)(?=[A-Za-z])/g,
    " "
  ).toUpperCase();
};

String.prototype.telFormat = function (this: string): string {
  return this.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
};

String.prototype.dateFormat = function (this: string): string {
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  const dateObj = new Date(this);
  if (isNaN(dateObj.getTime())) return this.toString();

  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day}-${month}. ${year}`;
};

String.prototype.timeFormat = function (this: string): string {
  const dateObj = new Date(this);
  if (isNaN(dateObj.getTime())) return this.toString();

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

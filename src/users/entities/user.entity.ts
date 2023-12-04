export class User {
  id: string;
  company_name: string;
  fantasy_name: string;
  cnpj: string;
  local: number;
  opening_date: string;
  active: number;
  hash_password: string;

  checkPassword(): boolean {
    return false;
  }

  getUserSpecialties(): any[] {
    return [];
  }
}

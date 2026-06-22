import bcrypt from "bcryptjs";

class Bcrypt {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
  async compare(password: string, encryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}

export const BcryptInstance = new Bcrypt();
export default BcryptInstance;

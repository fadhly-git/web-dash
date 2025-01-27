import forge from 'node-forge';

class EncryptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EncryptionError';
  }
}

export const generateRsaKeyPair = (): { publicKey: string; privateKey: string } => {
  try {
    if (!forge || !forge.pki || !forge.pki.rsa) {
      throw new EncryptionError('Cryptographic library not properly initialized');
    }
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    return {
      publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
      privateKey: forge.pki.privateKeyToPem(keypair.privateKey)
    };
  } catch (error) {
    throw new EncryptionError(`Failed to generate key pair: ${error}`);
  }
};

export const encryptPassword = (password: string, publicKeyPem: string): string => {
  try {
    if (!password || !publicKeyPem) {
      throw new EncryptionError('Password and public key are required');
    }
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(password, 'RSA-OAEP');
    return forge.util.encode64(encrypted);
  } catch (error) {
    throw new EncryptionError(`Encryption failed: ${error}`);
  }
};

export const decryptPassword = (encryptedPassword: string, privateKeyPem: string): string => {
  try {
    if (!encryptedPassword || !privateKeyPem) {
      throw new EncryptionError('Encrypted password and private key are required');
    }
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const decoded = forge.util.decode64(encryptedPassword);
    const decrypted = privateKey.decrypt(decoded, 'RSA-OAEP');
    return decrypted;
  } catch (error) {
    throw new EncryptionError(`Decryption failed: ${error}`);
  }
};
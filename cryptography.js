const crypto = require('crypto');

// Generate a random secret key
const key = crypto.randomBytes(32);

// Initialize the cipher
const cipher = crypto.createCipheriv('aes-256-gcm', key, Buffer.alloc(16));

// Encrypt the data
const data = Buffer.from('hello world');
let ciphertext = cipher.update(data);
ciphertext = Buffer.concat([ciphertext, cipher.final()]);
const tag = cipher.getAuthTag();

// Decrypt the data
const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.alloc(16));
decipher.setAuthTag(tag);
let plaintext = decipher.update(ciphertext);
plaintext = Buffer.concat([plaintext, decipher.final()]);

// Verify that the decryption was successful
if (data.toString() === plaintext.toString()) {
    console.log('The message was decrypted successfully');
} else {
    console.log('The message was tampered with');
}

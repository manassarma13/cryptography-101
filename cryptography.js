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

// Save the encrypted data and key to a file
const fs = require('fs');
fs.writeFileSync('encrypted.bin', Buffer.concat([ciphertext, tag]));
fs.writeFileSync('key.bin', key);

// Load the encrypted data and key from the file
const encryptedData = fs.readFileSync('encrypted.bin');
const encryptedKey = fs.readFileSync('key.bin');

// Decrypt the data
const decipher = crypto.createDecipheriv('aes-256-gcm', encryptedKey, Buffer.alloc(16));
decipher.setAuthTag(encryptedData.slice(-16));
const decryptedData = decipher.update(encryptedData.slice(0, -16));
decryptedData = Buffer.concat([decryptedData, decipher.final()]);

// Verify that the decryption was successful
if (data.toString() === decryptedData.toString()) {
    console.log('The message was decrypted successfully');
} else {
    console.error('Oop an error occured!');
}

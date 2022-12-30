# cryptography-101
Simple example of how cryptography can be implemented in Node.js using a library like crypto, which is a built-in module in Node.js. The key is a random secret value that is used to encrypt and decrypt the message. The cipher object is used to encrypt the message, and the decipher object is used to decrypt it.  

This modified code saves the encrypted data and key to a file, and then loads them back in to decrypt the message. It uses the fs module to read and write files, and the Buffer class to handle binary data.

The code also uses the slice method to split the encrypted data into two parts: the ciphertext and the authentication tag. The ciphertext is decrypted using the update and final methods, and the authentication tag is set using the setAuthTag method.


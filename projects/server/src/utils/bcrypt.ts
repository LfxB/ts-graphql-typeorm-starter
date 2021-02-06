import * as bcrypt from "bcryptjs";

/*
    Usage:

    try {
        let hashedPassword = "";
        const hashResults = await generateSalt("password").then(result => {
        return generateHash(result.salt, result.toBeHashed);
        });
        hashedPassword = hashResults.hash;
        console.log("hashedPassword", hashedPassword);
    } catch (e) {
        console.log("ERROR", e);
    }
*/

export const generateSalt = (toBeHashed: string) => {
  return new Promise<{ salt: string; toBeHashed: string }>(
    (resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            salt,
            toBeHashed
          });
        }
      });
    }
  );
};

export const generateHash = (salt: string, toBeHashed: string) => {
  return new Promise<{ salt: string; toBeHashed: string; hash: string }>(
    (resolve, reject) => {
      bcrypt.hash(toBeHashed, salt, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            salt,
            toBeHashed,
            hash
          });
        }
      });
    }
  );
};

/*
    Usage:

    const isMatching = await compareToHash("password", hashedPassword);
    console.log("isMatching", isMatching); // Ouputs true or false
*/
export const compareToHash = (str: string, hash: string) => {
  return bcrypt.compare(str, hash);
};

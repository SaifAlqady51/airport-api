import * as bcrypt from 'bcrypt';

export const encrypt = async (password: string) => {
    // generate random slat
    const slat = await bcrypt.genSalt();
    // hashing the password
    const hash = await bcrypt.hash(password, slat);

    return hash;
};

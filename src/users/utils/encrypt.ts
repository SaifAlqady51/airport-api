import * as bcrypt from 'bcrypt';

export const encrypt = async (password: string) => {
    const slat = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, slat);

    return hash;
};

const generateRandom = () => {
      return Math.random().toString(36).slice(2) 
     ;
}

export const generateToken = () => {
    return generateRandom() + generateRandom()
}


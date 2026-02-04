export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export const generatePassword = (options: PasswordOptions): string => {
  const { length, uppercase, lowercase, numbers, symbols } = options;
  
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  
  let charset = "";
  if (uppercase) charset += upperChars;
  if (lowercase) charset += lowerChars;
  if (numbers) charset += numberChars;
  if (symbols) charset += symbolChars;
  
  if (charset === "") return "";
  
  let password = "";
  // Ensure at least one character from each selected type is included
  const requiredChars = [];
  if (uppercase) requiredChars.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
  if (lowercase) requiredChars.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);
  if (numbers) requiredChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
  if (symbols) requiredChars.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);

  for (let i = 0; i < length - requiredChars.length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  // Mix in required characters and shuffle
  password += requiredChars.join('');
  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

export const calculateStrength = (password: string): 'weak' | 'medium' | 'strong' | 'very-strong' => {
  let score = 0;
  if (password.length > 8) score += 1;
  if (password.length > 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score < 3) return 'weak';
  if (score < 5) return 'medium';
  if (score < 6) return 'strong';
  return 'very-strong';
};

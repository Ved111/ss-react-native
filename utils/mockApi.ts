export const mockUser = {
    email: "user@example.com",
    password: "password123",
    token: "mocked-jwt-token",
  };


  export const mockProducts = [
    { id: 1, name: "Service 1", price: 699, image: "https://picsum.photos/200/300" },
    { id: 2, name: "Service 2", price: 1299, image: "https://picsum.photos/200/300" },
    { id: 3, name: "Service 3", price: 199, image: "https://picsum.photos/200/300" },
    { id: 4, name: "Service 4", price: 299, image: "https://picsum.photos/200/300" },
  ];
  
  export const fetchProducts = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProducts), 1000);
    });
  };
  
  export const purchaseProduct = async (productId: number) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, productId }), 1000);
    });
  };
  
  
  export const login = async (email: string, password: string) => {
    return new Promise<{ success: boolean; token?: string }>((resolve, reject) => {
      setTimeout(() => {
        if (email === mockUser.email && password === mockUser.password) {
          resolve({ success: true, token: mockUser.token });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };
  
  export const logout = async () => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  };
  
  // Mock user storage for signup
const mockUserDatabase: { email: string; password: string; token: string }[] = [];

export const signup = async (email: string, password: string) => {
  return new Promise<{ success: boolean; token?: string }>((resolve, reject) => {
    setTimeout(() => {
      const userExists = mockUserDatabase.some((user) => user.email === email);

      if (userExists) {
        reject(new Error("User already exists"));
      } else {
        const newUser = { email, password, token: `mocked-token-${Date.now()}` };
        mockUserDatabase.push(newUser);
        resolve({ success: true, token: newUser.token });
      }
    }, 1000);
  });
};